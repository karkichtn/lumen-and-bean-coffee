'use client';

import React, { useState } from 'react';
import { useCoffeeStore } from '@/lib/store';
import {
  ShoppingBag,
  Menu as MenuIcon,
  X,
  Database,
  Calendar,
  Sparkles,
  Coffee,
} from 'lucide-react';

export default function Navbar() {
  const {
    cart,
    setIsCartOpen,
    setIsReservationOpen,
    setIsSupabaseConfigOpen,
    isSupabaseConnected,
  } = useCoffeeStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full glass-nav shadow-xs">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16 2xl:px-20">
        <div className="flex items-center justify-between h-24">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-4 group text-decoration-none shrink-0">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#c66624] to-[#8c4716] p-0.5 shadow-md shadow-[#c66624]/20 group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full rounded-[14px] bg-[#faf6f0] flex items-center justify-center">
                <Coffee className="w-6 h-6 text-[#c66624]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#24140b]">
                LUMEN & BEAN
              </span>
              <span className="text-xs text-[#9c8574] tracking-widest uppercase font-semibold">
                Artisan Roasters & Brew Bar
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links with wide spacing */}
          <nav className="hidden lg:flex items-center gap-10 xl:gap-12 text-sm xl:text-base font-semibold text-[#5a4537]">
            <a
              href="#catalog"
              className="hover:text-[#c66624] transition-colors py-2"
            >
              Artisan Menu
            </a>
            <a
              href="#coffee-lab"
              className="hover:text-[#c66624] transition-colors flex items-center gap-2 py-2"
            >
              <Sparkles className="w-4 h-4 text-[#c66624]" />
              <span>Coffee Lab</span>
            </a>
            <a
              href="#brew-guides"
              className="hover:text-[#c66624] transition-colors py-2"
            >
              Brew Guides
            </a>
            <a
              href="#subscription"
              className="hover:text-[#c66624] transition-colors py-2"
            >
              Subscription
            </a>
            <a
              href="#locations"
              className="hover:text-[#c66624] transition-colors py-2"
            >
              Cafes & Labs
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-4 sm:gap-5 shrink-0">
            {/* Supabase Status Pill */}
            <button
              onClick={() => setIsSupabaseConfigOpen(true)}
              className="hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs font-bold border transition-all"
              style={{
                backgroundColor: isSupabaseConnected ? 'rgba(16, 185, 129, 0.1)' : '#f3ece1',
                borderColor: isSupabaseConnected ? 'rgba(16, 185, 129, 0.3)' : 'rgba(190, 155, 125, 0.35)',
                color: isSupabaseConnected ? '#059669' : '#8c4716',
              }}
              title="Click to view database connection status"
            >
              <Database className="w-4 h-4" />
              <span>{isSupabaseConnected ? 'Supabase Live' : 'Supabase (Demo/Config)'}</span>
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: isSupabaseConnected ? '#10b981' : '#df9335',
                  boxShadow: isSupabaseConnected ? '0 0 8px #10b981' : '0 0 8px #df9335',
                }}
              />
            </button>

            {/* Book Experience CTA */}
            <button
              onClick={() => setIsReservationOpen(true)}
              className="hidden md:inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs xl:text-sm font-bold text-[#8c4716] bg-[#f5ede4] hover:bg-[#ebdccb] border border-[var(--border-card)] transition-all shadow-sm"
            >
              <Calendar className="w-4 h-4 text-[#c66624]" />
              <span>Book Table / Tasting</span>
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-3.5 rounded-full bg-[#f3ece1] hover:bg-[#ebdccb] text-[#24140b] border border-[var(--border-card)] transition-all flex items-center justify-center group shadow-sm"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#c66624] group-hover:scale-110 transition-transform" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#d3722e] to-[#c66624] text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-3 rounded-xl text-[#5a4537] hover:text-[#24140b] bg-[#f3ece1] border border-[var(--border-soft)]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#faf6f0] border-b border-[var(--border-soft)] px-8 py-8 space-y-6 animate-fadeIn shadow-xl">
          <nav className="flex flex-col space-y-4 text-base font-semibold text-[#5a4537]">
            <a
              href="#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#c66624] py-2 border-b border-stone-200/60"
            >
              Artisan Menu & Beans
            </a>
            <a
              href="#coffee-lab"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#c66624] py-2 border-b border-stone-200/60 flex items-center justify-between"
            >
              <span>Coffee Lab (Customizer)</span>
              <span className="text-xs text-white font-bold px-2.5 py-0.5 rounded-full bg-[#c66624]">Interactive</span>
            </a>
            <a
              href="#brew-guides"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#c66624] py-2 border-b border-stone-200/60"
            >
              Barista Brew Guides
            </a>
            <a
              href="#subscription"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#c66624] py-2 border-b border-stone-200/60"
            >
              Coffee Club Subscription
            </a>
            <a
              href="#locations"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#c66624] py-2 border-b border-stone-200/60"
            >
              Cafe Locations & Hours
            </a>
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsReservationOpen(true);
              }}
              className="w-full py-3.5 rounded-2xl font-bold text-sm text-[#8c4716] bg-[#f5ede4] border border-[var(--border-card)] flex items-center justify-center gap-2 shadow-sm"
            >
              <Calendar className="w-4 h-4 text-[#c66624]" />
              Book Table / Tasting
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsSupabaseConfigOpen(true);
              }}
              className="w-full py-3 rounded-2xl font-semibold text-xs text-[#5a4537] bg-[#f3ece1] border border-[var(--border-soft)] flex items-center justify-center gap-2"
            >
              <Database className="w-4 h-4 text-emerald-600" />
              Supabase Status & Schema
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
