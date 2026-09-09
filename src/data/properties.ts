export interface Property {
  id: string;
  title: string;
  price: number;
  formattedPrice: string;
  period?: string; // e.g. "/month" for rent
  type: 'villa' | 'penthouse' | 'apartment' | 'mansion' | 'waterfront';
  status: 'For Sale' | 'For Rent';
  location: {
    address: string;
    city: string;
    state: string;
    zip: string;
    neighborhood: string;
  };
  specs: {
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    garage: number;
    yearBuilt: number;
  };
  featured: boolean;
  rating: number;
  reviewsCount: number;
  description: string;
  images: string[];
  amenities: string[];
  agent: {
    id: string;
    name: string;
    title: string;
    phone: string;
    email: string;
    image: string;
  };
  virtualTourAvailable: boolean;
  builtIn: string;
}

export const PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'The Solstice Oceanside Residence',
    price: 4850000,
    formattedPrice: '$4,850,000',
    type: 'waterfront',
    status: 'For Sale',
    location: {
      address: '1042 Ocean Drive',
      city: 'Miami Beach',
      state: 'FL',
      zip: '33139',
      neighborhood: 'South Beach',
    },
    specs: {
      bedrooms: 5,
      bathrooms: 6,
      sqft: 6400,
      garage: 3,
      yearBuilt: 2024,
    },
    featured: true,
    rating: 4.95,
    reviewsCount: 28,
    description: 'An architectural masterpiece situated directly on the Miami coastline. Features floor-to-ceiling glass walls, an infinity edge heated saltwater pool, private yacht dock, smart-home automation system, and a temperature-controlled 500-bottle wine cellar.',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'Infinity Ocean Pool',
      'Private Yacht Dock',
      'Smart Home Automation',
      'Wine Tasting Room',
      'Spa & Sauna',
      'Elevator',
      'Rooftop Deck',
      '24/7 Security System',
    ],
    agent: {
      id: 'agent-1',
      name: 'Victoria Sterling',
      title: 'Senior Luxury Real Estate Advisor',
      phone: '+1 (305) 892-4100',
      email: 'victoria@luxehaven.com',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    },
    virtualTourAvailable: true,
    builtIn: '2024',
  },
  {
    id: 'prop-2',
    title: 'The Skyview Crown Penthouse',
    price: 7200000,
    formattedPrice: '$7,200,000',
    type: 'penthouse',
    status: 'For Sale',
    location: {
      address: '740 Park Avenue',
      city: 'New York',
      state: 'NY',
      zip: '10021',
      neighborhood: 'Upper East Side',
    },
    specs: {
      bedrooms: 4,
      bathrooms: 4.5,
      sqft: 5200,
      garage: 2,
      yearBuilt: 2023,
    },
    featured: true,
    rating: 4.98,
    reviewsCount: 34,
    description: 'Triple-mint penthouse dominating the NYC skyline with 360-degree unobstructed views of Central Park and the Manhattan skyline. Includes private key-access elevator, wraparound terrace, custom Italian marble kitchen, and high-end motorized shades.',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      '360 Terrace',
      'Private Keyed Elevator',
      'Central Park Views',
      'Chef Kitchen',
      'Fireplace',
      'Doorman & Concierge',
      'Fitness Center',
    ],
    agent: {
      id: 'agent-2',
      name: 'Alexander Hayes',
      title: 'Managing Director - Penthouse Division',
      phone: '+1 (212) 555-0199',
      email: 'alexander@luxehaven.com',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    },
    virtualTourAvailable: true,
    builtIn: '2023',
  },
  {
    id: 'prop-3',
    title: 'Bel Air Modern Glass Villa',
    price: 12500000,
    formattedPrice: '$12,500,000',
    type: 'villa',
    status: 'For Sale',
    location: {
      address: '1420 Bel Air Road',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90077',
      neighborhood: 'Bel Air',
    },
    specs: {
      bedrooms: 6,
      bathrooms: 8,
      sqft: 9800,
      garage: 4,
      yearBuilt: 2024,
    },
    featured: true,
    rating: 5.0,
    reviewsCount: 19,
    description: 'Nestled in prestigious Bel Air, this modern glass trophy villa boasts expansive canyon to ocean views, zero-edge pool, private screening room, 10-car gallery garage, and organic minimalist architecture integrating indoor and outdoor living seamlessly.',
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'Canyon & Ocean Views',
      'Private Cinema Room',
      '10-Car Gallery Garage',
      'Zero Edge Pool',
      'Outdoor Kitchen & BBQ',
      'Tennis / Pickleball Court',
      'Solar Powered',
    ],
    agent: {
      id: 'agent-3',
      name: 'Elena Rostova',
      title: 'Principal Broker - West Coast',
      phone: '+1 (310) 998-3200',
      email: 'elena@luxehaven.com',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    },
    virtualTourAvailable: true,
    builtIn: '2024',
  },
  {
    id: 'prop-4',
    title: 'Aspen Modern Mountain Retreat',
    price: 18500,
    formattedPrice: '$18,500',
    period: '/month',
    type: 'mansion',
    status: 'For Rent',
    location: {
      address: '520 Red Mountain Road',
      city: 'Aspen',
      state: 'CO',
      zip: '81611',
      neighborhood: 'Red Mountain',
    },
    specs: {
      bedrooms: 5,
      bathrooms: 5.5,
      sqft: 5800,
      garage: 2,
      yearBuilt: 2022,
    },
    featured: false,
    rating: 4.91,
    reviewsCount: 15,
    description: 'Luxury timber and glass alpine sanctuary offering ski-in ski-out convenience, heated driveway, outdoor fireside dining, indoor spa tub, vaulted ceilings with reclaimed wood timber beams, and breathtaking views of Ajax Mountain.',
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'Ski-In Ski-Out Access',
      'Heated Driveway & Walkways',
      'Outdoor Fire Pit',
      'Hot Tub Spa',
      'Ski Storage Locker',
      'Fireplace',
    ],
    agent: {
      id: 'agent-1',
      name: 'Victoria Sterling',
      title: 'Senior Luxury Real Estate Advisor',
      phone: '+1 (305) 892-4100',
      email: 'victoria@luxehaven.com',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    },
    virtualTourAvailable: false,
    builtIn: '2022',
  },
  {
    id: 'prop-5',
    title: 'The Azure Waterfront Loft',
    price: 12500,
    formattedPrice: '$12,500',
    period: '/month',
    type: 'apartment',
    status: 'For Rent',
    location: {
      address: '220 Biscayne Blvd',
      city: 'Miami',
      state: 'FL',
      zip: '33132',
      neighborhood: 'Downtown Miami',
    },
    specs: {
      bedrooms: 3,
      bathrooms: 3,
      sqft: 2900,
      garage: 2,
      yearBuilt: 2023,
    },
    featured: false,
    rating: 4.88,
    reviewsCount: 22,
    description: 'Designer furnished high-rise corner residence boasting double-height ceilings, floor-to-ceiling glass, private elevator vestibule, custom Scavolini kitchen, and panoramic vistas of Biscayne Bay.',
    images: [
      'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'Bay Views',
      'Double Height Ceilings',
      'Valet Parking',
      'Infinity Sky Pool',
      'Gym & Yoga Studio',
    ],
    agent: {
      id: 'agent-2',
      name: 'Alexander Hayes',
      title: 'Managing Director - Penthouse Division',
      phone: '+1 (212) 555-0199',
      email: 'alexander@luxehaven.com',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    },
    virtualTourAvailable: true,
    builtIn: '2023',
  },
  {
    id: 'prop-6',
    title: 'Malibu Cliffside Modern Estate',
    price: 15900000,
    formattedPrice: '$15,900,000',
    type: 'waterfront',
    status: 'For Sale',
    location: {
      address: '32000 Pacific Coast Highway',
      city: 'Malibu',
      state: 'CA',
      zip: '90265',
      neighborhood: 'El Matador Cliff',
    },
    specs: {
      bedrooms: 5,
      bathrooms: 7,
      sqft: 7500,
      garage: 3,
      yearBuilt: 2024,
    },
    featured: true,
    rating: 4.99,
    reviewsCount: 42,
    description: 'A cliffside architectural masterpiece with private funicular stairs directly to a secluded beach enclave. Crafted with brushed concrete, teak, and brass details. Includes oceanfront infinity deck and outdoor fireplace.',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'Private Beach Access',
      'Funicular Staircase',
      'Oceanfront Deck',
      'Solar Storage',
      'Outdoor Dining Pavilion',
    ],
    agent: {
      id: 'agent-3',
      name: 'Elena Rostova',
      title: 'Principal Broker - West Coast',
      phone: '+1 (310) 998-3200',
      email: 'elena@luxehaven.com',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    },
    virtualTourAvailable: true,
    builtIn: '2024',
  },
];
