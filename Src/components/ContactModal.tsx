import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageSquare, Phone, Send, Mic, MicOff, Loader2 } from 'lucide-react';
import { LegalAssistantService } from '../services/geminiService';
import { VoiceAssistantService } from '../services/voiceService';
import { ChatMessage } from '../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'selection' | 'chat' | 'voice'>('selection');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! Welcome to Anderson & Cole Legal. I am your legal receptionist. How can I assist you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [chatService] = useState(() => new LegalAssistantService());
  const [voiceService] = useState(() => new VoiceAssistantService());

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMsg = inputValue.trim();
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await chatService.sendMessage(userMsg);
      setChatMessages(prev => [...prev, { role: 'model', text: response || 'I apologize, I encountered an error.' }]);
    } catch (error) {
      console.error(error);
      setChatMessages(prev => [...prev, { role: 'model', text: 'Sorry, I am having trouble connecting right now.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleVoice = async () => {
    if (isVoiceActive) {
      voiceService.disconnect();
      setIsVoiceActive(false);
    } else {
      try {
        await voiceService.connect(
          (text) => console.log('AI said:', text),
          () => console.log('Interrupted')
        );
        setIsVoiceActive(true);
      } catch (err) {
        alert('Could not access microphone. Please check permissions.');
      }
    }
  };

  useEffect(() => {
    return () => {
      voiceService.disconnect();
    };
  }, [voiceService]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[80vh]"
          >
            {/* Header */}
            <div className="navy-gradient p-6 text-white flex justify-between items-center">
              <div>
                <h3 className="text-xl font-serif font-bold">
                  {mode === 'selection' && 'Contact Anderson & Cole'}
                  {mode === 'chat' && 'Chat with Legal Assistant'}
                  {mode === 'voice' && 'Voice Consultation'}
                </h3>
                <p className="text-sm text-white/70">Professional Legal Receptionist</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {mode === 'selection' && (
                <div className="grid grid-cols-1 gap-4">
                  <button
                    onClick={() => setMode('chat')}
                    className="flex items-center gap-4 p-6 border-2 border-navy-900/10 rounded-xl hover:border-gold-500 hover:bg-gold-500/5 transition-all group text-left"
                  >
                    <div className="p-4 bg-navy-900 text-white rounded-full group-hover:scale-110 transition-transform">
                      <MessageSquare size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-900">Chat With Us</h4>
                      <p className="text-sm text-navy-900/60">Instant text-based legal assistance</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setMode('voice')}
                    className="flex items-center gap-4 p-6 border-2 border-navy-900/10 rounded-xl hover:border-gold-500 hover:bg-gold-500/5 transition-all group text-left"
                  >
                    <div className="p-4 bg-navy-900 text-white rounded-full group-hover:scale-110 transition-transform">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-900">Call Us</h4>
                      <p className="text-sm text-navy-900/60">Speak with our AI voice receptionist</p>
                    </div>
                  </button>
                </div>
              )}

              {mode === 'chat' && (
                <div className="flex flex-col h-[500px]">
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                    {chatMessages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-2xl ${
                          msg.role === 'user' 
                            ? 'bg-navy-900 text-white rounded-tr-none' 
                            : 'bg-navy-900/5 text-navy-900 rounded-tl-none'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-navy-900/5 p-3 rounded-2xl rounded-tl-none flex gap-1">
                          <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-navy-900/40 rounded-full" />
                          <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-navy-900/40 rounded-full" />
                          <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-navy-900/40 rounded-full" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 border border-navy-900/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={isTyping}
                      className="bg-navy-900 text-white p-2 rounded-xl hover:bg-navy-800 disabled:opacity-50 transition-colors"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              )}

              {mode === 'voice' && (
                <div className="flex flex-col items-center justify-center h-[400px] text-center">
                  <motion.div
                    animate={isVoiceActive ? {
                      scale: [1, 1.1, 1],
                      boxShadow: ["0 0 0 0px rgba(197, 160, 89, 0)", "0 0 0 20px rgba(197, 160, 89, 0.2)", "0 0 0 0px rgba(197, 160, 89, 0)"]
                    } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={`w-32 h-32 rounded-full flex items-center justify-center mb-8 transition-colors ${
                      isVoiceActive ? 'bg-gold-500 text-white' : 'bg-navy-900/5 text-navy-900/40'
                    }`}
                  >
                    {isVoiceActive ? <Mic size={48} /> : <MicOff size={48} />}
                  </motion.div>
                  <h4 className="text-xl font-bold text-navy-900 mb-2">
                    {isVoiceActive ? 'Listening...' : 'Ready to Talk'}
                  </h4>
                  <p className="text-navy-900/60 mb-8 max-w-xs">
                    {isVoiceActive 
                      ? 'Our AI receptionist is ready to assist you. Speak clearly into your microphone.' 
                      : 'Click the button below to start a voice consultation with our AI receptionist.'}
                  </p>
                  <button
                    onClick={toggleVoice}
                    className={`px-8 py-3 rounded-full font-bold transition-all shadow-lg ${
                      isVoiceActive 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : 'bg-navy-900 text-white hover:bg-navy-800'
                    }`}
                  >
                    {isVoiceActive ? 'End Call' : 'Start Call'}
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            {mode !== 'selection' && (
              <div className="p-4 border-t border-navy-900/5 flex justify-center">
                <button
                  onClick={() => setMode('selection')}
                  className="text-sm font-bold text-navy-900/40 hover:text-navy-900 transition-colors"
                >
                  Back to Options
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
