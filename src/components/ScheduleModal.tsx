'use client';

import React, { useState } from 'react';
import { X, Calendar, Clock, UserCheck, CheckCircle2, Building2, MessageSquare } from 'lucide-react';
import { Property } from '@/data/properties';

interface ScheduleModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

export default function ScheduleModal({ property, isOpen, onClose }: ScheduleModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [tourType, setTourType] = useState<'physical' | 'video'>('physical');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('11:00 AM');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#04120c]/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#092217] border border-[#059669]/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-slate-200 animate-scale-up">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#059669]/15 blur-2xl rounded-full pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#04160d] hover:bg-[#073623] text-slate-300 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-[#059669]/20 border border-[#059669]/40 rounded-full flex items-center justify-center mx-auto text-[#10b981]">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white">Site Visit Scheduled!</h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto">
              Thank you, <strong className="text-[#10b981]">{name}</strong>. Advisor{' '}
              <strong className="text-white">{property.agent.name}</strong> will contact you on your number ({phone}) to confirm your{' '}
              <span className="capitalize">{tourType}</span> site visit on {date} at {time}.
            </p>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#059669] text-white font-bold text-sm hover:bg-[#10b981] transition-all shadow-lg shadow-[#059669]/30"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#10b981] flex items-center gap-1.5 mb-1">
                <Building2 className="w-3.5 h-3.5" /> Schedule Physical Site Visit
              </span>
              <h3 className="text-xl font-bold text-white line-clamp-1">{property.title}</h3>
              <p className="text-xs text-slate-300 mt-0.5">{property.priceLakhsOrCrores} • {property.location.subLocality}, {property.location.city}</p>
            </div>

            {/* Tour Type selector */}
            <div className="grid grid-cols-2 gap-3 p-1 rounded-2xl bg-[#04160d] border border-[#059669]/30">
              <button
                type="button"
                onClick={() => setTourType('physical')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  tourType === 'physical'
                    ? 'bg-[#059669] text-white shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <UserCheck className="w-4 h-4" /> Physical Site Check
              </button>
              <button
                type="button"
                onClick={() => setTourType('video')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  tourType === 'video'
                    ? 'bg-[#059669] text-white shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <MessageSquare className="w-4 h-4" /> Live Video Walkthrough
              </button>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#10b981]" /> Preferred Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#04160d] border border-[#059669]/40 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#10b981]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#10b981]" /> Time Slot
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-[#04160d] border border-[#059669]/40 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#10b981]"
                >
                  <option>10:00 AM</option>
                  <option>11:30 AM</option>
                  <option>02:00 PM</option>
                  <option>04:00 PM</option>
                  <option>05:30 PM</option>
                </select>
              </div>
            </div>

            {/* User Info */}
            <div className="space-y-3 pt-1">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#04160d] border border-[#059669]/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#10b981]"
                />
              </div>
              <div>
                <input
                  type="tel"
                  required
                  placeholder="WhatsApp / Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#04160d] border border-[#059669]/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#10b981]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-[#059669] hover:bg-[#10b981] text-white font-bold text-sm shadow-lg shadow-[#059669]/30 transition-all"
            >
              Confirm Site Visit Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
