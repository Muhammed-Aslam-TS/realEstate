'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Bed, Bath, Square, MapPin, Star, ArrowUpRight, CheckCircle, MessageSquare } from 'lucide-react';
import { Property } from '@/data/properties';
import { useFavorites } from '@/context/FavoritesContext';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(property.id);

  // PRD Section 9: WhatsApp Instant Handshake deep-link logic
  const whatsappText = `Hi Dream Dwell, I am interested in ${property.title} (ID: ${property.id}) in ${property.location.subLocality}, ${property.location.city}. Please share the brochure and pricing breakdown.`;
  const whatsappUrl = `https://wa.me/${property.agent.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <div className="group rounded-3xl bg-[#092217]/90 border border-[#059669]/30 hover:border-[#10b981]/60 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#059669]/20 overflow-hidden flex flex-col h-full animate-fade-in">
      {/* Image Header */}
      <div className="relative h-64 w-full overflow-hidden bg-[#061d14]">
        {/* Ambient Backdrop Fill */}
        <Image
          src={property.images[0]}
          alt=""
          fill
          aria-hidden="true"
          className="object-cover blur-2xl scale-125 opacity-50 brightness-75"
        />
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="relative z-10 object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#092217] via-transparent to-transparent opacity-85" />

        {/* Primary Typology Badge & Status */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${
              property.status === 'For Sale'
                ? 'bg-[#059669] text-white shadow-md shadow-[#059669]/30'
                : 'bg-[#10b981] text-[#071d13] shadow-md'
            }`}
          >
            {property.status}
          </span>
          <span className="px-3 py-1 rounded-full text-[10px] font-semibold text-emerald-100 bg-[#071d13]/80 border border-[#059669]/40 backdrop-blur-md uppercase tracking-wider">
            {property.type}
          </span>
        </div>

        {/* Favorite Heart Toggle */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(property.id);
          }}
          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 ${
            favorite
              ? 'bg-red-500/90 border-red-400 text-white shadow-lg shadow-red-500/30'
              : 'bg-[#071d13]/70 border-[#059669]/40 text-slate-200 hover:text-white hover:border-[#10b981]'
          }`}
          title={favorite ? 'Remove from saved' : 'Save property'}
        >
          <Heart className={`w-4 h-4 ${favorite ? 'fill-white' : ''}`} />
        </button>

        {/* Rating & 3D Interactive Indicator */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#071d13]/90 border border-[#059669]/40 backdrop-blur-md text-[#10b981] font-bold">
            <Star className="w-3.5 h-3.5 fill-[#10b981]" />
            <span>{property.rating}</span>
            <span className="text-slate-300 font-normal">({property.reviewsCount})</span>
          </div>

          {property.virtualTourAvailable && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#071d13]/90 border border-[#059669]/40 text-[#10b981] text-[11px] font-semibold backdrop-blur-md">
              <CheckCircle className="w-3.5 h-3.5 text-[#10b981]" /> 3D Walkthrough
            </span>
          )}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
        <div>
          {/* Price Hero */}
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-2xl font-extrabold text-white tracking-tight">
              {property.priceLakhsOrCrores}
            </span>
            {property.pricePerSqFt && (
              <span className="text-[11px] text-emerald-200/80 font-medium">{property.pricePerSqFt}</span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-white group-hover:text-[#10b981] transition-colors line-clamp-1">
            {property.title}
          </h3>

          {/* Sub-locality & Metropolitan City */}
          <p className="flex items-center gap-1.5 text-xs text-slate-300 mt-1">
            <MapPin className="w-3.5 h-3.5 text-[#10b981] flex-shrink-0" />
            <span className="truncate font-medium">
              {property.location.subLocality}, {property.location.city}
            </span>
          </p>
        </div>

        {/* Key Metrics Ribbon Bar (BHK, Bath, Super Built-up Area) */}
        <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-2xl bg-[#04160d] border border-[#059669]/30 text-xs text-slate-200">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4 text-[#10b981]" />
            <span className="truncate"><strong className="text-white font-bold">{property.specs.bhk}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-[#10b981]" />
            <span><strong className="text-white font-bold">{property.specs.bathrooms}</strong> Bath</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Square className="w-4 h-4 text-[#10b981]" />
            <span className="truncate"><strong className="text-white font-bold">{property.specs.superBuiltUpArea.toLocaleString()}</strong> sq.ft.</span>
          </div>
        </div>

        {/* Dual Actions: View Property + Direct WhatsApp Trigger */}
        <div className="pt-2 grid grid-cols-2 gap-2 border-t border-[#059669]/20">
          <Link
            href={`/properties/${property.id}`}
            className="py-2.5 px-3 rounded-xl bg-[#0b2b1d] hover:bg-[#073623] border border-[#059669]/40 text-white font-bold text-xs transition-all flex items-center justify-center gap-1 group/btn"
          >
            <span>View Property</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#10b981] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 rounded-xl bg-[#059669] hover:bg-[#10b981] text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#059669]/30"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-white" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
