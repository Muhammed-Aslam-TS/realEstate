'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Bed, Bath, Square, MapPin, Star, ArrowUpRight, CheckCircle } from 'lucide-react';
import { Property } from '@/data/properties';
import { useFavorites } from '@/context/FavoritesContext';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(property.id);

  return (
    <div className="group rounded-3xl bg-slate-900/80 border border-slate-800/80 hover:border-amber-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 overflow-hidden flex flex-col h-full">
      {/* Image Header */}
      <div className="relative h-64 w-full overflow-hidden bg-slate-950">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

        {/* Status Badge */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${
              property.status === 'For Sale'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
            }`}
          >
            {property.status}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium text-slate-200 bg-slate-950/70 border border-slate-700/60 backdrop-blur-md capitalize">
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
              : 'bg-slate-950/60 border-slate-700/60 text-slate-300 hover:text-white hover:border-amber-400'
          }`}
          title={favorite ? 'Remove from favorites' : 'Save to favorites'}
        >
          <Heart className={`w-4 h-4 ${favorite ? 'fill-white' : ''}`} />
        </button>

        {/* Rating & Virtual Tour indicator */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 border border-slate-800 backdrop-blur-md text-amber-400 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{property.rating}</span>
            <span className="text-slate-400 font-normal">({property.reviewsCount})</span>
          </div>

          {property.virtualTourAvailable && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-emerald-400 text-[11px] font-medium backdrop-blur-md">
              <CheckCircle className="w-3 h-3" /> 3D Tour
            </span>
          )}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
        <div>
          {/* Price */}
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-2xl font-extrabold text-white tracking-tight bg-gradient-to-r from-white via-amber-100 to-amber-400 bg-clip-text text-transparent">
              {property.formattedPrice}
            </span>
            {property.period && (
              <span className="text-xs text-slate-400 font-medium">{property.period}</span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
            {property.title}
          </h3>

          {/* Location */}
          <p className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
            <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span className="truncate">
              {property.location.neighborhood}, {property.location.city}, {property.location.state}
            </span>
          </p>
        </div>

        {/* Specs Grid Ribbon */}
        <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4 text-amber-400" />
            <span><strong className="text-white">{property.specs.bedrooms}</strong> Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-amber-400" />
            <span><strong className="text-white">{property.specs.bathrooms}</strong> Baths</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Square className="w-4 h-4 text-amber-400" />
            <span className="truncate"><strong className="text-white">{property.specs.sqft.toLocaleString()}</strong> sqft</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-800/60">
          <div className="flex items-center gap-2">
            <Image
              src={property.agent.image}
              alt={property.agent.name}
              width={28}
              height={28}
              className="rounded-full object-cover border border-amber-400/40"
            />
            <span className="text-xs text-slate-400 font-medium truncate max-w-[120px]">
              {property.agent.name}
            </span>
          </div>

          <Link
            href={`/properties/${property.id}`}
            className="flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors group/link"
          >
            <span>View Estate</span>
            <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
