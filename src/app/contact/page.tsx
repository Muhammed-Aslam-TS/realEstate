'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  PhoneCall,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  MessageSquare,
  Globe,
  FileCheck,
  Award,
} from 'lucide-react';

function ContactContent() {
  const searchParams = useSearchParams();
  const prefilledAgent = searchParams.get('agent');

  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [locality, setLocality] = useState('Whitefield');
  const [message, setMessage] = useState(
    prefilledAgent
      ? `I would like to schedule a private advisory consultation with ${prefilledAgent}.`
      : ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[#10b981] flex items-center justify-center gap-1.5">
          <PhoneCall className="w-4 h-4" /> Dream Dwell Registered Office & Concierge
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          Contact Dream Dwell
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Connect with Saba Rao and our team for site visits, title deed verification, and customized property consultations.
        </p>
      </div>

      {/* Official Credentials Banner */}
      <div className="p-8 rounded-3xl bg-[#092217]/90 border border-[#059669]/40 space-y-6 shadow-2xl">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-[#10b981]" /> Official Company Profile & Registrations
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-slate-200">
          <div className="p-4 rounded-2xl bg-[#04160d] border border-[#059669]/30 space-y-1">
            <p className="text-[10px] text-[#10b981] uppercase font-bold">Company & Proprietor</p>
            <p className="font-extrabold text-white text-sm">Dream Dwell Real Estates</p>
            <p className="text-slate-300">Proprietor: Saba Rao</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#04160d] border border-[#059669]/30 space-y-1">
            <p className="text-[10px] text-[#10b981] uppercase font-bold">GSTIN Registration</p>
            <p className="font-bold text-white text-sm">29PKXPS6422Q1ZF</p>
            <p className="text-slate-300">GST Tax Verified Entity</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#04160d] border border-[#059669]/30 space-y-1">
            <p className="text-[10px] text-[#10b981] uppercase font-bold">Karnataka RERA No.</p>
            <p className="font-bold text-white text-xs truncate" title="PRM/KA/RERA/1251/309/AG/260905/007759">
              PRM/KA/RERA/1251/309/AG/260905/007759
            </p>
            <p className="text-slate-300">Govt. Authorized Agent</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#04160d] border border-[#059669]/30 space-y-1">
            <p className="text-[10px] text-[#10b981] uppercase font-bold">Prestige Channel Ref ID</p>
            <p className="font-bold text-white text-sm">20696205</p>
            <p className="text-slate-300">Authorized Developer Channel Partner</p>
          </div>
        </div>
      </div>

      {/* Main Two Column Contact Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-[#092217]/90 border border-[#059669]/30 rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl relative">
          <div className="space-y-1 border-b border-[#059669]/20 pb-4">
            <h3 className="text-2xl font-bold text-white">Send Direct Lead Inquiry</h3>
            <p className="text-xs text-slate-300">Fill in your details below for instant advisor connection and property brochure dispatch.</p>
          </div>

          {submitted ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#059669]/20 border border-[#059669]/40 text-[#10b981] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-white">Inquiry Submitted</h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Thank you, <strong className="text-[#10b981]">{name}</strong>. A Dream Dwell advisor will call you at <strong className="text-white">{phone || email}</strong> shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-full bg-[#059669] text-white font-bold text-xs hover:bg-[#10b981] transition-all"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#04160d] border border-[#059669]/40 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#10b981]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5">Contact Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98450 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#04160d] border border-[#059669]/40 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#10b981]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#04160d] border border-[#059669]/40 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#10b981]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5">Preferred Locality</label>
                  <select
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full bg-[#04160d] border border-[#059669]/40 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#10b981]"
                  >
                    <option value="Whitefield">Whitefield, Bengaluru</option>
                    <option value="Indiranagar">Indiranagar, Bengaluru</option>
                    <option value="Sadashivanagar">Sadashivanagar, Bengaluru</option>
                    <option value="OMBR Layout">OMBR Layout / B Channasandra</option>
                    <option value="Devanahalli">Devanahalli Airport Zone</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5">Inquiry Details *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share details regarding configuration (3 BHK, 4 BHK Villa), budget range, or site visit date..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#04160d] border border-[#059669]/40 rounded-xl p-4 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#10b981]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-[#059669] hover:bg-[#10b981] text-white font-bold text-sm shadow-lg shadow-[#059669]/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Submit Lead Inquiry</span>
                <Send className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>
          )}
        </div>

        {/* Registered Office & Direct Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-[#092217]/90 border border-[#059669]/30 space-y-6 shadow-xl">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#10b981]" /> Registered Office
            </h3>

            <div className="space-y-4 text-xs text-slate-200">
              <div className="p-4 rounded-2xl bg-[#04160d] border border-[#059669]/30 space-y-2">
                <p className="font-bold text-white text-sm">Dream Dwell Real Estates Headquarters</p>
                <p className="text-slate-300">
                  No. 01, 4th Floor, Nandanam Building, 5th Main Road, B Channasandra, OMBR Layout, Bengaluru – 560043
                </p>
                <p className="text-[#10b981] font-semibold">Landmark: FIRST CRY</p>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#04160d] border border-[#059669]/30">
                <Phone className="w-5 h-5 text-[#10b981] flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-white">Direct Phone Contact</h5>
                  <a href="tel:+916366214574" className="text-[#10b981] font-bold text-sm block mt-0.5 hover:underline">
                    +91 6366214574
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#059669] text-white rounded-2xl">
                <MessageSquare className="w-5 h-5 text-white flex-shrink-0 mt-0.5 fill-white" />
                <div>
                  <h5 className="font-bold text-white">Instant WhatsApp Connect</h5>
                  <p className="text-xs text-emerald-100 mt-0.5">Instant response for site visit scheduling & brochures</p>
                  <a
                    href="https://wa.me/916366214574?text=Hi%20Dream%20Dwell,%20I%20am%20seeking%20property%20consultation."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 px-4 py-1.5 rounded-full bg-white text-[#071d13] font-bold text-xs hover:bg-slate-100"
                  >
                    Open WhatsApp Chat
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#04160d] border border-[#059669]/30">
                <Mail className="w-5 h-5 text-[#10b981] flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-white">Email Desk</h5>
                  <a href="mailto:info@dreamdwellrealestates.in" className="text-slate-300 hover:text-white block mt-0.5">
                    info@dreamdwellrealestates.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#04160d] border border-[#059669]/30">
                <Globe className="w-5 h-5 text-[#10b981] flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-white">Official Website</h5>
                  <a href="http://www.dreamdwellrealestates.in" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white block mt-0.5">
                    www.dreamdwellrealestates.in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-slate-300">Loading contact concierge...</div>}>
      <ContactContent />
    </Suspense>
  );
}
