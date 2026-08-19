'use client';

import React from 'react';
import { useCoffeeStore } from '@/lib/store';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Flame,
  Award,
  Coffee,
} from 'lucide-react';

export default function Hero() {
  const { setActiveProduct, products } = useCoffeeStore();
  const featuredProduct = products[0]; // Ethiopia Yirgacheffe Gedeb

  return (
    <section className="relative overflow-hidden pt-16 pb-28 sm:pt-24 sm:pb-36 lg:pt-28 lg:pb-44 bg-gradient-to-b from-[#faf6f0] via-[#f5ede3] to-[#faf6f0]">
      {/* Soft Warm Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#df9335]/12 rounded-full blur-[160px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-12 right-12 w-[500px] h-[500px] bg-[#c66624]/08 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16 2xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 xl:gap-20 items-center">
          {/* Left Column: Headline & Action Triggers (7 cols) */}
          <div className="lg:col-span-7 space-y-10 text-center lg:text-left">
            {/* Live Cafe Status Pill */}
            <div className="inline-flex items-center gap-3.5 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-[var(--border-card)] text-xs sm:text-sm font-bold text-[#8c4716] shadow-sm">
              <span className="badge-live-pulse" />
              <span className="text-[#24140b]">Flagship Roastery Open</span>
              <span className="text-stone-300">•</span>
              <span className="text-[#c66624]">Batch #408 Freshly Roasted</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-extrabold tracking-tight text-[#24140b] leading-[1.14]">
                Every Sip, A Sweet <br />
                <span className="text-gradient-caramel">Moment of Pure Bliss.</span>
              </h1>
              <p className="text-lg sm:text-xl text-[#614d3f] max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Directly traded single-origin microlots and sweet caramel signature blends,
                slow-roasted on vintage cast-iron drums and shipped fresh to your door across India.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-2">
              <a href="#catalog" className="btn-caramel group text-base py-4 px-9 shadow-lg">
                <span>Explore Sweet Roasts</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </a>

              <a href="#coffee-lab" className="btn-cream-soft group text-base py-4 px-9 shadow-sm">
                <Sparkles className="w-5 h-5 text-[#c66624]" />
                <span>Interactive Brew Lab</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-[var(--border-soft)] text-xs sm:text-sm text-[#8c7462] font-semibold">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#c66624] shrink-0" />
                <span>100% Direct-Trade Sourced</span>
              </div>
              <div className="flex items-center gap-3">
                <Flame className="w-5 h-5 text-[#df9335] shrink-0" />
                <span>Roasted Fresh Every 48h</span>
              </div>
              <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
                <Award className="w-5 h-5 text-[#c66624] shrink-0" />
                <span>SCA Certified 90+ Score</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card with soft steam (5 cols) */}
          <div className="lg:col-span-5 relative">
            {/* Ambient Steam Animation */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-4 pointer-events-none z-20">
              <div className="w-2 h-16 rounded-full bg-[#c66624]/20 blur-sm animate-steam-1" />
              <div className="w-2.5 h-20 rounded-full bg-[#c66624]/25 blur-sm animate-steam-2" />
              <div className="w-2 h-14 rounded-full bg-[#c66624]/20 blur-sm animate-steam-3" />
            </div>

            {/* Hero Card */}
            <div className="card-soft-luxe p-8 sm:p-10 space-y-7 group shadow-luxe">
              {/* Product Image Frame */}
              <div className="relative w-full h-72 sm:h-84 lg:h-96 rounded-3xl overflow-hidden bg-[#f3ece1] border border-[var(--border-card)] shadow-inner">
                <img
                  src={featuredProduct.imageUrl}
                  alt={featuredProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#24140b]/60 via-transparent to-transparent opacity-80" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex gap-2.5">
                  <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#c66624] text-white shadow-md">
                    Featured Microlot
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/95 backdrop-blur-md text-[#8c4716] border border-white/80 shadow-sm">
                    SCA 92.5
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs sm:text-sm text-white">
                  <span className="font-semibold bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                    📍 {featuredProduct.origin}
                  </span>
                  <span className="font-extrabold text-white text-base bg-[#c66624] px-4 py-2 rounded-xl shadow-md">
                    ₹{featuredProduct.price}
                  </span>
                </div>
              </div>

              {/* Card Information */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl font-bold text-[#24140b] group-hover:text-[#c66624] transition-colors">
                    {featuredProduct.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-sm text-[#c66624] font-bold">
                    ★ {featuredProduct.rating} ({featuredProduct.reviewsCount})
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#614d3f] line-clamp-2 leading-relaxed">
                  {featuredProduct.shortDescription}
                </p>

                {/* Tasting Note Pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {featuredProduct.tastingNotes.map((note) => (
                    <span
                      key={note}
                      className="px-3 py-1 rounded-xl text-xs font-semibold bg-[#f5ede3] text-[#8c4716] border border-[var(--border-card)]"
                    >
                      ✨ {note}
                    </span>
                  ))}
                </div>

                {/* Quick Action Button */}
                <div className="pt-3">
                  <button
                    onClick={() => setActiveProduct(featuredProduct)}
                    className="w-full py-4 rounded-2xl font-bold text-xs sm:text-sm text-[#8c4716] bg-[#f5ede3] hover:bg-[#ebdccb] border border-[var(--border-card)] hover:border-[#c66624] transition-all flex items-center justify-center gap-2.5 shadow-sm"
                  >
                    <Coffee className="w-4 h-4 text-[#c66624]" />
                    <span>View Origin Story & Taste Profile</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
