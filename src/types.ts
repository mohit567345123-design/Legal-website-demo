export interface Attorney {
  name: string;
  role: string;
  specialty: string;
  experience: string;
  image: string;
}

export interface PracticeArea {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  name: string;
  text: string;
  rating: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
