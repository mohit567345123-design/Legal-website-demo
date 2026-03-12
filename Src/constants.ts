import { Attorney, PracticeArea, Testimonial } from './types';

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    title: 'Personal Injury',
    description: 'Dedicated representation for victims of accidents, ensuring you receive the compensation you deserve for medical bills and lost wages.',
    icon: 'Scale',
  },
  {
    title: 'Family Law',
    description: 'Compassionate guidance through divorce, child custody, and support matters, prioritizing the well-being of your family.',
    icon: 'Users',
  },
  {
    title: 'Criminal Defense',
    description: 'Aggressive defense strategies for all criminal charges, protecting your rights and future with experienced legal counsel.',
    icon: 'ShieldAlert',
  },
  {
    title: 'Business Law',
    description: 'Comprehensive legal support for businesses, including formation, contracts, and litigation to help your enterprise thrive.',
    icon: 'Briefcase',
  },
  {
    title: 'Immigration Law',
    description: 'Expert assistance with visas, green cards, and citizenship, helping individuals and families navigate the complex immigration system.',
    icon: 'Globe',
  },
];

export const ATTORNEYS: Attorney[] = [
  {
    name: 'Michael Anderson',
    role: 'Senior Partner',
    specialty: 'Personal Injury Specialist',
    experience: '15 years experience',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=500',
  },
  {
    name: 'Sarah Cole',
    role: 'Managing Partner',
    specialty: 'Family & Divorce Law',
    experience: '12 years experience',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=500',
  },
  {
    name: 'David Ramirez',
    role: 'Criminal Defense Attorney',
    specialty: 'Former Prosecutor',
    experience: '10 years experience',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=500',
  },
  {
    name: 'Emily Chen',
    role: 'Business & Corporate Lawyer',
    specialty: 'Corporate Specialist',
    experience: '8 years experience',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=500',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'John D.',
    text: 'Anderson & Cole handled my personal injury case with extreme professionalism. They kept me informed every step of the way and got me a settlement far beyond my expectations.',
    rating: 5,
  },
  {
    name: 'Maria S.',
    text: 'Sarah Cole was a pillar of strength during my divorce. Her expertise in family law is unmatched, and she truly cared about my children\'s future.',
    rating: 5,
  },
  {
    name: 'Robert L.',
    text: 'I was facing serious charges and David Ramirez saved my career. His background as a prosecutor gave us the edge we needed in court.',
    rating: 5,
  },
];

export const OFFICE_HOURS = {
  weekdays: '9:00 AM – 6:00 PM',
  saturday: '10:00 AM – 2:00 PM',
  sunday: 'Closed',
};

export const CONTACT_INFO = {
  address: '123 Legal Plaza, Suite 500, Los Angeles, CA 90012',
  phone: '(555) 123-4567',
  email: 'contact@andersoncolelegal.com',
};
