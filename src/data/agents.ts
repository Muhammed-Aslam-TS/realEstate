export interface Agent {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  image: string;
  whatsappNumber: string;
  experienceYears: number;
  activeListings: number;
  totalVolume: string;
  specialization: string;
  bio: string;
  rating: number;
  localitiesCovered: string[];
  socials: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
  };
}

export const AGENTS: Agent[] = [
  {
    id: 'agent-1',
    name: 'Saba Rao',
    role: 'Proprietor & Principal Advisor',
    phone: '+91 6366214574',
    email: 'info@dreamdwellrealestates.in',
    whatsappNumber: '916366214574',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    experienceYears: 15,
    activeListings: 18,
    totalVolume: '₹450 Cr+',
    specialization: 'Luxury Gated Villas, Mansions & High-Growth Portfolios',
    bio: 'Founder and Proprietor of Dream Dwell Real Estates. Over 15 years of trusted advisory experience assisting high-net-worth clients across Bangalore’s prime residential and commercial corridors.',
    rating: 4.98,
    localitiesCovered: ['Whitefield', 'OMBR Layout', 'Indiranagar', 'Sadashivanagar'],
    socials: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
    },
  },
  {
    id: 'agent-2',
    name: 'Rohan Sharma',
    role: 'Senior Property Advisor - Residential',
    phone: '+91 9845012345',
    email: 'rohan@dreamdwellrealestates.in',
    whatsappNumber: '916366214574',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    experienceYears: 11,
    activeListings: 12,
    totalVolume: '₹280 Cr+',
    specialization: 'Sky Penthouses, Luxury Apartments & Eco Farmlands',
    bio: 'Dedicated residential specialist with expert knowledge of Vastu-compliant layouts, title deed verification, and high-rise penthouse acquisitions.',
    rating: 4.95,
    localitiesCovered: ['Indiranagar', 'Koramangala', 'Kanakapura Road', 'MG Road'],
    socials: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
    },
  },
  {
    id: 'agent-3',
    name: 'Ananya Reddy',
    role: 'Director - Commercial & Plotted Developments',
    phone: '+91 9731088900',
    email: 'ananya@dreamdwellrealestates.in',
    whatsappNumber: '916366214574',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    experienceYears: 9,
    activeListings: 14,
    totalVolume: '₹310 Cr+',
    specialization: 'Grade-A Commercial Office Suites & BMRDA/RERA Plots',
    bio: 'Specializing in tech park commercial floor plates, institutional leasing, and RERA-approved villa plot developments across Devanahalli and Outer Ring Road.',
    rating: 4.94,
    localitiesCovered: ['Outer Ring Road', 'Devanahalli', 'Bellandur', 'Yelahanka'],
    socials: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
    },
  },
];
