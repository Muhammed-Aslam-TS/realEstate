export interface Property {
  id: string;
  title: string;
  price: number; // in INR rupees
  priceLakhsOrCrores: string; // e.g., "₹2.50 Crore", "₹85 Lakh"
  pricePerSqFt?: string; // e.g. "₹7,812 / sq.ft."
  type: 'apartment' | 'villa' | 'mansion' | 'commercial' | 'plot' | 'farmland';
  status: 'For Sale' | 'For Rent';
  location: {
    address: string;
    subLocality: string;
    city: string;
    state: string;
    zip: string;
    neighborhood: string;
  };
  specs: {
    bhk: string; // e.g., "4 BHK", "3 BHK"
    bedrooms: number;
    bathrooms: number;
    balconies?: number;
    carpetArea: number; // sq.ft.
    superBuiltUpArea: number; // sq.ft.
    floorLevel?: string;
    totalFloors?: string;
    facing?: string; // e.g. "North-East (Vastu)", "East"
    possessionStatus?: string; // e.g. "Ready to Move", "Under Construction (Dec 2026)"
    garage: number;
    yearBuilt: number;
  };
  featured: boolean;
  rating: number;
  reviewsCount: number;
  description: string;
  images: string[];
  floorPlanImage?: string;
  brochureUrl?: string;
  matterport360Url?: string;
  amenities: string[];
  agent: {
    id: string;
    name: string;
    title: string;
    phone: string;
    email: string;
    image: string;
    whatsappNumber: string;
    localitiesCovered: string[];
  };
  virtualTourAvailable: boolean;
  builtIn: string;
  reraNumber: string;
}

export const PROPERTIES: Property[] = [
  {
    id: 'DD-101',
    title: 'Prestige Golfshire Luxury Sanctuary',
    price: 25000000,
    priceLakhsOrCrores: '₹2.50 Crore',
    pricePerSqFt: '₹7,812 / sq.ft.',
    type: 'villa',
    status: 'For Sale',
    location: {
      address: 'Plot 42, Nandi Hills Road',
      subLocality: 'Whitefield',
      city: 'Bengaluru',
      state: 'Karnataka',
      zip: '560066',
      neighborhood: 'Whitefield East',
    },
    specs: {
      bhk: '4 BHK',
      bedrooms: 4,
      bathrooms: 4,
      balconies: 3,
      carpetArea: 2800,
      superBuiltUpArea: 3200,
      floorLevel: 'Ground + 2 Floors',
      totalFloors: '2',
      facing: 'North-East (Vastu Compliant)',
      possessionStatus: 'Ready to Move',
      garage: 2,
      yearBuilt: 2024,
    },
    featured: true,
    rating: 4.9,
    reviewsCount: 18,
    description: 'An exquisite contemporary 4 BHK luxury villa nestled in Whitefield, Bengaluru. Features double-height living room, private garden, Italian marble flooring, Vastu compliant entrance, EV charging station, and clubhouse membership.',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    ],
    floorPlanImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    brochureUrl: '#',
    matterport360Url: 'https://my.matterport.com/show/?m=sample',
    amenities: [
      'Clubhouse',
      'EV Charging Station',
      '24/7 Power Backup',
      'Swimming Pool',
      'Jogging Track',
      '24/7 Security & CCTV',
      'Vastu Compliant',
      'Children\'s Play Area',
    ],
    agent: {
      id: 'agent-1',
      name: 'Saba Rao',
      title: 'Principal Advisor & Founder',
      phone: '+91 6366214574',
      email: 'info@dreamdwellrealestates.in',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      whatsappNumber: '916366214574',
      localitiesCovered: ['Whitefield', 'OMBR Layout', 'Indiranagar'],
    },
    virtualTourAvailable: true,
    builtIn: '2024',
    reraNumber: 'PRM/KA/RERA/1251/309/AG/260905/007759',
  },
  {
    id: 'DD-102',
    title: 'The Skyview Horizon Sky Villa Penthouse',
    price: 45000000,
    priceLakhsOrCrores: '₹4.50 Crore',
    pricePerSqFt: '₹10,000 / sq.ft.',
    type: 'apartment',
    status: 'For Sale',
    location: {
      address: 'Tower 3, 100 Feet Road',
      subLocality: 'Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      zip: '560038',
      neighborhood: 'Indiranagar 1st Stage',
    },
    specs: {
      bhk: '4.5 BHK',
      bedrooms: 4,
      bathrooms: 5,
      balconies: 4,
      carpetArea: 3900,
      superBuiltUpArea: 4500,
      floorLevel: '28th Floor (Top Level)',
      totalFloors: '28',
      facing: 'East Facing',
      possessionStatus: 'Ready to Move',
      garage: 3,
      yearBuilt: 2023,
    },
    featured: true,
    rating: 4.98,
    reviewsCount: 24,
    description: 'Ultra-luxury duplex penthouse overlooking the lush green canopy of Indiranagar. Private sky terrace, motorized glass roof, double-height foyer, and dedicated concierge service.',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80',
    ],
    floorPlanImage: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80',
    brochureUrl: '#',
    matterport360Url: 'https://my.matterport.com/show/?m=sample',
    amenities: [
      'Private Sky Deck',
      'EV Charging Station',
      '24/7 Power Backup',
      'Clubhouse',
      'Swimming Pool',
      '24/7 Security & CCTV',
    ],
    agent: {
      id: 'agent-2',
      name: 'Rohan Sharma',
      title: 'Senior Luxury Property Advisor',
      phone: '+91 9845012345',
      email: 'rohan@dreamdwellrealestates.in',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
      whatsappNumber: '916366214574',
      localitiesCovered: ['Indiranagar', 'Koramangala', 'MG Road'],
    },
    virtualTourAvailable: true,
    builtIn: '2023',
    reraNumber: 'PRM/KA/RERA/1251/309/AG/260905/007759',
  },
  {
    id: 'DD-103',
    title: 'Sadashivanagar Heritage Flagship Mansion',
    price: 125000000,
    priceLakhsOrCrores: '₹12.50 Crore',
    pricePerSqFt: '₹15,243 / sq.ft.',
    type: 'mansion',
    status: 'For Sale',
    location: {
      address: '12th Cross, Sadashivanagar',
      subLocality: 'Sadashivanagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      zip: '560080',
      neighborhood: 'Sadashivanagar Prime',
    },
    specs: {
      bhk: '5 BHK',
      bedrooms: 5,
      bathrooms: 6,
      balconies: 4,
      carpetArea: 7200,
      superBuiltUpArea: 8200,
      floorLevel: 'Independent Bungalow G+2',
      totalFloors: '3',
      facing: 'North Facing',
      possessionStatus: 'Ready to Move',
      garage: 4,
      yearBuilt: 2024,
    },
    featured: true,
    rating: 5.0,
    reviewsCount: 12,
    description: 'Ultra-exclusive private mansion situated in Bengaluru’s premier diplomatic corridor, Sadashivanagar. Private lift, internal temperature-controlled lap pool, landscaped zen court, and high-security perimeter.',
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    ],
    floorPlanImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    brochureUrl: '#',
    matterport360Url: 'https://my.matterport.com/show/?m=sample',
    amenities: [
      'Private Swimming Pool',
      'Vastu Compliant',
      '24/7 Security & CCTV',
      'EV Charging Station',
      '24/7 Power Backup',
    ],
    agent: {
      id: 'agent-1',
      name: 'Saba Rao',
      title: 'Principal Advisor & Founder',
      phone: '+91 6366214574',
      email: 'info@dreamdwellrealestates.in',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      whatsappNumber: '916366214574',
      localitiesCovered: ['Sadashivanagar', 'Malleshwaram', 'Dollars Colony'],
    },
    virtualTourAvailable: true,
    builtIn: '2024',
    reraNumber: 'PRM/KA/RERA/1251/309/AG/260905/007759',
  },
  {
    id: 'DD-104',
    title: 'Outer Ring Road Grade-A Tech Park Suites',
    price: 85000000,
    priceLakhsOrCrores: '₹8.50 Crore',
    pricePerSqFt: '₹8,500 / sq.ft.',
    type: 'commercial',
    status: 'For Sale',
    location: {
      address: 'ORR Tech Corridor, Marathahalli',
      subLocality: 'Marathahalli',
      city: 'Bengaluru',
      state: 'Karnataka',
      zip: '560037',
      neighborhood: 'Outer Ring Road Tech Hub',
    },
    specs: {
      bhk: 'Commercial Space',
      bedrooms: 0,
      bathrooms: 8,
      carpetArea: 8500,
      superBuiltUpArea: 10000,
      floorLevel: '4th Floor',
      totalFloors: '12',
      facing: 'East Facing',
      possessionStatus: 'Ready to Occupy',
      garage: 10,
      yearBuilt: 2023,
    },
    featured: false,
    rating: 4.88,
    reviewsCount: 15,
    description: 'Grade-A corporate office space ideal for tech MNCs, global capability centers, and institutional headquarters. Fully fitted with 150+ workstations, executive boardrooms, and 100% DG power backup.',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      '24/7 Power Backup',
      '24/7 Security & CCTV',
      'EV Charging Station',
      'High-Speed Elevators',
    ],
    agent: {
      id: 'agent-3',
      name: 'Ananya Reddy',
      title: 'Head of Commercial Investments',
      phone: '+91 9731088900',
      email: 'ananya@dreamdwellrealestates.in',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
      whatsappNumber: '916366214574',
      localitiesCovered: ['Outer Ring Road', 'Bellandur', 'Electronic City'],
    },
    virtualTourAvailable: false,
    builtIn: '2023',
    reraNumber: 'PRM/KA/RERA/1251/309/AG/260905/007759',
  },
  {
    id: 'DD-105',
    title: 'BMRDA & RERA Approved Villa Plot',
    price: 8500000,
    priceLakhsOrCrores: '₹85 Lakh',
    pricePerSqFt: '₹3,541 / sq.ft.',
    type: 'plot',
    status: 'For Sale',
    location: {
      address: 'Sy No. 48, Devanahalli Airport Corridor',
      subLocality: 'Devanahalli',
      city: 'Bengaluru',
      state: 'Karnataka',
      zip: '562110',
      neighborhood: 'Airport Tech Zone',
    },
    specs: {
      bhk: 'Residential Plot',
      bedrooms: 0,
      bathrooms: 0,
      carpetArea: 2400,
      superBuiltUpArea: 2400,
      facing: 'North-East Facing',
      possessionStatus: 'Immediate Construction',
      garage: 0,
      yearBuilt: 2024,
    },
    featured: false,
    rating: 4.92,
    reviewsCount: 19,
    description: 'BMRDA and RERA approved premium gated plotted development. Complete underground cabling, wide asphalt roads, rainwater harvesting, overhead tank, and immediate villa construction clearance.',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'Vastu Compliant',
      '24/7 Security & CCTV',
      'Children\'s Play Area',
      'Jogging Track',
    ],
    agent: {
      id: 'agent-1',
      name: 'Saba Rao',
      title: 'Principal Advisor & Founder',
      phone: '+91 6366214574',
      email: 'info@dreamdwellrealestates.in',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      whatsappNumber: '916366214574',
      localitiesCovered: ['Devanahalli', 'Yelahanka', 'Hensur Road'],
    },
    virtualTourAvailable: false,
    builtIn: '2024',
    reraNumber: 'PRM/KA/RERA/1251/309/AG/260905/007759',
  },
  {
    id: 'DD-106',
    title: 'Managed Green Farmland & Eco Retreat',
    price: 14000000,
    priceLakhsOrCrores: '₹1.40 Crore',
    pricePerSqFt: '₹642 / sq.ft.',
    type: 'farmland',
    status: 'For Sale',
    location: {
      address: 'Kanakapura Green Corridor',
      subLocality: 'Kanakapura Road',
      city: 'Bengaluru South',
      state: 'Karnataka',
      zip: '562117',
      neighborhood: 'Art of Living Corridor',
    },
    specs: {
      bhk: 'Managed Farmland (0.5 Acre)',
      bedrooms: 2,
      bathrooms: 2,
      carpetArea: 21780,
      superBuiltUpArea: 21780,
      facing: 'East Facing Cottages',
      possessionStatus: 'Immediate Handover',
      garage: 2,
      yearBuilt: 2024,
    },
    featured: true,
    rating: 4.95,
    reviewsCount: 31,
    description: 'Fully managed organic green farmland estate with custom wooden chalet cottage, fruit orchards, drip irrigation, solar power grid, and 24/7 estate maintenance team.',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'Solar Power Energy',
      '24/7 Security & CCTV',
      'Jogging & Walking Trails',
    ],
    agent: {
      id: 'agent-2',
      name: 'Rohan Sharma',
      title: 'Senior Luxury Property Advisor',
      phone: '+91 9845012345',
      email: 'rohan@dreamdwellrealestates.in',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
      whatsappNumber: '916366214574',
      localitiesCovered: ['Kanakapura Road', 'Bannerghatta', 'Mysore Road'],
    },
    virtualTourAvailable: true,
    builtIn: '2024',
    reraNumber: 'PRM/KA/RERA/1251/309/AG/260905/007759',
  },
];
