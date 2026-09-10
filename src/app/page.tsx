'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Search,
  Building2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  Compass,
  MapPin,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Star,
  MessageSquare,
  FileCheck,
  UserCheck,
  TrendingUp,
} from 'lucide-react';
import { PROPERTIES } from '@/data/properties';
import PropertyCard from '@/components/PropertyCard';
import { AGENTS } from '@/data/agents';

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80',
    title: 'Dream Dwell Real Estates',
    subtitle: 'Your Trusted High-Growth & Luxury Property Partner',
    tag: 'Prestige Sanctuary • Whitefield, Bengaluru',
    link: '/properties/DD-101',
  },
  {
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80',
    title: 'Skyview Horizon Penthouse',
    subtitle: 'Ultra-Luxury Sky Villa & Private Terrace Deck',
    tag: '100 Feet Road • Indiranagar, Bengaluru',
    link: '/properties/DD-102',
  },
  {
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=2000&q=80',
    title: 'Sadashivanagar Heritage Mansion',
    subtitle: 'Exclusive Diplomatic Bungalow & Zen Courts',
    tag: 'Diplomatic Enclave • Sadashivanagar, Bengaluru',
    link: '/properties/DD-103',
  },
  {
    image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=2000&q=80',
    title: 'Managed Green Farmlands',
    subtitle: 'Private Wooden Chalet & Organic Eco Retreat',
    tag: 'Green Corridor • Kanakapura Road, Bengaluru',
    link: '/properties/DD-106',
  },
];

export default function HomePage() {
  const router = useRouter();
  const [tab, setTab] = useState<'all' | 'sale' | 'rent'>('all');
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const featuredProperties = PROPERTIES.filter((p) => p.featured);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (tab === 'sale') params.append('status', 'For Sale');
    if (tab === 'rent') params.append('status', 'For Rent');
    if (city) params.append('city', city);
    if (type) params.append('type', type);
    if (maxBudget) params.append('maxBudget', maxBudget);

    router.push(`/properties?${params.toString()}`);
  };

  // PRD Section 7: Architectural Typologies (Indian Taxonomy)
  const categories = [
    {
      title: 'Premium Apartments',
      desc: 'Gated luxury high-rises, penthouses, and duplex residences in key metro corridors.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      type: 'apartment',
    },
    {
      title: 'Premium Villas',
      desc: 'Independent luxury bungalows, row houses, and private gated community villas.',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      type: 'villa',
    },
    {
      title: 'Architectural Mansions',
      desc: 'Ultra-luxury flagship estates, bespoke builder floors, and expansive private mansions.',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
      type: 'mansion',
    },
    {
      title: 'Commercial Spaces',
      desc: 'Grade-A corporate office suites, retail showrooms, and institutional tech park floors.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      type: 'commercial',
    },
    {
      title: 'Premium Plots',
      desc: 'Approved plotted developments (BMRDA, DTCP, RERA) for immediate villa construction.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
      type: 'plot',
    },
    {
      title: 'Farmlands',
      desc: 'Managed green estates, countryside weekend getaway retreats, and eco farming parcels.',
      image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=800&q=80',
      type: 'farmland',
    },
  ];

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* HERO CAROUSEL SECTION */}
      <section className="relative min-h-[75vh] sm:min-h-[82vh] flex flex-col justify-between -mt-24 pt-28 pb-8 px-4 sm:px-6 lg:px-8 group/hero">
        {/* Background Image Carousel Slides */}
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
              idx === activeSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={idx === 0}
              className="object-cover object-center brightness-[0.75] contrast-105 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071d13] via-[#071d13]/35 to-[#04160d]/50" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#10b981]/20 via-transparent to-transparent" />
          </div>
        ))}

        {/* Carousel Arrow Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-[#071d13]/80 border border-[#059669]/50 text-white hover:bg-[#059669] hover:border-[#10b981] transition-all shadow-xl backdrop-blur-md opacity-80 group-hover/hero:opacity-100"
          title="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-[#071d13]/80 border border-[#059669]/50 text-white hover:bg-[#059669] hover:border-[#10b981] transition-all shadow-xl backdrop-blur-md opacity-80 group-hover/hero:opacity-100"
          title="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Hero Content Overlay */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-5 my-auto">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#059669]/20 border border-[#059669]/40 text-[#10b981] text-[11px] font-medium uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" /> Karnataka RERA Approved Partner • Ref ID: 20696205
            </div>
            <span className="px-3.5 py-1.5 rounded-full bg-[#04160d]/80 border border-[#059669]/50 text-[#a7f3d0] text-[11px] font-semibold backdrop-blur-md">
              {HERO_SLIDES[activeSlide].tag}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight transition-all duration-500 drop-shadow-md">
            {HERO_SLIDES[activeSlide].title}
            <span className="block text-xl sm:text-2xl lg:text-3xl font-medium text-[#a7f3d0] mt-2 tracking-normal drop-shadow">
              {HERO_SLIDES[activeSlide].subtitle}
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-sm">
            Representing Bengaluru’s finest luxury gated villas, high-rise penthouses, BMRDA/RERA plots, and Grade-A commercial spaces with assisted consultation.
          </p>

          {/* Carousel Slide Indicators */}
          <div className="flex items-center justify-center gap-2 pt-1 pb-2">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeSlide ? 'w-8 bg-[#10b981] shadow-md shadow-[#10b981]/50' : 'w-2 bg-[#059669]/40 hover:bg-[#059669]'
                }`}
                title={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Quick Search Widget */}
          <div className="max-w-4xl mx-auto bg-[#061e14]/95 backdrop-blur-xl border border-[#059669]/40 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-black/60 space-y-4">
            {/* Status Tabs */}
            <div className="flex items-center gap-2 border-b border-[#059669]/30 pb-3">
              {[
                { label: 'All Catalog', value: 'all' },
                { label: 'For Sale', value: 'sale' },
                { label: 'For Rent', value: 'rent' },
              ].map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTab(t.value as any)}
                  type="button"
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    tab === t.value
                      ? 'bg-[#059669] text-white shadow-md shadow-[#059669]/40 border border-[#10b981]/50'
                      : 'text-slate-300 hover:text-white hover:bg-[#092b1d]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Form Filters */}
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end text-left">
              <div className="sm:col-span-3 space-y-1">
                <label className="block text-[10px] font-semibold text-[#a7f3d0]/90 uppercase tracking-wider">
                  Locality / City
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#04160d] border border-[#059669]/50 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#10b981] cursor-pointer shadow-inner appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2310b981%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-[right_14px_center] bg-no-repeat pr-8"
                >
                  <option value="" className="bg-[#071d13] text-white">All Localities</option>
                  <option value="Whitefield" className="bg-[#071d13] text-white">Whitefield, Bengaluru</option>
                  <option value="Indiranagar" className="bg-[#071d13] text-white">Indiranagar, Bengaluru</option>
                  <option value="Sadashivanagar" className="bg-[#071d13] text-white">Sadashivanagar, Bengaluru</option>
                  <option value="Marathahalli" className="bg-[#071d13] text-white">Marathahalli / ORR</option>
                  <option value="Devanahalli" className="bg-[#071d13] text-white">Devanahalli Airport Zone</option>
                  <option value="Kanakapura" className="bg-[#071d13] text-white">Kanakapura Road</option>
                </select>
              </div>

              <div className="sm:col-span-3 space-y-1">
                <label className="block text-[10px] font-semibold text-[#a7f3d0]/90 uppercase tracking-wider">
                  Typology Category
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-[#04160d] border border-[#059669]/50 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#10b981] cursor-pointer shadow-inner appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2310b981%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-[right_14px_center] bg-no-repeat pr-8"
                >
                  <option value="" className="bg-[#071d13] text-white">All Categories</option>
                  <option value="apartment" className="bg-[#071d13] text-white">Premium Apartment</option>
                  <option value="villa" className="bg-[#071d13] text-white">Premium Villa</option>
                  <option value="mansion" className="bg-[#071d13] text-white">Architectural Mansion</option>
                  <option value="commercial" className="bg-[#071d13] text-white">Commercial Space</option>
                  <option value="plot" className="bg-[#071d13] text-white">Premium Plot (BMRDA/RERA)</option>
                  <option value="farmland" className="bg-[#071d13] text-white">Farmlands & Eco Retreat</option>
                </select>
              </div>

              <div className="sm:col-span-3 space-y-1">
                <label className="block text-[10px] font-semibold text-[#a7f3d0]/90 uppercase tracking-wider">
                  ₹ Budget Limit
                </label>
                <select
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(e.target.value)}
                  className="w-full bg-[#04160d] border border-[#059669]/50 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#10b981] cursor-pointer shadow-inner appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2310b981%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-[right_14px_center] bg-no-repeat pr-8"
                >
                  <option value="" className="bg-[#071d13] text-white">Any Budget</option>
                  <option value="10000000" className="bg-[#071d13] text-white">Up to ₹1 Crore</option>
                  <option value="30000000" className="bg-[#071d13] text-white">Up to ₹3 Crores</option>
                  <option value="50000000" className="bg-[#071d13] text-white">Up to ₹5 Crores</option>
                  <option value="100000000" className="bg-[#071d13] text-white">Up to ₹10 Crores+</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-[#059669] to-[#10b981] hover:brightness-110 text-white font-semibold rounded-xl text-xs shadow-md shadow-[#059669]/40 transition-all flex items-center justify-center gap-2 h-[38px]"
                >
                  <Search className="w-3.5 h-3.5 stroke-[2]" />
                  <span>Search Properties</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* STATS STRIP & CREDENTIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-8 rounded-3xl bg-[#092217]/90 border border-[#059669]/30 backdrop-blur-xl">
          <div className="text-center space-y-1">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              ₹450 Cr+
            </h3>
            <p className="text-[11px] text-[#a7f3d0] uppercase tracking-wider font-medium">Trophy Property Volume</p>
          </div>
          <div className="text-center space-y-1">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              100%
            </h3>
            <p className="text-[11px] text-[#a7f3d0] uppercase tracking-wider font-medium">RERA & Legal Verified</p>
          </div>
          <div className="text-center space-y-1">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              200+
            </h3>
            <p className="text-[11px] text-[#a7f3d0] uppercase tracking-wider font-medium">Assisted Site Visits</p>
          </div>
          <div className="text-center space-y-1">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Ref 20696205
            </h3>
            <p className="text-[11px] text-[#a7f3d0] uppercase tracking-wider font-medium">Prestige Channel Partner</p>
          </div>
        </div>
      </section>

      {/* PRD SECTION 7: ARCHITECTURAL TYPOLOGIES (INDIAN TAXONOMY) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#10b981] flex items-center justify-center gap-1.5">
            <Compass className="w-3.5 h-3.5" /> Indian Property Portfolio
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Architectural Typologies
          </h2>
          <p className="text-xs sm:text-sm text-slate-300/90">
            Explore handpicked properties categorized by official Indian real estate classifications.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={`/properties?type=${cat.type}`}
              className="group relative h-80 rounded-3xl overflow-hidden border border-[#059669]/30 hover:border-[#10b981] transition-all duration-300 shadow-xl"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071d13] via-[#071d13]/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <span className="text-[11px] font-bold text-[#10b981] uppercase tracking-wider bg-[#04120c]/80 px-3 py-1 rounded-full border border-[#059669]/40 backdrop-blur-md inline-block">
                  View Catalog
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-[#a7f3d0] transition-colors flex items-center justify-between">
                  <span>{cat.title}</span>
                  <ChevronRight className="w-5 h-5 text-[#10b981] group-hover:translate-x-1 transition-transform" />
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED ESTATES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#059669]/20 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#10b981] flex items-center gap-1.5">
              <Building2 className="w-4 h-4" /> Curated Bangalore Inventory
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Luxury Residences
            </h2>
          </div>
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#092217] border border-[#059669]/40 text-sm font-semibold text-white hover:text-[#10b981] hover:border-[#10b981] transition-all group"
          >
            <span>Browse All Listings</span>
            <ArrowRight className="w-4 h-4 text-[#10b981] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* PRD SECTION 8: BRAND REPOSITIONING - WHY DREAM DWELL SECTION */}
      <section className="bg-[#071d13]/60 border-y border-[#059669]/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#10b981] flex items-center justify-center gap-1.5">
              <Award className="w-4 h-4" /> High-Trust Assisted Consultation
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Why Dream Dwell Real Estates?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We replace self-service e-commerce models with personalized, relationship-driven guidance to resolve key Indian buyer pain points.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-[#092217] border border-[#059669]/30 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#059669]/20 text-[#10b981] flex items-center justify-center">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">100% Verified Properties</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Comprehensive legal verification, RERA compliance check, and title-deed transparency before any asset is listed.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#092217] border border-[#059669]/30 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#059669]/20 text-[#10b981] flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Curated Luxury Portfolio</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Handpicked inventory evaluated on construction quality, developer reputation, and long-term capital appreciation.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#092217] border border-[#059669]/30 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#059669]/20 text-[#10b981] flex items-center justify-center">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Personalized Advisory</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dedicated single point of contact from first discovery through site visits, negotiation, and registry.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#092217] border border-[#059669]/30 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#059669]/20 text-[#10b981] flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Transparent Transactions</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Zero hidden charges, upfront pricing visibility, and seamless documentation support throughout closing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ADVISORY TEAM SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#059669]/20 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#10b981] flex items-center gap-1.5">
              <Users className="w-4 h-4" /> Verified Advisors
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Dream Dwell Property Advisors
            </h2>
          </div>
          <Link
            href="/agents"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#10b981] hover:underline"
          >
            <span>Meet Entire Team</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {AGENTS.map((agent) => (
            <div
              key={agent.id}
              className="p-6 rounded-3xl bg-[#092217] border border-[#059669]/30 space-y-4 hover:border-[#10b981] transition-all"
            >
              <div className="relative h-64 rounded-2xl overflow-hidden bg-[#04120c]">
                <Image
                  src={agent.image}
                  alt={agent.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                <p className="text-xs text-[#10b981] font-semibold">{agent.role}</p>
                <p className="text-xs text-slate-300 mt-2 line-clamp-2">{agent.bio}</p>
              </div>
              <div className="pt-2 border-t border-[#059669]/20 flex items-center justify-between text-xs">
                <span className="text-slate-300">Contact: <strong className="text-white">{agent.phone}</strong></span>
                <a
                  href={`https://wa.me/${agent.whatsappNumber}?text=Hi%20${encodeURIComponent(agent.name)},%20I%20am%20seeking%20advisory%20for%20property%20investments.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#10b981] font-bold hover:underline flex items-center gap-1"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-[#10b981]" /> WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden p-10 sm:p-16 bg-gradient-to-r from-[#071d13] via-[#092217] to-[#04160d] border border-[#059669]/40 shadow-2xl text-center space-y-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#059669]/10 blur-3xl pointer-events-none rounded-full" />
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-2xl mx-auto">
            Schedule a Physical Site Visit Today
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Connect directly with Saba Rao and our team for legal title verification, physical site checks, and registration assistance.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="https://wa.me/916366214574?text=Hi%20Dream%20Dwell,%20I%20would%20like%20to%20schedule%20a%20site%20visit."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-[#059669] hover:bg-[#10b981] text-white font-bold text-sm shadow-lg shadow-[#059669]/30 transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Instant WhatsApp Inquiry</span>
            </a>
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full bg-[#092217] border border-[#059669]/50 text-white font-bold text-sm hover:bg-[#073623] hover:border-[#10b981] transition-all"
            >
              Contact Office
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
