'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Building2, Mail, Phone, MapPin, Send, CheckCircle2, ArrowRight, ShieldCheck, Award, Star, Globe, FileCheck, MessageSquare } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#04120c] border-t border-[#059669]/30 text-slate-300 relative overflow-hidden">
      {/* Glow ambient background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-[#059669]/10 blur-3xl pointer-events-none rounded-full" />

      {/* Top Banner */}
      <div className="border-b border-[#059669]/20 bg-[#071d13]/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl bg-[#092217] border border-[#059669]/30">
            <div className="p-3 rounded-xl bg-[#059669]/20 text-[#10b981]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Karnataka RERA Approved</h4>
              <p className="text-xs text-slate-300">Reg: PRM/KA/RERA/1251/309/AG/260905/007759</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl bg-[#092217] border border-[#059669]/30">
            <div className="p-3 rounded-xl bg-[#059669]/20 text-[#10b981]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Prestige Channel Partner</h4>
              <p className="text-xs text-slate-300">Channel Partner Ref ID: 20696205</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl bg-[#092217] border border-[#059669]/30">
            <div className="p-3 rounded-xl bg-[#059669]/20 text-[#10b981]">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">100% Verified Properties</h4>
              <p className="text-xs text-slate-300">Legal verification & title deed transparency</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#059669] flex items-center justify-center shadow-lg shadow-[#059669]/30">
                <Building2 className="w-5 h-5 text-white stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white">
                  DREAM<span className="text-[#10b981]">DWELL</span>
                </span>
                <span className="text-[10px] text-[#a7f3d0] font-semibold tracking-widest uppercase -mt-1">
                  Real Estates
                </span>
              </div>
            </Link>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Dream Dwell Real Estates is your trusted partner for high-growth and luxury properties across Bengaluru. Licensed proprietor Saba Rao with GSTIN 29PKXPS6422Q1ZF.
            </p>

            {/* Newsletter Form */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Subscribe for Off-Market Inventory Alerts
              </h4>
              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 text-xs bg-emerald-950/60 p-3 rounded-xl border border-emerald-500/40">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>Thank you! You are now subscribed to property alerts.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#04160d] border border-[#059669]/40 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#10b981]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#059669] hover:bg-[#10b981] text-white font-bold rounded-xl text-xs transition-all flex items-center gap-1 flex-shrink-0 shadow-lg shadow-[#059669]/30"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { name: 'Home Catalog', href: '/' },
                { name: 'Featured Properties', href: '/properties' },
                { name: 'Our Verified Team', href: '/agents' },
                { name: 'Saved Favorites', href: '/favorites' },
                { name: 'Contact & Enquire', href: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-[#10b981] transition-colors flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-3 h-3 text-[#10b981] opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Indian Typologies */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Property Categories
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                'Premium Apartments',
                'Premium Villas',
                'Architectural Mansions',
                'Commercial Spaces',
                'Premium Plots (BMRDA/RERA)',
                'Farmlands & Eco Retreats',
              ].map((category) => (
                <li key={category}>
                  <Link
                    href={`/properties?type=${encodeURIComponent(category.toLowerCase())}`}
                    className="hover:text-[#10b981] transition-colors"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Contact Details */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Registered Office
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#10b981] mt-0.5 flex-shrink-0" />
                <span>No. 01, 4th Floor, Nandanam Bldg, 5th Main Rd, B Channasandra, OMBR, Bengaluru – 560043 (Landmark: FIRST CRY)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#10b981] flex-shrink-0" />
                <span>+91 6366214574</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#10b981] flex-shrink-0" />
                <span>info@dreamdwellrealestates.in</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#10b981] flex-shrink-0" />
                <span>www.dreamdwellrealestates.in</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-[#059669]/20 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Dream Dwell Real Estates. Proprietor: Saba Rao. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-slate-200">GSTIN: 29PKXPS6422Q1ZF</Link>
            <Link href="#" className="hover:text-slate-200">Karnataka RERA Compliant</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
