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
} from 'lucide-react';
import { PROPERTIES, Property } from '@/data/properties';
import PropertyCard from '@/components/PropertyCard';
import Link from 'next/link';

function PropertiesContent() {
  const searchParams = useSearchParams();

  // Initial filter values from URL search params
  const initialStatus = searchParams.get('status') || 'all';
  const initialType = searchParams.get('type') || 'all';
  const initialCity = searchParams.get('city') || '';
  const initialMaxPrice = searchParams.get('maxPrice') || '';

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>(initialStatus);
  const [typeFilter, setTypeFilter] = useState<string>(initialType);
  const [minBeds, setMinBeds] = useState<number>(0);
  const [minBaths, setMinBaths] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<string>(initialMaxPrice);
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const allAmenitiesList = [
    'Infinity Ocean Pool',
    'Private Yacht Dock',
    'Smart Home Automation',
    'Wine Tasting Room',
    'Spa & Sauna',
    '360 Terrace',
    'Ski-In Ski-Out Access',
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
    setMinBaths(0);
    setMaxPrice('');
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
        const matchesNeighborhood = property.location.neighborhood.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCity && !matchesNeighborhood) return false;
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

      // Min Baths
      if (minBaths > 0 && property.specs.bathrooms < minBaths) {
        return false;
      }

      // Max Price
      if (maxPrice && property.price > Number(maxPrice)) {
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
    minBaths,
    maxPrice,
    selectedAmenities,
    sortBy,
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
          <Building2 className="w-4 h-4" /> Global Real Estate Portfolio
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Explore Exclusive Estates
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Browse luxury villas, penthouses, and beachfront estates. Use our real-time filters to narrow down by price, bedrooms, status, and amenities.
        </p>
      </div>

      {/* Main Search & Layout Container */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* FILTERS SIDEBAR */}
        <div className="space-y-6 lg:col-span-1 bg-slate-900/80 border border-slate-800 p-6 rounded-3xl h-fit">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-amber-400" /> Filter Portfolio
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-xs text-amber-400 hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Search input */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Keywords / City
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="e.g. Miami, Penthouse, Beach"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Property Status
            </label>
            <div className="grid grid-cols-3 gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
              {[
                { label: 'All', value: 'all' },
                { label: 'Sale', value: 'For Sale' },
                { label: 'Rent', value: 'For Rent' },
              ].map((s) => (
                <button
                  key={s.value}
                  onClick={() => setStatusFilter(s.value)}
                  className={`py-1.5 text-xs font-medium rounded-lg transition-all ${
                    statusFilter === s.value
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Estate Category
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Categories</option>
              <option value="waterfront">Waterfront Villa</option>
              <option value="penthouse">Sky Penthouse</option>
              <option value="villa">Luxury Villa</option>
              <option value="mansion">Mansion</option>
              <option value="apartment">Modern Apartment</option>
            </select>
          </div>

          {/* Max Price */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Maximum Budget
            </label>
            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              <option value="">No Maximum Limit</option>
              <option value="50000">Up to $50,000 / month</option>
              <option value="5000000">Up to $5,000,000</option>
              <option value="10000000">Up to $10,000,000</option>
              <option value="15000000">Up to $15,000,000</option>
            </select>
          </div>

          {/* Bedrooms & Bathrooms */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Min Beds
              </label>
              <select
                value={minBeds}
                onChange={(e) => setMinBeds(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value={0}>Any</option>
                <option value={3}>3+ Beds</option>
                <option value={4}>4+ Beds</option>
                <option value={5}>5+ Beds</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Min Baths
              </label>
              <select
                value={minBaths}
                onChange={(e) => setMinBaths(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value={0}>Any</option>
                <option value={3}>3+ Baths</option>
                <option value={4}>4+ Baths</option>
                <option value={6}>6+ Baths</option>
              </select>
            </div>
          </div>

          {/* Amenities Checkboxes */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Features & Amenities
            </label>
            <div className="space-y-2">
              {allAmenitiesList.map((amenity) => (
                <label key={amenity} className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer hover:text-amber-400 transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="rounded border-slate-800 bg-slate-950 text-amber-500 focus:ring-amber-500"
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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-xs text-slate-400">
              Showing <strong className="text-white">{filteredProperties.length}</strong> of{' '}
              <strong className="text-white">{PROPERTIES.length}</strong> luxury estates
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              {/* Sort By */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* View Switcher */}
              <div className="flex items-center p-1 bg-slate-950 border border-slate-800 rounded-xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg text-slate-400 hover:text-white transition-all ${
                    viewMode === 'grid' ? 'bg-amber-500 text-slate-950' : ''
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg text-slate-400 hover:text-white transition-all ${
                    viewMode === 'list' ? 'bg-amber-500 text-slate-950' : ''
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
            <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-4">
              <Sparkles className="w-12 h-12 text-amber-500/40 mx-auto" />
              <h3 className="text-xl font-bold text-white">No Estates Match Your Criteria</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try adjusting your budget, property category, or clearing amenity filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2 rounded-full bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400"
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
                  className="p-4 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row gap-6 hover:border-amber-500/40 transition-all"
                >
                  <div className="relative h-56 md:w-72 rounded-2xl overflow-hidden bg-slate-950 flex-shrink-0">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 uppercase">
                      {property.status}
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-extrabold text-amber-400">{property.formattedPrice}</span>
                        <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{property.rating}</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-white mt-1">{property.title}</h3>
                      <p className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>{property.location.address}, {property.location.city}, {property.location.state}</span>
                      </p>
                      <p className="text-xs text-slate-400 mt-2 line-clamp-2">{property.description}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs text-slate-300">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1"><Bed className="w-4 h-4 text-amber-400" /> {property.specs.bedrooms} Beds</span>
                        <span className="flex items-center gap-1"><Bath className="w-4 h-4 text-amber-400" /> {property.specs.bathrooms} Baths</span>
                        <span className="flex items-center gap-1"><Square className="w-4 h-4 text-amber-400" /> {property.specs.sqft} sqft</span>
                      </div>
                      <Link
                        href={`/properties/${property.id}`}
                        className="px-4 py-1.5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400"
                      >
                        View Estate
                      </Link>
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
    <Suspense fallback={<div className="text-center py-20 text-slate-400">Loading estate listings...</div>}>
      <PropertiesContent />
    </Suspense>
  );
}
