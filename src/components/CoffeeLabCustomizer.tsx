'use client';

import React, { useState, useMemo } from 'react';
import { useCoffeeStore } from '@/lib/store';
import {
  Sparkles,
  Flame,
  Snowflake,
  ShoppingBag,
  Zap,
  Activity,
  Check,
  RotateCcw,
} from 'lucide-react';

interface SizeOption {
  id: string;
  name: string;
  ounces: number;
  basePrice: number;
  baseCalories: number;
  baseCaffeine: number;
}

const SIZES: SizeOption[] = [
  { id: 'small', name: 'Piccolo / Small', ounces: 8, basePrice: 180, baseCalories: 45, baseCaffeine: 75 },
  { id: 'medium', name: 'Standard / Regular', ounces: 12, basePrice: 220, baseCalories: 90, baseCaffeine: 150 },
  { id: 'large', name: 'Artisan Grande', ounces: 16, basePrice: 260, baseCalories: 140, baseCaffeine: 225 },
];

const MILKS = [
  { id: 'oat', name: 'Barista Oat Milk', price: 40, cal: 110, color: '#f3ead8' },
  { id: 'almond', name: 'Roasted Almond Milk', price: 40, cal: 60, color: '#eddcc5' },
  { id: 'macadamia', name: 'Australian Macadamia Milk', price: 55, cal: 100, color: '#f7efe1' },
  { id: 'whole', name: 'Organic Grass-Fed Whole Milk', price: 0, cal: 150, color: '#ffffff' },
  { id: 'none', name: 'No Milk (Pure Black Extraction)', price: 0, cal: 5, color: '#24140b' },
];

const ROASTS = [
  { id: 'velvet', name: 'Velvet Midnight (Dark Roast)', notes: 'Rich fudge & roasted hazelnut' },
  { id: 'volcanes', name: 'Los Volcanes (Medium Roast)', notes: 'Milk chocolate & spiced apple' },
  { id: 'pink', name: 'Pink Bourbon (Light Roast)', notes: 'Tropical passionfruit & guava' },
  { id: 'decaf', name: 'Swiss Water Decaf', notes: 'Caramel & sweet cocoa' },
];

const SYRUPS = [
  { id: 'vanilla', name: 'Madagascar Vanilla Pod', price: 35, cal: 40 },
  { id: 'caramel', name: 'Smoked Maldon Salt Caramel', price: 35, cal: 45 },
  { id: 'cardamom', name: 'Green Cardamom Rose', price: 40, cal: 35 },
  { id: 'hazelnut', name: 'Toasted Hazelnut Praline', price: 35, cal: 40 },
  { id: 'lavender', name: 'Wild Lavender Honey', price: 40, cal: 35 },
];

const TOPPINGS = [
  { id: 'none', name: 'None', price: 0 },
  { id: 'sweet-foam', name: 'Whipped Sweet Cold Foam', price: 45, cal: 60 },
  { id: 'pistachio-dust', name: 'Crushed Sicilian Pistachios', price: 40, cal: 25 },
  { id: 'cinnamon-cocoa', name: 'Valrhona Cocoa & Ceylon Cinnamon', price: 25, cal: 10 },
  { id: 'sea-salt', name: 'Maldon Smoked Salt Flakes', price: 0, cal: 0 },
];

export default function CoffeeLabCustomizer() {
  const { addToCart } = useCoffeeStore();

  const [drinkName, setDrinkName] = useState('My Sweet Caramel Latte');
  const [selectedSize, setSelectedSize] = useState<SizeOption>(SIZES[1]);
  const [selectedMilk, setSelectedMilk] = useState(MILKS[0]);
  const [selectedRoast, setSelectedRoast] = useState(ROASTS[0]);
  const [extraShots, setExtraShots] = useState<number>(1);
  const [sweetness, setSweetness] = useState<number>(50);
  const [selectedSyrups, setSelectedSyrups] = useState<string[]>(['caramel']);
  const [selectedTopping, setSelectedTopping] = useState(TOPPINGS[1]);
  const [temperature, setTemperature] = useState<'hot' | 'iced'>('iced');

  const toggleSyrup = (id: string) => {
    setSelectedSyrups((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const calculatedMetrics = useMemo(() => {
    const shotPrice = extraShots * 40;
    const syrupPrice = selectedSyrups.reduce((sum, sId) => {
      const syrup = SYRUPS.find((s) => s.id === sId);
      return sum + (syrup ? syrup.price : 0);
    }, 0);

    const totalPrice =
      selectedSize.basePrice +
      selectedMilk.price +
      shotPrice +
      syrupPrice +
      selectedTopping.price;

    const totalCaffeine =
      selectedRoast.id === 'decaf'
        ? 8
        : selectedSize.baseCaffeine + extraShots * 75;

    const syrupCalories = selectedSyrups.reduce((sum, sId) => {
      const syrup = SYRUPS.find((s) => s.id === sId);
      return sum + (syrup ? syrup.cal * (sweetness / 100) : 0);
    }, 0);

    const totalCalories = Math.round(
      selectedSize.baseCalories +
        selectedMilk.cal +
        syrupCalories +
        (selectedTopping.cal || 0)
    );

    return {
      price: Math.max(140, totalPrice),
      caffeine: totalCaffeine,
      calories: totalCalories,
    };
  }, [selectedSize, selectedMilk, selectedRoast, extraShots, sweetness, selectedSyrups, selectedTopping]);

  const handleAddToCart = () => {
    addToCart({
      productId: `custom-drink-${Date.now()}`,
      name: drinkName || 'Artisan Custom Brew',
      price: calculatedMetrics.price,
      quantity: 1,
      imageUrl:
        temperature === 'iced'
          ? 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80'
          : 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
      isCustomDrink: true,
      customDetails: {
        size: selectedSize.name,
        milk: selectedMilk.name,
        roast: selectedRoast.name,
        sweetness,
        extraShots,
        syrups: selectedSyrups.map((sId) => SYRUPS.find((s) => s.id === sId)?.name || sId),
        temperature: temperature === 'iced' ? 'Chilled on Artisan Ice' : 'Steamed Micro-Foam',
        topping: selectedTopping.name,
        calories: calculatedMetrics.calories,
        caffeineMg: calculatedMetrics.caffeine,
      },
    });
  };

  const handleReset = () => {
    setSelectedSize(SIZES[1]);
    setSelectedMilk(MILKS[0]);
    setSelectedRoast(ROASTS[0]);
    setExtraShots(1);
    setSweetness(50);
    setSelectedSyrups(['caramel']);
    setSelectedTopping(TOPPINGS[1]);
    setTemperature('iced');
  };

  return (
    <section id="coffee-lab" className="py-28 sm:py-36 lg:py-44 bg-[#faf6f0] relative overflow-hidden border-t border-[var(--border-soft)]">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16 2xl:px-20 space-y-16">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold bg-[#fceddb] text-[#8c4716] border border-[#e8d7c3] uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-[#c66624]" />
            Interactive Coffee Lab
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#24140b]">
            Craft Your Sweet Signature Brew
          </h2>
          <p className="text-base sm:text-lg text-[#614d3f] leading-relaxed">
            Customize every layer from single origin espresso, silky plant-based milks, and artisanal botanical syrups. Real-time calorie and caffeine extraction engine.
          </p>
        </div>

        {/* Builder Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          {/* Visual Cup Preview & Nutrition Board (5 cols) */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="card-soft-luxe p-8 sm:p-10 rounded-[32px] text-center space-y-7 relative overflow-hidden shadow-soft">
              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="absolute top-6 right-6 p-2.5 rounded-full text-[#9c8574] hover:text-[#24140b] bg-[#faf6f0] border border-[var(--border-soft)] hover:border-[#c66624] transition-all"
                title="Reset recipe"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Temperature Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold bg-[#f5ede3] text-[#8c4716] border border-[var(--border-card)]">
                {temperature === 'iced' ? (
                  <>
                    <Snowflake className="w-4 h-4 text-cyan-600" />
                    <span>Cold Draft / Over Artisan Ice</span>
                  </>
                ) : (
                  <>
                    <Flame className="w-4 h-4 text-amber-600" />
                    <span>Steamed Velvet / 65°C Hot</span>
                  </>
                )}
              </div>

              {/* Interactive Cup Visualizer */}
              <div className="py-6 relative flex items-center justify-center">
                <div
                  className="cup-visualizer"
                  style={{
                    height: selectedSize.ounces === 8 ? '170px' : selectedSize.ounces === 12 ? '205px' : '235px',
                    width: selectedSize.ounces === 8 ? '130px' : selectedSize.ounces === 12 ? '150px' : '165px',
                  }}
                >
                  <div className="cup-rim" style={{ width: selectedSize.ounces === 8 ? '144px' : selectedSize.ounces === 12 ? '164px' : '179px' }} />

                  {/* Topping Foam Layer */}
                  {selectedTopping.id !== 'none' && (
                    <div className="absolute top-0 left-0 right-0 h-10 bg-white/95 z-20 flex items-center justify-center border-b border-amber-200/60 shadow-xs">
                      <span className="text-[10px] font-bold text-[#8c4716] uppercase tracking-tighter truncate px-1">
                        {selectedTopping.name.split(' ')[0]} Foam
                      </span>
                    </div>
                  )}

                  {/* Milk Layer */}
                  <div
                    className="absolute top-0 left-0 right-0 transition-all duration-500"
                    style={{
                      backgroundColor: selectedMilk.color,
                      opacity: selectedMilk.id === 'none' ? 0.15 : 0.9,
                      bottom: extraShots > 1 ? '40%' : '30%',
                    }}
                  />

                  {/* Espresso Base Layer */}
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-[#3a2012] transition-all duration-500 border-t border-[#c66624]/40"
                    style={{
                      height: `${30 + extraShots * 15}%`,
                    }}
                  />

                  {/* Cup Sleeve */}
                  <div className="cup-sleeve">
                    <span className="text-[10px] font-serif font-extrabold text-[#24140b] tracking-widest uppercase">
                      LUMEN & BEAN
                    </span>
                  </div>
                </div>
              </div>

              {/* Recipe Name Input */}
              <div>
                <input
                  type="text"
                  value={drinkName}
                  onChange={(e) => setDrinkName(e.target.value)}
                  className="w-full text-center font-serif text-2xl font-bold text-[#24140b] bg-transparent border-b border-[var(--border-card)] pb-2 focus:outline-none focus:border-[#c66624]"
                />
                <span className="text-xs text-[#9c8574] block mt-1.5 font-medium">Click to name your sweet creation</span>
              </div>

              {/* Live Nutrition Matrix */}
              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-stone-200/60">
                <div className="p-3.5 rounded-2xl bg-[#faf6f0] border border-[var(--border-soft)]">
                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#8c7462] uppercase font-bold">
                    <Zap className="w-3.5 h-3.5 text-[#c66624]" />
                    Caffeine
                  </div>
                  <span className="text-lg font-extrabold text-[#24140b] mt-1 block">
                    {calculatedMetrics.caffeine} mg
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#faf6f0] border border-[var(--border-soft)]">
                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#8c7462] uppercase font-bold">
                    <Activity className="w-3.5 h-3.5 text-[#df9335]" />
                    Calories
                  </div>
                  <span className="text-lg font-extrabold text-[#24140b] mt-1 block">
                    {calculatedMetrics.calories} kcal
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#faf6f0] border border-[var(--border-soft)]">
                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#8c7462] uppercase font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-[#c66624]" />
                    Sweetness
                  </div>
                  <span className="text-lg font-extrabold text-[#24140b] mt-1 block">
                    {sweetness}%
                  </span>
                </div>
              </div>

              {/* Add Custom Drink Button */}
              <button
                onClick={handleAddToCart}
                className="btn-caramel w-full py-4 text-base font-bold shadow-lg"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Add to Cart • ₹{calculatedMetrics.price}</span>
              </button>
            </div>
          </div>

          {/* Builder Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-8 bg-white p-8 sm:p-12 rounded-[32px] border border-[var(--border-card)] shadow-soft">
            {/* 1. Temperature Toggle */}
            <div className="space-y-3">
              <label className="text-xs sm:text-sm font-bold text-[#24140b] tracking-wider uppercase flex items-center justify-between">
                <span>1. Choose Temperature</span>
                <span className="text-xs text-[#c66624] font-normal lowercase">{temperature}</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setTemperature('hot')}
                  className={`p-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 border transition-all ${
                    temperature === 'hot'
                      ? 'bg-[#c66624] text-white shadow-md'
                      : 'bg-[#faf6f0] text-[#5a4537] border-[var(--border-soft)] hover:bg-[#f3ece1]'
                  }`}
                >
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>Steamed Hot (65°C)</span>
                </button>
                <button
                  onClick={() => setTemperature('iced')}
                  className={`p-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 border transition-all ${
                    temperature === 'iced'
                      ? 'bg-[#c66624] text-white shadow-md'
                      : 'bg-[#faf6f0] text-[#5a4537] border-[var(--border-soft)] hover:bg-[#f3ece1]'
                  }`}
                >
                  <Snowflake className="w-4 h-4 text-cyan-300" />
                  <span>Iced Draft Cold</span>
                </button>
              </div>
            </div>

            {/* 2. Size Selection */}
            <div className="space-y-3">
              <label className="text-xs sm:text-sm font-bold text-[#24140b] tracking-wider uppercase">
                2. Select Cup Volume
              </label>
              <div className="grid grid-cols-3 gap-3.5">
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
                      <span className="text-xs sm:text-sm font-bold block">{size.name}</span>
                      <span className="text-xs opacity-80 block mt-0.5">{size.ounces} oz • ₹{size.basePrice}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Espresso Roast Selection */}
            <div className="space-y-3">
              <label className="text-xs sm:text-sm font-bold text-[#24140b] tracking-wider uppercase">
                3. Espresso Bean Profile
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {ROASTS.map((roast) => {
                  const isSelected = selectedRoast.id === roast.id;
                  return (
                    <button
                      key={roast.id}
                      onClick={() => setSelectedRoast(roast)}
                      className={`p-4 rounded-2xl text-left border transition-all ${
                        isSelected
                          ? 'bg-[#fceddb] border-[#c66624] text-[#24140b] font-semibold'
                          : 'bg-[#faf6f0] text-[#5a4537] border-[var(--border-soft)] hover:bg-[#f3ece1]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-bold">{roast.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#c66624]" />}
                      </div>
                      <span className="text-xs text-[#8c7462] block mt-1">{roast.notes}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Extra Espresso Shots */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-bold text-[#24140b] tracking-wider uppercase">
                  4. Extra Ristretto Shots
                </label>
                <span className="text-xs sm:text-sm text-[#c66624] font-bold">
                  {extraShots === 0 ? 'Standard Shot' : `+${extraShots} Extra Shot${extraShots > 1 ? 's' : ''} (+₹${extraShots * 40})`}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {[0, 1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => setExtraShots(num)}
                    className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                      extraShots === num
                        ? 'bg-[#c66624] text-white'
                        : 'bg-[#faf6f0] text-[#5a4537] border-[var(--border-soft)] hover:bg-[#f3ece1]'
                    }`}
                  >
                    {num === 0 ? 'Standard' : `+${num} Shot`}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Milk / Plant-Based Choice */}
            <div className="space-y-3">
              <label className="text-xs sm:text-sm font-bold text-[#24140b] tracking-wider uppercase">
                5. Milk / Plant-Based Choice
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MILKS.map((milk) => {
                  const isSelected = selectedMilk.id === milk.id;
                  return (
                    <button
                      key={milk.id}
                      onClick={() => setSelectedMilk(milk)}
                      className={`p-3.5 rounded-2xl text-left border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#fceddb] border-[#c66624] text-[#24140b] font-semibold'
                          : 'bg-[#faf6f0] text-[#5a4537] border-[var(--border-soft)] hover:bg-[#f3ece1]'
                      }`}
                    >
                      <div>
                        <span className="text-xs sm:text-sm font-bold block">{milk.name}</span>
                        <span className="text-xs text-[#8c7462]">
                          {milk.cal} cal {milk.price > 0 ? `• +₹${milk.price}` : '• Included'}
                        </span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#c66624]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 6. Artisanal Syrups */}
            <div className="space-y-3">
              <label className="text-xs sm:text-sm font-bold text-[#24140b] tracking-wider uppercase">
                6. Artisanal House Syrups
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {SYRUPS.map((syrup) => {
                  const isSelected = selectedSyrups.includes(syrup.id);
                  return (
                    <button
                      key={syrup.id}
                      onClick={() => toggleSyrup(syrup.id)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        isSelected
                          ? 'bg-[#c66624] text-white font-bold shadow-sm'
                          : 'bg-[#faf6f0] text-[#5a4537] border-[var(--border-soft)] hover:bg-[#f3ece1]'
                      }`}
                    >
                      <span className="text-xs sm:text-sm block truncate">{syrup.name}</span>
                      <span className="text-xs block mt-0.5 opacity-80">+₹{syrup.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 7. Sweetness Slider */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-bold text-[#24140b] uppercase">7. Sweetness Level</span>
                <span className="font-bold text-[#c66624]">{sweetness}% Sweet</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="25"
                value={sweetness}
                onChange={(e) => setSweetness(Number(e.target.value))}
                className="w-full accent-[#c66624] cursor-pointer h-2.5 bg-[#f3ece1] rounded-lg"
              />
              <div className="flex justify-between text-xs text-[#8c7462]">
                <span>0% (Pure)</span>
                <span>50% (Balanced)</span>
                <span>100% (Sweet)</span>
              </div>
            </div>

            {/* 8. Foams & Toppings */}
            <div className="space-y-3">
              <label className="text-xs sm:text-sm font-bold text-[#24140b] tracking-wider uppercase">
                8. Cold Foam & Garnish
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {TOPPINGS.map((top) => {
                  const isSelected = selectedTopping.id === top.id;
                  return (
                    <button
                      key={top.id}
                      onClick={() => setSelectedTopping(top)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        isSelected
                          ? 'bg-[#c66624] text-white font-bold shadow-sm'
                          : 'bg-[#faf6f0] text-[#5a4537] border-[var(--border-soft)] hover:bg-[#f3ece1]'
                      }`}
                    >
                      <span className="text-xs sm:text-sm block truncate">{top.name}</span>
                      <span className="text-xs block mt-0.5 opacity-80">
                        {top.price > 0 ? `+₹${top.price}` : 'Included'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
