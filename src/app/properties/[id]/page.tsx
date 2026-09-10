'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Bed,
  Bath,
  Square,
  MapPin,
  Heart,
  Star,
  CheckCircle2,
  Phone,
  Share2,
  ArrowLeft,
  MessageSquare,
  Compass,
  FileCheck,
  Building2,
  Download,
  Box,
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
  const [activeTab, setActiveTab] = useState<'photos' | 'floorplan' | '3d'>('photos');
  const [inquirySent, setInquirySent] = useState(false);

  if (!property) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">Property Not Found</h2>
        <p className="text-slate-300 text-sm">The property you are looking for may have been updated or sold.</p>
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#059669] text-white font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Catalog
        </Link>
      </div>
    );
  }

  const favorite = isFavorite(property.id);
  const activeImage = selectedImage || property.images[0];

  // PRD Section 9: WhatsApp Instant Handshake Logic with dynamic URL deep-link
  const whatsappText = `Hi Dream Dwell, I am interested in ${property.title} (ID: ${property.id}) in ${property.location.subLocality}, ${property.location.city}. Please share the brochure and pricing breakdown.`;
  const whatsappUrl = `https://wa.me/${property.agent.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => setInquirySent(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-[#10b981] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Properties
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert('Property link copied to clipboard!');
              }
            }}
            className="p-2.5 rounded-full bg-[#092217] border border-[#059669]/30 text-slate-200 hover:text-white transition-all"
            title="Share Property"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleFavorite(property.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold transition-all ${
              favorite
                ? 'bg-red-500/20 border-red-500/40 text-red-400'
                : 'bg-[#092217] border-[#059669]/30 text-slate-200 hover:border-[#10b981]'
            }`}
          >
            <Heart className={`w-4 h-4 ${favorite ? 'fill-red-500 text-red-500' : ''}`} />
            <span>{favorite ? 'Saved in Favorites' : 'Save Property'}</span>
          </button>
        </div>
      </div>

      {/* Header Banner & Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#059669] text-white uppercase tracking-wider">
              {property.status}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#092217] text-emerald-100 border border-[#059669]/40 uppercase tracking-wider">
              {property.type}
            </span>
            <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-[#04160d] text-[#a7f3d0] border border-[#059669]/30">
              RERA: {property.reraNumber}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">{property.title}</h1>
          <p className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-[#10b981] flex-shrink-0" />
            <span>{property.location.address}, {property.location.subLocality}, {property.location.city}, {property.location.state} – {property.location.zip}</span>
          </p>
        </div>

        <div className="text-left md:text-right">
          <span className="text-2xl sm:text-4xl font-bold text-white tracking-tight">{property.priceLakhsOrCrores}</span>
          {property.pricePerSqFt && (
            <p className="text-xs text-[#a7f3d0] font-medium mt-0.5">{property.pricePerSqFt}</p>
          )}
          <div className="flex items-center justify-start md:justify-end gap-1 text-xs text-[#10b981] font-semibold mt-1">
            <Star className="w-3.5 h-3.5 fill-[#10b981]" />
            <span>{property.rating} Score ({property.reviewsCount} verified reviews)</span>
          </div>
        </div>
      </div>

      {/* PRD SECTION 6: STICKY ACTION BAR (Schedule Site Visit & View 3D Tour) */}
      <div className="sticky top-20 z-40 p-4 rounded-2xl bg-[#071d13]/95 border border-[#059669]/40 backdrop-blur-xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-xs text-slate-200">
          <Building2 className="w-5 h-5 text-[#10b981] flex-shrink-0" />
          <div>
            <span className="font-bold text-white">{property.specs.bhk} in {property.location.subLocality}</span>
            <span className="block text-[11px] text-slate-300">RERA No: {property.reraNumber}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setScheduleModalOpen(true)}
            className="flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-[#059669] hover:bg-[#10b981] text-white font-bold text-xs transition-all shadow-md shadow-[#059669]/30"
          >
            Schedule Site Visit
          </button>
          
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-full bg-[#0b2b1d] hover:bg-[#073623] border border-[#059669]/50 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>WhatsApp Enquiry</span>
          </a>
        </div>
      </div>

      {/* HERO & GALLERY / FLOORPLAN / 3D MEDIA TABS */}
      <div className="space-y-4">
        {/* Media Selector Tabs */}
        <div className="flex items-center gap-2 border-b border-[#059669]/20 pb-2">
          <button
            onClick={() => setActiveTab('photos')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'photos'
                ? 'bg-[#059669] text-white'
                : 'bg-[#092217] border border-[#059669]/30 text-slate-300 hover:text-white'
            }`}
          >
            Photo Gallery ({property.images.length})
          </button>
          {property.floorPlanImage && (
            <button
              onClick={() => setActiveTab('floorplan')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'floorplan'
                  ? 'bg-[#059669] text-white'
                  : 'bg-[#092217] border border-[#059669]/30 text-slate-300 hover:text-white'
              }`}
            >
              Floor Plan
            </button>
          )}
          {property.virtualTourAvailable && (
            <button
              onClick={() => setActiveTab('3d')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === '3d'
                  ? 'bg-[#059669] text-white'
                  : 'bg-[#092217] border border-[#059669]/30 text-slate-300 hover:text-white'
              }`}
            >
              <Box className="w-3.5 h-3.5" /> 3D Virtual Tour
            </button>
          )}
        </div>

        {/* Display Container */}
        {activeTab === 'photos' && (
          <div className="space-y-4 animate-fade-in">
            <div className="relative h-[450px] sm:h-[550px] w-full rounded-3xl overflow-hidden border border-[#059669]/40 bg-[#061d14] shadow-2xl shadow-[#059669]/10">
              {/* Ambient Blurred Background to Fill Darkness */}
              <Image
                src={activeImage}
                alt=""
                fill
                aria-hidden="true"
                className="object-cover blur-3xl scale-125 opacity-60 brightness-75 transition-all duration-700"
              />
              {/* Main Image */}
              <Image
                src={activeImage}
                alt={property.title}
                fill
                priority
                sizes="100vw"
                className="relative z-10 object-cover transition-all duration-500"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative h-24 sm:h-32 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                    activeImage === img ? 'border-[#10b981] ring-4 ring-[#10b981]/30 scale-[1.02]' : 'border-[#059669]/30 opacity-70 hover:opacity-100 hover:scale-[1.01]'
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${idx}`} fill sizes="25vw" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'floorplan' && property.floorPlanImage && (
          <div className="relative h-[500px] w-full rounded-3xl overflow-hidden border border-[#059669]/40 bg-[#061d14] p-4 flex items-center justify-center shadow-2xl animate-fade-in">
            {/* Ambient Backdrop */}
            <Image
              src={property.floorPlanImage}
              alt=""
              fill
              aria-hidden="true"
              className="object-cover blur-3xl scale-125 opacity-40 brightness-75"
            />
            <Image
              src={property.floorPlanImage}
              alt="Architectural Floor Plan"
              fill
              className="relative z-10 object-contain p-4"
            />
          </div>
        )}

        {activeTab === '3d' && (
          <div className="relative h-[500px] w-full rounded-3xl overflow-hidden border border-[#059669]/40 bg-[#061d14] flex items-center justify-center shadow-2xl animate-fade-in">
            <iframe
              src={property.matterport360Url || 'https://my.matterport.com/show/?m=sample'}
              className="w-full h-full border-0"
              title="3D Virtual Walkthrough"
              allowFullScreen
            />
          </div>
        )}
      </div>

      {/* PRD SECTION 6: CORE SPECIFICATIONS GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">Core Specifications</h3>
          <button
            onClick={() => alert('Downloading property brochure (PDF)...')}
            className="px-4 py-2 rounded-xl bg-[#092217] border border-[#059669]/40 text-xs font-bold text-white hover:text-[#10b981] flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-[#10b981]" /> Download Brochure (PDF)
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 p-6 rounded-3xl bg-[#092217]/90 border border-[#059669]/30 text-center">
          <div className="space-y-1">
            <Bed className="w-5 h-5 text-[#10b981] mx-auto" />
            <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Configuration</p>
            <p className="text-lg font-extrabold text-white">{property.specs.bhk}</p>
          </div>
          <div className="space-y-1">
            <Square className="w-5 h-5 text-[#10b981] mx-auto" />
            <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Carpet Area</p>
            <p className="text-lg font-extrabold text-white">{property.specs.carpetArea.toLocaleString()} sq.ft.</p>
          </div>
          <div className="space-y-1">
            <Square className="w-5 h-5 text-[#10b981] mx-auto" />
            <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Super Built-up</p>
            <p className="text-lg font-extrabold text-white">{property.specs.superBuiltUpArea.toLocaleString()} sq.ft.</p>
          </div>
          <div className="space-y-1">
            <Bath className="w-5 h-5 text-[#10b981] mx-auto" />
            <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Bathrooms</p>
            <p className="text-lg font-extrabold text-white">{property.specs.bathrooms}</p>
          </div>
          <div className="space-y-1">
            <Compass className="w-5 h-5 text-[#10b981] mx-auto" />
            <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Facing (Vastu)</p>
            <p className="text-xs font-bold text-white mt-1.5">{property.specs.facing || 'East Facing'}</p>
          </div>
          <div className="space-y-1">
            <FileCheck className="w-5 h-5 text-[#10b981] mx-auto" />
            <p className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Possession</p>
            <p className="text-xs font-bold text-[#a7f3d0] mt-1.5">{property.specs.possessionStatus || 'Ready to Move'}</p>
          </div>
        </div>
      </div>

      {/* MAIN DETAILS & ASSIGNED AGENT COLUMN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Property Description & Curated Amenities */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Description */}
          <div className="space-y-4 bg-[#092217]/50 p-8 rounded-3xl border border-[#059669]/30">
            <h3 className="text-2xl font-bold text-white">About Property & Developer</h3>
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* PRD SECTION 6: CURATED AMENITIES */}
          <div className="space-y-6 bg-[#092217]/50 p-8 rounded-3xl border border-[#059669]/30">
            <h3 className="text-2xl font-bold text-white">Curated Amenities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {property.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-3 p-3 rounded-xl bg-[#04160d] border border-[#059669]/30 text-sm text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-[#10b981] flex-shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: PRD SECTION 6 ASSIGNED AGENT & LEAD CAPTURE */}
        <div className="space-y-6">
          
          {/* Schedule Viewing CTA Card */}
          <div className="p-6 rounded-3xl bg-[#092217] border border-[#059669]/40 space-y-4 shadow-xl">
            <h3 className="text-xl font-bold text-white">Request Physical Site Visit</h3>
            <p className="text-xs text-slate-300">
              Schedule an assisted physical walkthrough with dedicated Dream Dwell property advisor.
            </p>
            <button
              onClick={() => setScheduleModalOpen(true)}
              className="w-full py-3.5 rounded-2xl bg-[#059669] hover:bg-[#10b981] text-white font-bold text-sm shadow-lg shadow-[#059669]/30 transition-all"
            >
              Book Site Visit
            </button>
          </div>

          {/* PRD SECTION 6: ASSIGNED AGENT ROSTER */}
          <div className="p-6 rounded-3xl bg-[#092217] border border-[#059669]/40 space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#10b981]">
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
                <p className="text-xs text-[#10b981] font-semibold">{property.agent.title}</p>
                <p className="text-[11px] text-slate-300 mt-0.5">Dream Dwell Verified Advisor</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <a
                href={`tel:${property.agent.phone}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#04160d] border border-[#059669]/30 text-slate-200 hover:text-white hover:border-[#10b981] transition-all"
              >
                <Phone className="w-4 h-4 text-[#10b981]" />
                <span>{property.agent.phone}</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-[#059669] text-white font-bold transition-all hover:bg-[#10b981]"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Direct WhatsApp Consultation</span>
              </a>
            </div>

            {/* Quick Consultation Request Form */}
            <form onSubmit={handleInquirySubmit} className="space-y-3 pt-2 border-t border-[#059669]/20">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">Direct Consultation Form</h5>
              {inquirySent ? (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs text-center">
                  Consultation request submitted! Advisor will contact you shortly.
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    className="w-full bg-[#04160d] border border-[#059669]/40 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#10b981]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Your Phone / WhatsApp Number"
                    className="w-full bg-[#04160d] border border-[#059669]/40 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#10b981]"
                  />
                  <textarea
                    rows={3}
                    required
                    defaultValue={`Hello ${property.agent.name}, I would like to request an assisted consultation and site visit for property ID: ${property.id} (${property.title}).`}
                    className="w-full bg-[#04160d] border border-[#059669]/40 rounded-xl p-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#10b981]"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#0b2b1d] hover:bg-[#073623] border border-[#059669]/40 text-white font-bold text-xs transition-all"
                  >
                    Submit Consultation Request
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
