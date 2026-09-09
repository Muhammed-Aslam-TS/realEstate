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
  HelpCircle,
  ChevronDown,
  Globe,
} from 'lucide-react';

function ContactContent() {
  const searchParams = useSearchParams();
  const prefilledAgent = searchParams.get('agent');

  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('Buying');
  const [message, setMessage] = useState(
    prefilledAgent
      ? `I would like to schedule a private advisory consultation with ${prefilledAgent}.`
      : ''
  );
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const offices = [
    {
      city: 'New York Flagship',
      address: '740 Park Avenue, Upper East Side',
      state: 'New York, NY 10021',
      phone: '+1 (212) 555-0199',
      hours: 'Mon - Sun: 8:00 AM - 8:00 PM EST',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    },
    {
      city: 'Miami Coastal Hub',
      address: '1042 Ocean Drive, South Beach',
      state: 'Miami Beach, FL 33139',
      phone: '+1 (305) 892-4100',
      hours: 'Mon - Sun: 8:00 AM - 8:00 PM EST',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
    },
    {
      city: 'Bel Air Advisory Center',
      address: '1420 Bel Air Road',
      state: 'Los Angeles, CA 90077',
      phone: '+1 (310) 998-3200',
      hours: 'Mon - Sun: 8:00 AM - 8:00 PM PST',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80',
    },
    {
      city: 'London Mayfair Hub',
      address: '42 Berkeley Square, Mayfair',
      state: 'London, W1J 5AW, UK',
      phone: '+44 20 7946 0912',
      hours: 'Mon - Sat: 9:00 AM - 7:00 PM GMT',
      image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const faqs = [
    {
      q: 'How do I gain access to LuxeHaven off-market private listings?',
      a: 'Off-market trophy properties are made available exclusively to registered and verified high-net-worth clients following an introductory consultation with one of our managing directors.',
    },
    {
      q: 'Does LuxeHaven assist international buyers with legal and tax structures?',
      a: 'Yes. We work alongside top international tax advisors, escrow specialists, and real estate attorneys to facilitate cross-border transactions seamlessly.',
    },
    {
      q: 'Can I request a live 3D virtual tour of an estate?',
      a: 'Absolutely. Every trophy listing features immersive spatial 3D virtual walkthroughs. You can request a live guided video walkthrough with the lead listing broker.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center justify-center gap-1.5">
          <PhoneCall className="w-4 h-4" /> Global Concierge Advisory
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          Connect With LuxeHaven
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Whether you are seeking a trophy residence, listing an architectural masterpiece, or inquiring about private portfolio access, our directors are at your service.
        </p>
      </div>

      {/* Main Two Column Contact Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl relative">
          <div className="space-y-1 border-b border-slate-800 pb-4">
            <h3 className="text-2xl font-bold text-white">Send Private Inquiry</h3>
            <p className="text-xs text-slate-400">Complete the form below to receive a response within 2 business hours.</p>
          </div>

          {submitted ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-white">Inquiry Received</h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Thank you, <strong className="text-amber-400">{name}</strong>. A managing director has been assigned to your request and will contact you at <strong className="text-white">{email}</strong>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. eleanor@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Inquiry Classification</label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Buying">Acquiring an Estate (Buying)</option>
                    <option value="Selling">Listing a Property (Selling)</option>
                    <option value="Leasing">Luxury Leasing</option>
                    <option value="Off-Market">Off-Market Portfolio Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Message / Details *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share details regarding preferred location, budget, or specific estate references..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-bold text-sm hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Submit Confidential Inquiry</span>
                <Send className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>
          )}
        </div>

        {/* Global Flagships Information (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-amber-400" /> Direct Concierge Line
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <Phone className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-white">Toll-Free Global Line</h5>
                  <p className="text-slate-400 mt-0.5">+1 (800) 589-3428</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <Mail className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-white">Email Advisory Desk</h5>
                  <p className="text-slate-400 mt-0.5">inquiries@luxehaven.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <Clock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-white">Advisory Hours</h5>
                  <p className="text-slate-400 mt-0.5">24/7 Priority Desk for Verified Clients</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Global Offices Cards */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-white">Global Office Hubs</h2>
          <p className="text-xs text-slate-400">Visit our flagship offices in key luxury real estate markets.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offices.map((office) => (
            <div key={office.city} className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden space-y-4 p-5 hover:border-amber-500/40 transition-all">
              <div className="relative h-40 rounded-2xl overflow-hidden bg-slate-950">
                <img src={office.image} alt={office.city} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">{office.city}</h4>
                <p className="text-xs text-slate-400 mt-1">{office.address}</p>
                <p className="text-xs text-slate-400">{office.state}</p>
                <p className="text-xs font-bold text-amber-400 mt-2">{office.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto space-y-6 pt-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-400">Key information regarding our luxury brokerage process.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-5 text-left font-bold text-white text-sm flex items-center justify-between hover:text-amber-400 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-amber-400 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-5 text-xs text-slate-300 border-t border-slate-800/60 pt-3 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-slate-400">Loading contact concierge...</div>}>
      <ContactContent />
    </Suspense>
  );
}
