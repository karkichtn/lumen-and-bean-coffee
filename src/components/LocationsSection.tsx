'use client';

import React from 'react';
import { CAFE_LOCATIONS } from '@/lib/coffeeData';
import { useCoffeeStore } from '@/lib/store';
import {
  MapPin,
  Phone,
  Compass,
  Calendar,
} from 'lucide-react';

export default function LocationsSection() {
  const { setIsReservationOpen } = useCoffeeStore();

  return (
    <section id="locations" className="py-28 sm:py-36 lg:py-44 bg-[#f6efe6] relative border-t border-[var(--border-soft)]">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16 2xl:px-20 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold bg-[#fceddb] text-[#8c4716] border border-[#e8d7c3] uppercase tracking-widest">
            <Compass className="w-4 h-4 text-[#c66624]" />
            Flagship Sanctuaries
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#24140b]">
            Visit Our Roasteries & Brew Bars
          </h2>
          <p className="text-base sm:text-lg text-[#614d3f] leading-relaxed">
            Designed as architectural temples to coffee craft. Enjoy live cast-iron roasting demonstrations, manual cupping bars, and serene acoustic lounges.
          </p>
        </div>

        {/* Location Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 xl:gap-12">
          {CAFE_LOCATIONS.map((loc) => {
            return (
              <div
                key={loc.id}
                className="card-soft-luxe overflow-hidden flex flex-col group transition-all duration-300 shadow-soft"
              >
                {/* Location Image */}
                <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#f3ece1]">
                  <img
                    src={loc.imageUrl}
                    alt={loc.name}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#24140b]/60 via-transparent to-transparent opacity-75" />

                  {/* Live Open Status Pill */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-white/95 backdrop-blur-md text-[#24140b] shadow-sm">
                    <span className="badge-live-pulse" />
                    <span>{loc.todayHours}</span>
                  </div>
                </div>

                {/* Location Details */}
                <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-serif text-2xl font-bold text-[#24140b] group-hover:text-[#c66624] transition-colors">
                      {loc.name}
                    </h3>
                    <p className="text-sm text-[#8c4716] font-semibold leading-relaxed">
                      {loc.tagline}
                    </p>

                    <div className="space-y-2.5 pt-1 text-xs sm:text-sm text-[#614d3f]">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-[#c66624] shrink-0 mt-0.5" />
                        <span>{loc.address}, {loc.city}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-[#df9335] shrink-0" />
                        <span>{loc.phone}</span>
                      </div>
                    </div>

                    {/* Features Tags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {loc.features.map((feat) => (
                        <span
                          key={feat}
                          className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#faf6f0] text-[#614d3f] border border-[var(--border-soft)]"
                        >
                          ✓ {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Location Action Buttons */}
                  <div className="pt-5 border-t border-stone-200/60 grid grid-cols-2 gap-3.5">
                    <button
                      onClick={() => setIsReservationOpen(true)}
                      className="py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-[#8c4716] bg-[#f5ede3] hover:bg-[#c66624] hover:text-white border border-[var(--border-card)] transition-all flex items-center justify-center gap-2 shadow-2xs"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book Table</span>
                    </button>

                    <a
                      href={loc.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-[#5a4537] hover:text-[#24140b] bg-white hover:bg-[#faf6f0] border border-[var(--border-soft)] transition-all flex items-center justify-center gap-2 text-decoration-none shadow-2xs"
                    >
                      <MapPin className="w-4 h-4" />
                      <span>Directions</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
