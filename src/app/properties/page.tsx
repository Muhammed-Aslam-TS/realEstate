'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  RotateCcw,
  Sparkles,
  MapPin,
  Bed,
  Bath,
  Square,
  Star,
  Building2,
  MessageSquare,
} from 'lucide-react';
import { PROPERTIES } from '@/data/properties';
import PropertyCard from '@/components/PropertyCard';
import Link from 'next/link';

function PropertiesContent() {
  const searchParams = useSearchParams();

  // Initial filter values from URL search params
  const initialStatus = searchParams.get('status') || 'all';
  const initialType = searchParams.get('type') || 'all';
  const initialCity = searchParams.get('city') || '';
  const initialMaxBudget = searchParams.get('maxBudget') || '';

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>(initialStatus);
  const [typeFilter, setTypeFilter] = useState<string>(initialType);
  const [minBeds, setMinBeds] = useState<number>(0);
  const [maxBudget, setMaxBudget] = useState<string>(initialMaxBudget);
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const allAmenitiesList = [
    'Clubhouse',
    'EV Charging Station',
    '24/7 Power Backup',
    'Swimming Pool',
    'Jogging Track',
    '24/7 Security & CCTV',
    'Vastu Compliant',
    'Children\'s Play Area',
  ];

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setTypeFilter('all');
    setMinBeds(0);
    setMaxBudget('');
    setSelectedAmenities([]);
    setSortBy('recommended');
  };

  // Filter & Sort Logic
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((property) => {
      // Search term
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = property.title.toLowerCase().includes(query);
        const matchesCity = property.location.city.toLowerCase().includes(query);
        const matchesSubLocality = property.location.subLocality.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCity && !matchesSubLocality) return false;
      }

      // Status
      if (statusFilter !== 'all' && property.status !== statusFilter) {
        return false;
      }

      // Type
      if (typeFilter !== 'all' && property.type.toLowerCase() !== typeFilter.toLowerCase()) {
        return false;
      }

      // Min Beds
      if (minBeds > 0 && property.specs.bedrooms < minBeds) {
        return false;
      }

      // Max Budget (INR)
      if (maxBudget && property.price > Number(maxBudget)) {
        return false;
      }

      // Selected Amenities
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every((amenity) =>
          property.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // recommended
    });
  }, [
    searchTerm,
    statusFilter,
    typeFilter,
    minBeds,
    maxBudget,
    selectedAmenities,
    sortBy,
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#10b981] flex items-center gap-1.5">
          <Building2 className="w-4 h-4" /> Dream Dwell Verified Inventory
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Explore Localized Indian Properties
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl">
          Browse luxury apartments, gated villas, mansions, commercial spaces, BMRDA/RERA plots, and eco farmlands in ₹ INR.
        </p>
      </div>

      {/* Main Search & Layout Container */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* FILTERS SIDEBAR */}
        <div className="space-y-6 lg:col-span-1 bg-[#092217]/90 border border-[#059669]/30 p-6 rounded-3xl h-fit">
          <div className="flex items-center justify-between border-b border-[#059669]/20 pb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#10b981]" /> Filter Catalog
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-xs text-[#10b981] hover:underline flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Search input */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Keywords / Sub-Locality
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="e.g. Whitefield, Indiranagar, Villa"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#04160d] border border-[#059669]/40 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#10b981]"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Property Status
            </label>
            <div className="grid grid-cols-3 gap-2 p-1 bg-[#04160d] rounded-xl border border-[#059669]/30">
              {[
                { label: 'All', value: 'all' },
                { label: 'Sale', value: 'For Sale' },
                { label: 'Rent', value: 'For Rent' },
              ].map((s) => (
                <button
                  key={s.value}
                  onClick={() => setStatusFilter(s.value)}
                  className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                    statusFilter === s.value
                      ? 'bg-[#059669] text-white shadow-md'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Typology Category
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full bg-[#04160d] border border-[#059669]/40 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#10b981]"
            >
              <option value="all">All Categories</option>
              <option value="apartment">Premium Apartment</option>
              <option value="villa">Premium Villa</option>
              <option value="mansion">Architectural Mansion</option>
              <option value="commercial">Commercial Space</option>
              <option value="plot">Premium Plot (BMRDA/RERA)</option>
              <option value="farmland">Farmlands</option>
            </select>
          </div>

          {/* Max Price (INR) */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              ₹ Maximum Budget
            </label>
            <select
              value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value)}
              className="w-full bg-[#04160d] border border-[#059669]/40 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#10b981]"
            >
              <option value="">No Budget Limit</option>
              <option value="10000000">Up to ₹1 Crore</option>
              <option value="30000000">Up to ₹3 Crores</option>
              <option value="50000000">Up to ₹5 Crores</option>
              <option value="100000000">Up to ₹10 Crores+</option>
            </select>
          </div>

          {/* Min Bedrooms */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Min BHK / Bedrooms
            </label>
            <select
              value={minBeds}
              onChange={(e) => setMinBeds(Number(e.target.value))}
              className="w-full bg-[#04160d] border border-[#059669]/40 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#10b981]"
            >
              <option value={0}>Any BHK</option>
              <option value={3}>3+ Bedrooms</option>
              <option value={4}>4+ Bedrooms</option>
              <option value={5}>5+ Bedrooms</option>
            </select>
          </div>

          {/* Amenities Checkboxes */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Amenities & Features
            </label>
            <div className="space-y-2">
              {allAmenitiesList.map((amenity) => (
                <label key={amenity} className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer hover:text-[#10b981] transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="rounded border-[#059669]/40 bg-[#04160d] text-[#059669] focus:ring-[#059669]"
                  />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* RESULTS GRID & TOP CONTROLS */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Control Strip */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#092217]/80 border border-[#059669]/30">
            <div className="text-xs text-slate-300">
              Showing <strong className="text-white font-bold">{filteredProperties.length}</strong> of{' '}
              <strong className="text-white font-bold">{PROPERTIES.length}</strong> verified properties
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              {/* Sort By */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-300 font-semibold">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#04160d] border border-[#059669]/40 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#10b981]"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* View Switcher */}
              <div className="flex items-center p-1 bg-[#04160d] border border-[#059669]/30 rounded-xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg text-slate-300 hover:text-white transition-all ${
                    viewMode === 'grid' ? 'bg-[#059669] text-white font-bold' : ''
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg text-slate-300 hover:text-white transition-all ${
                    viewMode === 'list' ? 'bg-[#059669] text-white font-bold' : ''
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Properties Render */}
          {filteredProperties.length === 0 ? (
            <div className="text-center py-20 bg-[#092217]/40 rounded-3xl border border-[#059669]/30 space-y-4">
              <Sparkles className="w-12 h-12 text-[#10b981]/40 mx-auto" />
              <h3 className="text-xl font-bold text-white">No Properties Match Your Search</h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Try clearing your budget filter or adjusting locality search parameters.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2 rounded-full bg-[#059669] text-white font-bold text-xs hover:bg-[#10b981]"
              >
                Clear All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="p-4 rounded-3xl bg-[#092217]/90 border border-[#059669]/30 flex flex-col md:flex-row gap-6 hover:border-[#10b981] transition-all"
                >
                  <div className="relative h-56 md:w-72 rounded-2xl overflow-hidden bg-[#04120c] flex-shrink-0">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold bg-[#059669] text-white uppercase">
                      {property.status}
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-extrabold text-white">{property.priceLakhsOrCrores}</span>
                        <div className="flex items-center gap-1 text-xs text-[#10b981] font-bold">
                          <Star className="w-3.5 h-3.5 fill-[#10b981]" />
                          <span>{property.rating}</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-white mt-1">{property.title}</h3>
                      <p className="flex items-center gap-1 text-xs text-slate-300 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-[#10b981]" />
                        <span>{property.location.subLocality}, {property.location.city}</span>
                      </p>
                      <p className="text-xs text-slate-300 mt-2 line-clamp-2">{property.description}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#059669]/20 pt-3 text-xs text-slate-200">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1"><Bed className="w-4 h-4 text-[#10b981]" /> {property.specs.bhk}</span>
                        <span className="flex items-center gap-1"><Bath className="w-4 h-4 text-[#10b981]" /> {property.specs.bathrooms} Bath</span>
                        <span className="flex items-center gap-1"><Square className="w-4 h-4 text-[#10b981]" /> {property.specs.superBuiltUpArea} sq.ft.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/properties/${property.id}`}
                          className="px-4 py-1.5 rounded-full bg-[#0b2b1d] border border-[#059669]/40 text-white font-bold text-xs hover:bg-[#073623]"
                        >
                          View Details
                        </Link>
                        <a
                          href={`https://wa.me/${property.agent.whatsappNumber}?text=Hi%20Dream%20Dwell,%20interested%20in%20${encodeURIComponent(property.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-full bg-[#059669] text-white hover:bg-[#10b981]"
                          title="WhatsApp Inquiry"
                        >
                          <MessageSquare className="w-4 h-4 fill-white" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-slate-300">Loading catalog...</div>}>
      <PropertiesContent />
    </Suspense>
  );
}
