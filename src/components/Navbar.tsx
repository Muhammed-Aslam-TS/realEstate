'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, Heart, Menu, X, PhoneCall, Compass, Users, Home, MessageSquare } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';

export default function Navbar() {
  const pathname = usePathname();
  const { favorites } = useFavorites();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Per PRD Section 2: Calculator tab is HIDDEN from Navbar (Code retained for Phase 2)
  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Properties', href: '/properties', icon: Compass },
    { name: 'Our Team', href: '/agents', icon: Users },
    { name: 'Contact & Enquire', href: '/contact', icon: PhoneCall },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#071d13]/95 backdrop-blur-md border-b border-[#059669]/30 py-3 shadow-2xl'
          : 'bg-gradient-to-b from-[#071d13]/95 via-[#071d13]/60 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#059669] via-[#10b981] to-[#047857] flex items-center justify-center shadow-lg shadow-[#059669]/30 group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-1">
                DREAM<span className="text-[#10b981] font-extrabold">DWELL</span>
              </span>
              <span className="text-[9px] tracking-[0.22em] text-[#a7f3d0] font-medium uppercase -mt-1">
                Real Estates • RERA Reg.
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-[#0b2b1d]/80 p-1.5 rounded-full border border-[#059669]/30 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#059669] text-white shadow-md shadow-[#059669]/30'
                      : 'text-slate-200 hover:text-white hover:bg-[#073623]'
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-90" />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/favorites"
              className="relative p-2.5 rounded-full bg-[#0b2b1d]/80 border border-[#059669]/30 text-slate-200 hover:text-[#10b981] hover:border-[#10b981]/50 transition-all group"
              title="Saved Properties"
            >
              <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#10b981] text-[#071d13] text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Quick WhatsApp CTA Button */}
            <a
              href="https://wa.me/916366214574?text=Hi%20Dream%20Dwell,%20I%20would%20like%20to%20enquire%20about%20your%20luxury%20properties."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-[#059669] hover:bg-[#10b981] text-white font-bold text-xs hover:shadow-lg hover:shadow-[#059669]/30 transition-all flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/favorites"
              className="relative p-2 rounded-lg bg-[#0b2b1d] border border-[#059669]/30 text-slate-200"
            >
              <Heart className="w-4 h-4 text-[#10b981]" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#10b981] text-[#071d13] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#0b2b1d] border border-[#059669]/30 text-slate-200 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#071d13]/98 border-b border-[#059669]/30 backdrop-blur-xl px-4 pt-4 pb-6 mt-3 space-y-3 animate-fade-in">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#059669] text-white font-bold'
                    : 'text-slate-200 hover:bg-[#0b2b1d]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-[#059669]/20 space-y-2">
            <a
              href="https://wa.me/916366214574?text=Hi%20Dream%20Dwell,%20I%20would%20like%20to%20enquire%20about%20your%20luxury%20properties."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#059669] text-white font-bold text-sm"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
