'use client';

import React, { useState } from 'react';
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
  Star,
} from 'lucide-react';
import { PROPERTIES } from '@/data/properties';
import PropertyCard from '@/components/PropertyCard';
import { AGENTS } from '@/data/agents';

export default function HomePage() {
  const router = useRouter();
  const [tab, setTab] = useState<'all' | 'sale' | 'rent'>('all');
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const featuredProperties = PROPERTIES.filter((p) => p.featured);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (tab === 'sale') params.append('status', 'For Sale');
    if (tab === 'rent') params.append('status', 'For Rent');
    if (city) params.append('city', city);
    if (type) params.append('type', type);
    if (maxPrice) params.append('maxPrice', maxPrice);

    router.push(`/properties?${params.toString()}`);
  };

  const categories = [
    {
      title: 'Waterfront Villas',
      count: '42 Estates',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      type: 'waterfront',
    },
    {
      title: 'Skyview Penthouses',
      count: '28 Residences',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      type: 'penthouse',
    },
    {
      title: 'Architectural Mansions',
      count: '35 Properties',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
      type: 'mansion',
    },
    {
      title: 'Alpine Ski Retreats',
      count: '19 Chalets',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      type: 'villa',
    },
  ];

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center -mt-24 pt-28 px-4 sm:px-6 lg:px-8">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80"
            alt="Luxury Villa Hero Background"
            fill
            priority
            className="object-cover object-center brightness-[0.35] scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-4 h-4" /> Premier Global Real Estate Advisory
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Discover Extraordinary Living &{' '}
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              Masterpiece Estates
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            Representing the world’s most prestigious oceanfront villas, architectural mansions, and skyview penthouses with bespoke white-glove service.
          </p>

          {/* Quick Search Widget */}
          <div className="max-w-4xl mx-auto bg-slate-950/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl shadow-slate-950/80 space-y-4">
            {/* Status Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              {[
                { label: 'All Estates', value: 'all' },
                { label: 'For Sale', value: 'sale' },
                { label: 'For Rent', value: 'rent' },
              ].map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTab(t.value as any)}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                    tab === t.value
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Form Filters */}
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Location
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="">All Locations</option>
                  <option value="Miami Beach">Miami Beach, FL</option>
                  <option value="New York">New York, NY</option>
                  <option value="Los Angeles">Los Angeles, CA</option>
                  <option value="Aspen">Aspen, CO</option>
                  <option value="Malibu">Malibu, CA</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Estate Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="">All Types</option>
                  <option value="waterfront">Waterfront Villa</option>
                  <option value="penthouse">Sky Penthouse</option>
                  <option value="villa">Luxury Villa</option>
                  <option value="mansion">Mansion</option>
                  <option value="apartment">Modern Loft</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Budget Limit
                </label>
                <select
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="">Any Budget</option>
                  <option value="5000000">Up to $5,000,000</option>
                  <option value="10000000">Up to $10,000,000</option>
                  <option value="15000000">Up to $15,000,000</option>
                  <option value="20000000">$20,000,000+</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 px-6 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-bold rounded-xl text-xs hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 h-[38px]"
                >
                  <Search className="w-4 h-4 stroke-[2.5]" />
                  <span>Search Estates</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl">
          <div className="text-center space-y-1">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              $2.4B+
            </h3>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Trophy Volume Sold</p>
          </div>
          <div className="text-center space-y-1">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              99.4%
            </h3>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Client Satisfaction</p>
          </div>
          <div className="text-center space-y-1">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              350+
            </h3>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Off-Market Properties</p>
          </div>
          <div className="text-center space-y-1">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              15+
            </h3>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Global Flagship Hubs</p>
          </div>
        </div>
      </section>

      {/* FEATURED ESTATES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
              <Building2 className="w-4 h-4" /> Curated Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Luxury Residences
            </h2>
          </div>
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 border border-slate-800 text-sm font-semibold text-white hover:text-amber-400 hover:border-amber-500/40 transition-all group"
          >
            <span>Explore All Properties</span>
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* BROWSE BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center justify-center gap-1.5">
            <Compass className="w-4 h-4" /> Architectural Typologies
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Explore Estates by Style
          </h2>
          <p className="text-sm text-slate-400">
            Select from our distinguished architectural classifications curated for discerning buyers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={`/properties?type=${cat.type}`}
              className="group relative h-80 rounded-3xl overflow-hidden border border-slate-800/80 hover:border-amber-500/50 transition-all duration-300 shadow-xl"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 space-y-1">
                <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                  {cat.count}
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
                  <span>{cat.title}</span>
                  <ChevronRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE LUXEHAVEN */}
      <section className="bg-slate-900/40 border-y border-slate-800/80 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
              <Award className="w-4 h-4" /> White-Glove Distinction
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Unrivaled Discretion & Market Leadership
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              At LuxeHaven, we go beyond standard brokerage. We act as trusted advisors to global leaders, tech founders, celebrities, and institutional investors seeking prime real estate assets.
            </p>

            <div className="space-y-4 pt-2">
              {[
                { title: 'Off-Market Private Collection', desc: 'Access exclusive trophy properties never advertised publicly.' },
                { title: 'Virtual 3D Immersive Walkthroughs', desc: 'Tour estates anywhere in the world with high-definition spatial technology.' },
                { title: 'Legal, Tax & Wealth Advisory', desc: 'Seamless international escrow, tax optimization, and title structures.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800/80">
                  <CheckCircle2 className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-bold text-sm">{item.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[480px] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              alt="Luxury Interior Villa"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-slate-950/80 border border-slate-800 backdrop-blur-md space-y-2">
              <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="text-white ml-2">5.0 Star Advisory Rating</span>
              </div>
              <p className="text-xs text-slate-300 italic">
                “LuxeHaven secured our Miami waterfront estate off-market in under 10 days. The level of confidentiality and execution was phenomenal.”
              </p>
              <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                — CEO, Fortune 500 Enterprise
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ADVISORY TEAM SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
              <Users className="w-4 h-4" /> Meet Our Advisors
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              World-Class Luxury Brokers
            </h2>
          </div>
          <Link
            href="/agents"
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>View All Advisors</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {AGENTS.slice(0, 3).map((agent) => (
            <div
              key={agent.id}
              className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 space-y-4 hover:border-amber-500/40 transition-all"
            >
              <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-950">
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
                <p className="text-xs text-amber-400 font-semibold">{agent.role}</p>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">{agent.bio}</p>
              </div>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Total Volume: <strong className="text-white">{agent.totalVolume}</strong></span>
                <Link
                  href={`/contact?agent=${encodeURIComponent(agent.name)}`}
                  className="text-amber-400 font-bold hover:underline"
                >
                  Contact Agent
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden p-10 sm:p-16 bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 shadow-2xl text-center space-y-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-2xl mx-auto">
            Ready to Find Your Next Masterpiece Estate?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Schedule a confidential consultation with our principal advisors today or explore our full directory of available properties.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/properties"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-bold text-sm hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all"
            >
              Browse All Properties
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full bg-slate-900 border border-slate-700 text-white font-bold text-sm hover:bg-slate-800 hover:border-amber-400 transition-all"
            >
              Request Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
