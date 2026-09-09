export interface Agent {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  image: string;
  experienceYears: number;
  activeListings: number;
  totalVolume: string;
  specialization: string;
  bio: string;
  rating: number;
  socials: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
  };
}

export const AGENTS: Agent[] = [
  {
    id: 'agent-1',
    name: 'Victoria Sterling',
    role: 'Senior Luxury Real Estate Advisor',
    phone: '+1 (305) 892-4100',
    email: 'victoria@luxehaven.com',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    experienceYears: 14,
    activeListings: 12,
    totalVolume: '$450M+',
    specialization: 'Oceanfront Estates & Waterfront Mansions',
    bio: 'With over 14 years specializing in ultra-luxury coastal real estate, Victoria delivers unmatched market intelligence, discretion, and negotiation excellence for high-net-worth clients worldwide.',
    rating: 4.98,
    socials: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    id: 'agent-2',
    name: 'Alexander Hayes',
    role: 'Managing Director - Penthouse Division',
    phone: '+1 (212) 555-0199',
    email: 'alexander@luxehaven.com',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    experienceYears: 18,
    activeListings: 8,
    totalVolume: '$820M+',
    specialization: 'High-Rise Penthouses & Historic Townhouses',
    bio: 'Alexander is a recognized leader in Manhattan and East Coast penthouse transactions. His meticulous architectural domain knowledge and network of global buyers set industry standards.',
    rating: 5.0,
    socials: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
    },
  },
  {
    id: 'agent-3',
    name: 'Elena Rostova',
    role: 'Principal Broker - West Coast',
    phone: '+1 (310) 998-3200',
    email: 'elena@luxehaven.com',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    experienceYears: 12,
    activeListings: 15,
    totalVolume: '$610M+',
    specialization: 'Bel Air, Beverly Hills & Malibu Architectural Villas',
    bio: 'Specializing in contemporary California architecture, Elena connects visionary design properties with discerning international buyers seeking privacy and luxury.',
    rating: 4.96,
    socials: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    id: 'agent-4',
    name: 'Marcus Vance',
    role: 'Commercial & Alpine Luxury Director',
    phone: '+1 (303) 771-9200',
    email: 'marcus@luxehaven.com',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    experienceYears: 10,
    activeListings: 9,
    totalVolume: '$320M+',
    specialization: 'Alpine Ski Chalets & Resort Properties',
    bio: 'Marcus represents luxury resort compounds across Aspen, Vail, and Lake Tahoe. Known for his keen investor insight and white-glove client advisory.',
    rating: 4.92,
    socials: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
    },
  },
];
