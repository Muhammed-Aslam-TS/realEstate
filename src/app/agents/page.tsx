'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Phone, Mail, Award, Star, Building2, CheckCircle2, MessageSquare, MapPin } from 'lucide-react';
import { AGENTS } from '@/data/agents';

export default function AgentsPage() {
  const [selectedRole, setSelectedRole] = useState<string>('all');

  const filteredAgents = AGENTS.filter((agent) => {
    if (selectedRole === 'all') return true;
    return agent.specialization.toLowerCase().includes(selectedRole.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#10b981] flex items-center gap-1.5">
          <Users className="w-4 h-4" /> Dream Dwell Leadership & Advisors
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Verified Property Advisors
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl">
          Connect directly with Saba Rao and our verified team of local advisors across Bangalore’s high-growth corridors.
        </p>
      </div>

      {/* Specialty Filter Buttons */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#059669]/20 pb-4">
        {[
          { label: 'All Advisors', value: 'all' },
          { label: 'Gated Villas & Mansions', value: 'villas' },
          { label: 'Sky Penthouses', value: 'penthouse' },
          { label: 'Commercial & Plots', value: 'commercial' },
        ].map((item) => (
          <button
            key={item.value}
            onClick={() => setSelectedRole(item.value)}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              selectedRole === item.value
                ? 'bg-[#059669] text-white shadow-md shadow-[#059669]/30'
                : 'bg-[#092217] border border-[#059669]/30 text-slate-300 hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Agents Roster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {filteredAgents.map((agent) => (
          <div
            key={agent.id}
            className="p-6 sm:p-8 rounded-3xl bg-[#092217]/90 border border-[#059669]/30 hover:border-[#10b981] transition-all flex flex-col sm:flex-row gap-6 shadow-xl"
          >
            {/* Image */}
            <div className="relative w-full sm:w-48 h-64 rounded-2xl overflow-hidden bg-[#04120c] flex-shrink-0 border border-[#059669]/30">
              <Image
                src={agent.image}
                alt={agent.name}
                fill
                sizes="(max-width: 640px) 100vw, 200px"
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 py-1 px-2.5 rounded-full bg-[#04120c]/85 border border-[#059669]/40 backdrop-blur-md flex items-center justify-center gap-1 text-[11px] font-bold text-[#10b981]">
                <Star className="w-3.5 h-3.5 fill-[#10b981]" />
                <span>{agent.rating} Advisor Score</span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-white">{agent.name}</h3>
                <p className="text-xs font-bold text-[#10b981] mt-0.5">{agent.role}</p>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{agent.bio}</p>
                
                {/* Localities Covered */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {agent.localitiesCovered.map((loc) => (
                    <span key={loc} className="px-2 py-0.5 rounded-md bg-[#04160d] border border-[#059669]/30 text-[10px] text-slate-300">
                      {loc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats pill */}
              <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-2xl bg-[#04160d] border border-[#059669]/30 text-center text-xs">
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase">Volume</span>
                  <strong className="text-white text-sm">{agent.totalVolume}</strong>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase">Experience</span>
                  <strong className="text-white text-sm">{agent.experienceYears} Yrs</strong>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase">Listings</span>
                  <strong className="text-[#10b981] text-sm">{agent.activeListings} Active</strong>
                </div>
              </div>

              {/* Contact actions */}
              <div className="flex items-center justify-between pt-2 border-t border-[#059669]/20">
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${agent.phone}`}
                    className="p-2 rounded-xl bg-[#04160d] border border-[#059669]/30 text-slate-300 hover:text-white hover:border-[#10b981] transition-all"
                    title="Call Advisor"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${agent.email}`}
                    className="p-2 rounded-xl bg-[#04160d] border border-[#059669]/30 text-slate-300 hover:text-white hover:border-[#10b981] transition-all"
                    title="Email Advisor"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>

                <a
                  href={`https://wa.me/${agent.whatsappNumber}?text=Hi%20${encodeURIComponent(agent.name)},%20I%20am%20seeking%20advisory%20for%20property%20investments.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-[#059669] hover:bg-[#10b981] text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-md shadow-[#059669]/30"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
