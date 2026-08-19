'use client';

import React, { useState } from 'react';
import { useCoffeeStore } from '@/lib/store';
import {
  Package,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

const ROAST_PREFERENCES = [
  {
    id: 'Light & Fruity',
    title: 'Light & Floral Microlots',
    desc: 'High-altitude Ethiopian and Colombian single origins bursting with jasmine and citrus.',
    badge: 'Acidity & Fruit',
  },
  {
    id: 'Balanced Medium',
    title: 'Balanced Caramel & Nut Roasts',
    desc: 'Guatemalan and Costa Rican estates featuring brown sugar, toffee, and clean sweetness.',
    badge: 'Most Popular',
  },
  {
    id: 'Dark & Rich',
    title: 'Dark Belgian Cocoa & Smoke',
    desc: 'Sumatran and Brazilian blends delivering syrupy dark chocolate body and smoky maple.',
    badge: 'Heavy Body',
  },
  {
    id: 'Roaster Curated Surprise',
    title: 'Head Roaster Curated Rotation',
    desc: 'Our roast master selects an exclusive new micro-lot farm release for every shipment.',
    badge: 'Adventurous',
  },
];

const SIZES = [
  { id: '250g (15-18 Cups)', title: '1 Bag (250g)', cups: '15–18 Cups', basePrice: 750 },
  { id: '500g (30-36 Cups)', title: '2 Bags (500g)', cups: '30–36 Cups', basePrice: 1350 },
  { id: '1kg (60-70 Cups)', title: '4 Bags (1kg)', cups: '60–72 Cups', basePrice: 2400 },
];

const FREQUENCIES = [
  { id: 'Weekly (Best Freshness)', title: 'Weekly Delivery', multiplier: 4 },
  { id: 'Every 2 Weeks', title: 'Every 2 Weeks', multiplier: 2 },
  { id: 'Monthly', title: 'Once a Month', multiplier: 1 },
];

export default function SubscriptionBuilder() {
  const { createSubscription, addToast } = useCoffeeStore();

  const [selectedRoast, setSelectedRoast] = useState<any>(ROAST_PREFERENCES[1].id);
  const [selectedSize, setSelectedSize] = useState<any>(SIZES[1]);
  const [selectedFreq, setSelectedFreq] = useState<any>(FREQUENCIES[1]);
  const [selectedGrind, setSelectedGrind] = useState('Whole Bean (Recommended)');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const discountedPricePerShipment = Math.round(selectedSize.basePrice * 0.85);
  const monthlyTotal = discountedPricePerShipment * selectedFreq.multiplier;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      addToast('Please provide your name and email to activate subscription', 'error');
      return;
    }

    setIsSubmitting(true);
    await createSubscription({
      customerName: name,
      customerEmail: email,
      roastPreference: selectedRoast,
      bagSize: selectedSize.id,
      frequency: selectedFreq.id,
      grind: selectedGrind,
      monthlyPrice: monthlyTotal,
      status: 'active',
    });

    setIsSubmitting(false);
    setName('');
    setEmail('');
  };

  return (
    <section id="subscription" className="py-28 sm:py-36 lg:py-44 bg-[#faf6f0] relative overflow-hidden border-t border-[var(--border-soft)]">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16 2xl:px-20 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold bg-[#fceddb] text-[#8c4716] border border-[#e8d7c3] uppercase tracking-widest">
            <Package className="w-4 h-4 text-[#c66624]" />
            The Roaster Club
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#24140b]">
            Fresh Roasted Coffee on Autopilot
          </h2>
          <p className="text-base sm:text-lg text-[#614d3f] leading-relaxed">
            Save 15% on every shipment, unlock complimentary pan-India shipping, and taste rare micro-lots before they hit the public menu.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          {/* Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-8 bg-white p-8 sm:p-12 rounded-[32px] border border-[var(--border-card)] shadow-soft">
            {/* Step 1: Roast Preference */}
            <div className="space-y-4">
              <label className="text-xs sm:text-sm font-bold text-[#24140b] tracking-wider uppercase flex items-center justify-between">
                <span>1. Select Flavor Profile</span>
                <span className="text-xs text-[#c66624] font-semibold">{selectedRoast}</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ROAST_PREFERENCES.map((pref) => {
                  const isSelected = selectedRoast === pref.id;
                  return (
                    <button
                      key={pref.id}
                      onClick={() => setSelectedRoast(pref.id)}
                      className={`p-5 rounded-2xl text-left border transition-all ${
                        isSelected
                          ? 'bg-[#fceddb] border-[#c66624] text-[#24140b] shadow-xs'
                          : 'bg-[#faf6f0] text-[#5a4537] border-[var(--border-soft)] hover:bg-[#f3ece1]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-bold">{pref.title}</span>
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white text-[#8c4716] font-bold border border-amber-200/60">
                          {pref.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[#8c7462] mt-2 leading-relaxed">
                        {pref.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Bag Quantity */}
            <div className="space-y-4">
              <label className="text-xs sm:text-sm font-bold text-[#24140b] tracking-wider uppercase">
                2. Choose Delivery Volume
              </label>
              <div className="grid grid-cols-3 gap-4">
                {SIZES.map((size) => {
                  const isSelected = selectedSize.id === size.id;
                  return (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size)}
                      className={`p-4 rounded-2xl text-left border transition-all ${
                        isSelected
                          ? 'bg-[#c66624] text-white shadow-md'
                          : 'bg-[#faf6f0] text-[#5a4537] border-[var(--border-soft)] hover:bg-[#f3ece1]'
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-bold block">{size.title}</span>
                      <span className="text-xs opacity-80 block mt-0.5">{size.cups} • ₹{size.basePrice}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Delivery Cadence */}
            <div className="space-y-4">
              <label className="text-xs sm:text-sm font-bold text-[#24140b] tracking-wider uppercase">
                3. Delivery Cadence
              </label>
              <div className="grid grid-cols-3 gap-4">
                {FREQUENCIES.map((freq) => {
                  const isSelected = selectedFreq.id === freq.id;
                  return (
                    <button
                      key={freq.id}
                      onClick={() => setSelectedFreq(freq)}
                      className={`p-4 rounded-2xl text-left border transition-all ${
                        isSelected
                          ? 'bg-[#fceddb] border-[#c66624] text-[#24140b] font-semibold'
                          : 'bg-[#faf6f0] text-[#5a4537] border-[var(--border-soft)] hover:bg-[#f3ece1]'
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-bold block">{freq.title}</span>
                      <span className="text-xs text-[#8c7462] block mt-0.5">
                        {freq.multiplier} shipments/mo
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Grind Preference */}
            <div className="space-y-2.5">
              <label className="text-xs sm:text-sm font-bold text-[#24140b] tracking-wider uppercase">
                4. Grind Type
              </label>
              <select
                value={selectedGrind}
                onChange={(e) => setSelectedGrind(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-[#faf6f0] border border-[var(--border-card)] text-xs sm:text-sm text-[#24140b] focus:outline-none focus:border-[#c66624]"
              >
                <option value="Whole Bean (Recommended)">Whole Bean (Recommended for Maximum Freshness)</option>
                <option value="Pour Over / V60 (Medium-Fine)">Pour Over / V60 (Medium-Fine Grind)</option>
                <option value="French Press / Cold Brew (Coarse)">French Press / Cold Brew (Coarse Grind)</option>
                <option value="Espresso Machine (Fine)">Espresso Machine (Fine Grind)</option>
              </select>
            </div>
          </div>

          {/* Summary Card in ₹ */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <form
              onSubmit={handleSubscribe}
              className="card-soft-luxe p-8 sm:p-10 rounded-[32px] space-y-7 shadow-soft"
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-200/60">
                <span className="font-serif text-2xl font-bold text-[#24140b]">
                  Subscription Summary
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-300">
                  15% OFF Active
                </span>
              </div>

              {/* Price Calculation Box */}
              <div className="space-y-3.5 text-xs sm:text-sm text-[#614d3f]">
                <div className="flex justify-between">
                  <span>Regular Price per Shipment:</span>
                  <span className="line-through text-stone-400">₹{selectedSize.basePrice}</span>
                </div>
                <div className="flex justify-between font-bold text-[#24140b]">
                  <span>Member Price ({selectedSize.title}):</span>
                  <span className="text-[#c66624]">₹{discountedPricePerShipment} / shipment</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Cadence:</span>
                  <span>{selectedFreq.title}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="text-emerald-700 font-bold">FREE (Complimentary)</span>
                </div>
                <div className="pt-4 border-t border-stone-200/60 flex justify-between items-baseline">
                  <span className="font-bold text-base text-[#24140b]">Estimated Monthly Total:</span>
                  <span className="font-serif text-3xl sm:text-4xl font-extrabold text-[#c66624]">
                    ₹{monthlyTotal}
                  </span>
                </div>
              </div>

              {/* Subscriber Details */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-[#24140b] uppercase tracking-wider block">
                  Subscriber Details
                </span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-xl bg-[#faf6f0] border border-[var(--border-card)] text-xs sm:text-sm text-[#24140b] placeholder-[#9c8574] focus:outline-none focus:border-[#c66624]"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-xl bg-[#faf6f0] border border-[var(--border-card)] text-xs sm:text-sm text-[#24140b] placeholder-[#9c8574] focus:outline-none focus:border-[#c66624]"
                />
              </div>

              {/* Perks */}
              <div className="space-y-2 pt-1 text-xs text-[#8c7462]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c66624] shrink-0" />
                  <span>Pause, skip, or cancel anytime in 1 click</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#c66624] shrink-0" />
                  <span>Roasted 24 hours before dispatch</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-caramel w-full py-4 text-base font-bold shadow-lg"
              >
                <span>{isSubmitting ? 'Activating...' : 'Activate Coffee Subscription'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
