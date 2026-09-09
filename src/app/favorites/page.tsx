'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Compass, ArrowRight, Trash2, Building2 } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import { PROPERTIES } from '@/data/properties';
import PropertyCard from '@/components/PropertyCard';

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();

  const favoriteProperties = PROPERTIES.filter((p) => favorites.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-red-500 fill-red-500" /> Private Portfolio Wishlist
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Saved Properties ({favoriteProperties.length})
          </h1>
          <p className="text-slate-400 text-sm">
            Your bookmarked luxury residences stored for easy access and consultation.
          </p>
        </div>

        {favoriteProperties.length > 0 && (
          <button
            onClick={() => {
              if (confirm('Are you sure you want to clear all saved favorites?')) {
                favorites.forEach((id) => toggleFavorite(id));
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-500/40 text-xs font-semibold transition-all"
          >
            <Trash2 className="w-4 h-4" /> Clear All Favorites
          </button>
        )}
      </div>

      {/* Favorites Display */}
      {favoriteProperties.length === 0 ? (
        <div className="max-w-md mx-auto text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800 p-8 space-y-6">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
            <Heart className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">No Saved Estates Yet</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Explore our global portfolio and click the heart icon on any property card to save your favorite luxury residences here.
            </p>
          </div>
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-bold text-xs hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all"
          >
            <Compass className="w-4 h-4" /> Browse Properties
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoriteProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
