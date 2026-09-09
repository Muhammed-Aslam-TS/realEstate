'use client';

import React, { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Bed,
  Bath,
  Square,
  Car,
  Calendar,
  MapPin,
  Heart,
  Star,
  CheckCircle2,
  ShieldCheck,
  Phone,
  Mail,
  Share2,
  ArrowLeft,
  Building2,
  Compass,
  Calculator,
} from 'lucide-react';
import { PROPERTIES } from '@/data/properties';
import { useFavorites } from '@/context/FavoritesContext';
import ScheduleModal from '@/components/ScheduleModal';

export default function PropertyDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const property = PROPERTIES.find((p) => p.id === id);

  const { isFavorite, toggleFavorite } = useFavorites();
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [inquirySent, setInquirySent] = useState(false);

  if (!property) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">Estate Not Found</h2>
        <p className="text-slate-400 text-sm">The luxury residence you are looking for may have been sold or removed.</p>
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-500 text-slate-950 font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Listings
        </Link>
      </div>
    );
  }

  const favorite = isFavorite(property.id);
  const activeImage = selectedImage || property.images[0];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => setInquirySent(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Properties
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert('Estate link copied to clipboard!');
              }
            }}
            className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-all"
            title="Share Estate"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleFavorite(property.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold transition-all ${
              favorite
                ? 'bg-red-500/20 border-red-500/40 text-red-400'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-amber-500/40'
            }`}
          >
            <Heart className={`w-4 h-4 ${favorite ? 'fill-red-500 text-red-500' : ''}`} />
            <span>{favorite ? 'Saved in Favorites' : 'Save Estate'}</span>
          </button>
        </div>
      </div>

      {/* Title & Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 uppercase tracking-wider">
              {property.status}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 text-slate-300 border border-slate-800 capitalize">
              {property.type}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">{property.title}</h1>
          <p className="flex items-center gap-2 text-sm text-slate-400">
            <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>{property.location.address}, {property.location.neighborhood}, {property.location.city}, {property.location.state} {property.location.zip}</span>
          </p>
        </div>

        <div className="text-left md:text-right">
          <span className="text-3xl sm:text-4xl font-extrabold text-amber-400">{property.formattedPrice}</span>
          {property.period && <span className="text-sm text-slate-400">{property.period}</span>}
          <div className="flex items-center justify-start md:justify-end gap-1 text-xs text-amber-400 font-semibold mt-1">
            <Star className="w-4 h-4 fill-amber-400" />
            <span>{property.rating} Rating ({property.reviewsCount} reviews)</span>
          </div>
        </div>
      </div>

      {/* IMAGE GALLERY GRID */}
      <div className="space-y-4">
        <div className="relative h-[450px] sm:h-[550px] w-full rounded-3xl overflow-hidden border border-slate-800 bg-slate-950">
          <Image
            src={activeImage}
            alt={property.title}
            fill
            priority
            sizes="100vw"
            className="object-cover transition-all duration-500"
          />
        </div>

        {/* Thumbnail Selector Strip */}
        <div className="grid grid-cols-4 gap-4">
          {property.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(img)}
              className={`relative h-24 sm:h-32 rounded-2xl overflow-hidden border-2 transition-all ${
                activeImage === img ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-slate-800 opacity-60 hover:opacity-100'
              }`}
            >
              <Image src={img} alt={`Thumbnail ${idx}`} fill sizes="25vw" className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* KEY SPECS RIBBON BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 text-center">
        <div className="space-y-1">
          <Bed className="w-5 h-5 text-amber-400 mx-auto" />
          <p className="text-xs text-slate-400 uppercase tracking-wider">Bedrooms</p>
          <p className="text-xl font-bold text-white">{property.specs.bedrooms}</p>
        </div>
        <div className="space-y-1">
          <Bath className="w-5 h-5 text-amber-400 mx-auto" />
          <p className="text-xs text-slate-400 uppercase tracking-wider">Bathrooms</p>
          <p className="text-xl font-bold text-white">{property.specs.bathrooms}</p>
        </div>
        <div className="space-y-1">
          <Square className="w-5 h-5 text-amber-400 mx-auto" />
          <p className="text-xs text-slate-400 uppercase tracking-wider">Total Sq Ft</p>
          <p className="text-xl font-bold text-white">{property.specs.sqft.toLocaleString()}</p>
        </div>
        <div className="space-y-1">
          <Car className="w-5 h-5 text-amber-400 mx-auto" />
          <p className="text-xs text-slate-400 uppercase tracking-wider">Garage Spaces</p>
          <p className="text-xl font-bold text-white">{property.specs.garage} Cars</p>
        </div>
        <div className="space-y-1 col-span-2 sm:col-span-1">
          <Calendar className="w-5 h-5 text-amber-400 mx-auto" />
          <p className="text-xs text-slate-400 uppercase tracking-wider">Built Year</p>
          <p className="text-xl font-bold text-white">{property.specs.yearBuilt}</p>
        </div>
      </div>

      {/* MAIN TWO-COLUMN DETAILS & AGENT ACTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Details & Amenities */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Description */}
          <div className="space-y-4 bg-slate-900/40 p-8 rounded-3xl border border-slate-800">
            <h3 className="text-2xl font-bold text-white">About The Property</h3>
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Amenities & Features Matrix */}
          <div className="space-y-6 bg-slate-900/40 p-8 rounded-3xl border border-slate-800">
            <h3 className="text-2xl font-bold text-white">Luxury Amenities & Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {property.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Mortgage Link preview */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 to-amber-950/30 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-lg font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
                <Calculator className="w-5 h-5 text-amber-400" /> Estimate Monthly Payment
              </h4>
              <p className="text-xs text-slate-400">Calculate mortgage terms, down payment, and monthly principal for this property.</p>
            </div>
            <Link
              href={`/calculator?price=${property.price}`}
              className="px-6 py-3 rounded-full bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all flex-shrink-0"
            >
              Open Mortgage Calculator
            </Link>
          </div>
        </div>

        {/* Right Column: Agent Card & Schedule Action */}
        <div className="space-y-6">
          
          {/* Schedule Viewing CTA Card */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-xl font-bold text-white">Schedule Private Tour</h3>
            <p className="text-xs text-slate-400">
              Select your preferred date and format (In-person or Live HD Video tour) with our lead advisor.
            </p>
            <button
              onClick={() => setScheduleModalOpen(true)}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-bold text-sm hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all"
            >
              Book Viewing Now
            </button>
          </div>

          {/* Listed Agent Roster Card */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-amber-400">
                <Image
                  src={property.agent.image}
                  alt={property.agent.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">{property.agent.name}</h4>
                <p className="text-xs text-amber-400 font-semibold">{property.agent.title}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">LuxeHaven Senior Broker</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <a
                href={`tel:${property.agent.phone}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-all"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>{property.agent.phone}</span>
              </a>
              <a
                href={`mailto:${property.agent.email}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-all"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span className="truncate">{property.agent.email}</span>
              </a>
            </div>

            {/* Quick Contact Form */}
            <form onSubmit={handleInquirySubmit} className="space-y-3 pt-2 border-t border-slate-800">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">Quick Inquiry</h5>
              {inquirySent ? (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs text-center">
                  Message sent successfully! Agent will reply shortly.
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  <textarea
                    rows={3}
                    required
                    defaultValue={`Hello ${property.agent.name}, I am interested in learning more about "${property.title}".`}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all"
                  >
                    Send Direct Message
                  </button>
                </>
              )}
            </form>
          </div>
        </div>

      </div>

      {/* Schedule Modal */}
      <ScheduleModal
        property={property}
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
      />
    </div>
  );
}
