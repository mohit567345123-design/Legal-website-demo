import { GoogleGenAI, Modality, LiveServerMessage } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are a professional legal receptionist for "Anderson & Cole Legal". 
You are speaking on the phone with a potential client.
Greet the caller warmly. Answer questions about legal services, office hours, and help schedule consultations.
Be polite and professional. Collect name, phone, and preferred date for consultations.
Keep responses concise and conversational as this is a voice interaction.`;

export class VoiceAssistantService {
  private ai: GoogleGenAI;
  private session: any;
  private audioContext: AudioContext | null = null;
  private processor: ScriptProcessorNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private nextStartTime: number = 0;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
  }

  async connect(onMessage: (text: string) => void, onInterrupted: () => void) {
    this.audioContext = new AudioContext({ sampleRate: 16000 });
    this.nextStartTime = this.audioContext.currentTime;

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.source = this.audioContext.createMediaStreamSource(stream);
    this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);

    this.session = await this.ai.live.connect({
      model: "gemini-2.5-flash-native-audio-preview-09-2025",
      config: {
        responseModalities: [Modality.AUDIO],
        systemInstruction: SYSTEM_INSTRUCTION,
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
        },
      },
      callbacks: {
        onopen: () => {
          console.log("Voice session opened");
          this.source?.connect(this.processor!);
          this.processor?.connect(this.audioContext!.destination);
          
          this.processor!.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            const pcmData = this.floatTo16BitPCM(inputData);
            const base64Data = btoa(String.fromCharCode(...new Uint8Array(pcmData.buffer)));
            this.session.sendRealtimeInput({
              media: { data: base64Data, mimeType: "audio/pcm;rate=16000" }
            });
          };
        },
        onmessage: async (message: LiveServerMessage) => {
          if (message.serverContent?.modelTurn?.parts[0]?.inlineData?.data) {
            const base64Audio = message.serverContent.modelTurn.parts[0].inlineData.data;
            this.playAudio(base64Audio);
          }
          if (message.serverContent?.interrupted) {
            onInterrupted();
            this.nextStartTime = this.audioContext!.currentTime;
          }
          // Transcription handling could be added here
        },
        onclose: () => console.log("Voice session closed"),
        onerror: (err) => console.error("Voice session error", err),
      },
    });
  }

  private playAudio(base64Data: string) {
    if (!this.audioContext) return;
    const binaryString = atob(base64Data);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);
    
    // Convert 16-bit PCM to Float32
    const int16Data = new Int16Array(bytes.buffer);
    const float32Data = new Float32Array(int16Data.length);
    for (let i = 0; i < int16Data.length; i++) {
      float32Data[i] = int16Data[i] / 32768.0;
    }

    const buffer = this.audioContext.createBuffer(1, float32Data.length, 24000); // Gemini Live usually outputs 24kHz
    buffer.getChannelData(0).set(float32Data);

    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(this.audioContext.destination);
    
    const startTime = Math.max(this.nextStartTime, this.audioContext.currentTime);
    source.start(startTime);
    this.nextStartTime = startTime + buffer.duration;
  }

  private floatTo16BitPCM(input: Float32Array) {
    const output = new Int16Array(input.length);
    for (let i = 0; i < input.length; i++) {
      const s = Math.max(-1, Math.min(1, input[i]));
      output[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    return output;
  }

  disconnect() {
    this.session?.close();
    this.processor?.disconnect();
    this.source?.disconnect();
    this.audioContext?.close();
  }
}
