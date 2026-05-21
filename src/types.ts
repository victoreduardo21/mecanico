export interface Service {
  id: string;
  title: string;
  category: 'mecânica' | 'diagnóstico' | 'suspensão' | 'preventiva';
  priceEstimate: string;
  description: string;
  estimatedTime: string;
  features: string[];
  imageUrl?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface BookingState {
  step: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  carBrand: string;
  carModel: string;
  carYear: string;
  selectedServices: string[];
  date: string;
  time: string;
  note: string;
}
