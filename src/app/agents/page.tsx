'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Phone, Mail, Award, Star, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { AGENTS, Agent } from '@/data/agents';

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
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
          <Users className="w-4 h-4" /> Global Leadership Roster
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Our Advisory Directors & Brokers
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Partner with internationally recognized advisors specializing in high-net-worth acquisitions, off-market private portfolios, and luxury developments.
        </p>
      </div>

      {/* Specialty Filter Buttons */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4">
        {[
          { label: 'All Advisors', value: 'all' },
          { label: 'Waterfront & Oceanfront', value: 'waterfront' },
          { label: 'Sky Penthouses', value: 'penthouse' },
          { label: 'Architectural Villas', value: 'villas' },
          { label: 'Alpine Resort Estates', value: 'alpine' },
        ].map((item) => (
          <button
            key={item.value}
            onClick={() => setSelectedRole(item.value)}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              selectedRole === item.value
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-amber-400/40'
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
            className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col sm:flex-row gap-6 shadow-xl"
          >
            {/* Image */}
            <div className="relative w-full sm:w-48 h-64 rounded-2xl overflow-hidden bg-slate-950 flex-shrink-0 border border-slate-800">
              <Image
                src={agent.image}
                alt={agent.name}
                fill
                sizes="(max-width: 640px) 100vw, 200px"
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 py-1 px-2.5 rounded-full bg-slate-950/80 border border-slate-800 backdrop-blur-md flex items-center justify-center gap-1 text-[11px] font-bold text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{agent.rating} Advisor Score</span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-white">{agent.name}</h3>
                <p className="text-xs font-bold text-amber-400 mt-0.5">{agent.role}</p>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{agent.bio}</p>
              </div>

              {/* Stats pill */}
              <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-2xl bg-slate-950 border border-slate-800/80 text-center text-xs">
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase">Volume</span>
                  <strong className="text-white text-sm">{agent.totalVolume}</strong>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase">Experience</span>
                  <strong className="text-white text-sm">{agent.experienceYears} Yrs</strong>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase">Listings</span>
                  <strong className="text-amber-400 text-sm">{agent.activeListings} Active</strong>
                </div>
              </div>

              {/* Contact actions */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${agent.phone}`}
                    className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-400 transition-all"
                    title="Call Advisor"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${agent.email}`}
                    className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-400 transition-all"
                    title="Email Advisor"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>

                <Link
                  href={`/contact?agent=${encodeURIComponent(agent.name)}`}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs hover:brightness-110 shadow-md shadow-amber-500/20"
                >
                  Schedule Consultation
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
