'use client';

import React, { useState } from 'react';
import { useCoffeeStore } from '@/lib/store';
import {
  Coffee,
  Mail,
  ArrowRight,
  Database,
} from 'lucide-react';

export default function Footer() {
  const { addToast, setIsSupabaseConfigOpen } = useCoffeeStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    addToast('Welcome to the Connoisseur Circle! Check your inbox for 15% OFF (Code: WELCOME15) ☕', 'success');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#f4ebe0] border-t border-[var(--border-soft)] text-[#5a4537] pt-28 pb-20 relative">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16 2xl:px-20 space-y-20">
        {/* Top Newsletter Card */}
        <div className="card-soft-luxe p-10 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-10 shadow-soft">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <span className="text-xs font-bold text-[#c66624] uppercase tracking-widest">
              The Artisan Chronicle
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#24140b]">
              Receive First-Access to Rare Farm Microlots
            </h3>
            <p className="text-sm sm:text-base text-[#614d3f] leading-relaxed">
              Join 18,000+ coffee purists across India. We send private harvest cupping notes, brewing masterclass releases, and member-exclusive discount codes.
            </p>
          </div>

          <form onSubmit={handleNewsletter} className="w-full md:w-auto flex-1 max-w-md flex gap-3">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-[#9c8574] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-11 pr-4 py-3.5 rounded-full bg-[#faf6f0] border border-[var(--border-card)] text-xs sm:text-sm text-[#24140b] placeholder-[#9c8574] focus:outline-none focus:border-[#c66624]"
              />
            </div>
            <button type="submit" className="btn-caramel py-3.5 px-7 text-xs sm:text-sm whitespace-nowrap font-bold shadow-md">
              <span>Subscribe</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 pt-4">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#c66624] to-[#8c4716] p-0.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full rounded-[14px] bg-[#faf6f0] flex items-center justify-center">
                  <Coffee className="w-6 h-6 text-[#c66624]" />
                </div>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#24140b]">
                LUMEN & BEAN Co.
              </span>
            </div>

            <p className="text-sm text-[#8c7462] leading-relaxed max-w-sm">
              Artisan specialty coffee roastery committed to uncompromised terroir, direct-trade farmer equity, and sensory exploration across India since 2018.
            </p>

            <div className="pt-1">
              <span className="px-4 py-2 rounded-xl bg-white border border-[var(--border-soft)] text-xs font-semibold text-[#614d3f] shadow-2xs">
                📍 Bangalore • Mumbai • Delhi
              </span>
            </div>
          </div>

          {/* Quick Menu */}
          <div className="space-y-4 text-xs sm:text-sm">
            <h4 className="font-bold text-[#24140b] uppercase tracking-wider">
              Artisan Menu
            </h4>
            <ul className="space-y-2.5 text-[#8c7462]">
              <li><a href="#catalog" className="hover:text-[#c66624] transition-colors">Single Origin Microlots</a></li>
              <li><a href="#catalog" className="hover:text-[#c66624] transition-colors">Signature Blends</a></li>
              <li><a href="#catalog" className="hover:text-[#c66624] transition-colors">Draft Cold Brew & Nitro</a></li>
              <li><a href="#coffee-lab" className="hover:text-[#c66624] transition-colors">Interactive Coffee Lab</a></li>
              <li><a href="#catalog" className="hover:text-[#c66624] transition-colors">Artisan Bakery</a></li>
            </ul>
          </div>

          {/* Craft & Education */}
          <div className="space-y-4 text-xs sm:text-sm">
            <h4 className="font-bold text-[#24140b] uppercase tracking-wider">
              Craft & Education
            </h4>
            <ul className="space-y-2.5 text-[#8c7462]">
              <li><a href="#brew-guides" className="hover:text-[#c66624] transition-colors">V60 & Chemex Guides</a></li>
              <li><a href="#brew-guides" className="hover:text-[#c66624] transition-colors">Interactive Brew Timers</a></li>
              <li><a href="#subscription" className="hover:text-[#c66624] transition-colors">Coffee Club Subscription</a></li>
              <li><a href="#locations" className="hover:text-[#c66624] transition-colors">Sensory Cupping Classes</a></li>
              <li><a href="#locations" className="hover:text-[#c66624] transition-colors">Roastery Tours</a></li>
            </ul>
          </div>

          {/* Architecture & Tech */}
          <div className="space-y-4 text-xs sm:text-sm">
            <h4 className="font-bold text-[#24140b] uppercase tracking-wider">
              Architecture & Stack
            </h4>
            <ul className="space-y-2.5 text-[#8c7462]">
              <li><span>Next.js 16 (Turbopack)</span></li>
              <li><span>TypeScript & React 19</span></li>
              <li><span>Supabase PostgreSQL Cloud</span></li>
              <li>
                <button
                  onClick={() => setIsSupabaseConfigOpen(true)}
                  className="text-emerald-700 hover:underline flex items-center gap-1 font-semibold"
                >
                  <Database className="w-4 h-4" />
                  <span>Configure Supabase</span>
                </button>
              </li>
              <li><span>Vanilla CSS Design System</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-10 border-t border-stone-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#9c8574]">
          <p>© 2026 LUMEN & BEAN Artisan Roasters. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-[#24140b]">Privacy Policy</a>
            <a href="#" className="hover:text-[#24140b]">Terms of Service</a>
            <a href="#" className="hover:text-[#24140b]">Direct Trade Ethics</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
