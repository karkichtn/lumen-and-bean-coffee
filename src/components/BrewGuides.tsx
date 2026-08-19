'use client';

import React, { useState, useEffect } from 'react';
import { BREW_GUIDES, BrewGuide } from '@/lib/coffeeData';
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Sliders,
  Scale,
} from 'lucide-react';

export default function BrewGuides() {
  const [activeGuide, setActiveGuide] = useState<BrewGuide>(BREW_GUIDES[0]);
  const [coffeeGrams, setCoffeeGrams] = useState<number>(15);

  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const waterRatioNumber = activeGuide.id === 'guide-v60' ? 16 : activeGuide.id === 'guide-french-press' ? 15 : 12;
  const calculatedWaterGrams = Math.round(coffeeGrams * waterRatioNumber);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(0);
    setCompletedSteps([]);
  };

  const toggleStep = (idx: number) => {
    setCompletedSteps((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section id="brew-guides" className="py-28 sm:py-36 lg:py-44 bg-[#f4ebe0] relative border-t border-[var(--border-soft)]">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16 2xl:px-20 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold bg-[#fceddb] text-[#8c4716] border border-[#e8d7c3] uppercase tracking-widest">
            <Sliders className="w-4 h-4 text-[#c66624]" />
            Master Barista Academy
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#24140b]">
            Interactive Brew Guides & Timers
          </h2>
          <p className="text-base sm:text-lg text-[#614d3f] leading-relaxed">
            Dial in extraction like a specialty barista with calibrated coffee-to-water ratio calculators and step-by-step stopwatch guidance.
          </p>
        </div>

        {/* Method Selector Tabs */}
        <div className="flex justify-center gap-3.5 overflow-x-auto pb-2">
          {BREW_GUIDES.map((guide) => {
            const isSelected = activeGuide.id === guide.id;
            return (
              <button
                key={guide.id}
                onClick={() => {
                  setActiveGuide(guide);
                  handleResetTimer();
                  setCoffeeGrams(guide.id === 'guide-french-press' ? 30 : guide.id === 'guide-aeropress' ? 18 : 15);
                }}
                className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-[#c66624] text-white shadow-md shadow-[#c66624]/20'
                    : 'bg-white text-[#5a4537] hover:text-[#c66624] border border-[var(--border-soft)] shadow-2xs'
                }`}
              >
                <span>{guide.name}</span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-black/10">
                  {guide.time}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Guide Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          {/* Left Column: Quick Stats & Interactive Ratio Calculator */}
          <div className="lg:col-span-5 space-y-6">
            <div className="card-soft-luxe p-8 sm:p-10 rounded-[32px] space-y-7 shadow-soft">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#c66624] uppercase tracking-wider">
                    {activeGuide.difficulty}
                  </span>
                  <span className="text-xs text-[#9c8574]">Target: {activeGuide.time}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#24140b]">
                  {activeGuide.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#614d3f] leading-relaxed">
                  {activeGuide.description}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3.5 pt-1">
                <div className="p-4 rounded-2xl bg-[#faf6f0] border border-[var(--border-soft)]">
                  <span className="text-[11px] text-[#9c8574] block font-medium">Grind Texture</span>
                  <span className="text-xs font-bold text-[#24140b] mt-1 block">
                    {activeGuide.grindSize}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-[#faf6f0] border border-[var(--border-soft)]">
                  <span className="text-[11px] text-[#9c8574] block font-medium">Water Temp</span>
                  <span className="text-xs font-bold text-[#c66624] mt-1 block">
                    {activeGuide.waterTemp}
                  </span>
                </div>
              </div>

              {/* Dynamic Ratio Calculator */}
              <div className="pt-3 border-t border-stone-200/60 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#24140b] uppercase flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-[#c66624]" />
                    Ratio Calculator
                  </span>
                  <span className="text-xs font-bold text-[#c66624]">1:{waterRatioNumber} Ratio</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-[#614d3f]">
                    <span>Dose: <strong>{coffeeGrams}g</strong> Coffee</span>
                    <span className="font-bold text-[#24140b]">Yield: {calculatedWaterGrams}g Water</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    step="1"
                    value={coffeeGrams}
                    onChange={(e) => setCoffeeGrams(Number(e.target.value))}
                    className="w-full accent-[#c66624] cursor-pointer h-2 bg-[#f3ece1] rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-[#9c8574]">
                    <span>Single Cup (12g)</span>
                    <span>Standard Mug (18g)</span>
                    <span>Carafe (35g+)</span>
                  </div>
                </div>
              </div>

              {/* Interactive Stopwatch */}
              <div className="p-6 rounded-2xl bg-[#faf6f0] border border-[var(--border-card)] text-center space-y-4">
                <span className="text-xs text-[#8c7462] uppercase tracking-wider block font-bold">
                  Extraction Timer
                </span>
                <div className="font-serif text-5xl sm:text-6xl font-extrabold tracking-tight text-[#24140b]">
                  {formatTime(timerSeconds)}
                </div>

                <div className="flex items-center justify-center gap-3 pt-1">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className={`px-6 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${
                      isTimerRunning
                        ? 'bg-amber-600 text-white'
                        : 'btn-caramel text-xs py-2.5 px-6'
                    }`}
                  >
                    {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{isTimerRunning ? 'Pause Timer' : 'Start Brew Timer'}</span>
                  </button>

                  <button
                    onClick={handleResetTimer}
                    className="p-3 rounded-full bg-white text-[#8c7462] hover:text-[#24140b] border border-[var(--border-soft)] shadow-xs"
                    title="Reset Timer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Step-by-Step Instructions */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-serif text-2xl font-bold text-[#24140b]">
                Step-by-Step Barista Workflow
              </h4>
              <span className="text-xs text-[#9c8574]">
                {completedSteps.length} of {activeGuide.steps.length} Steps Completed
              </span>
            </div>

            <div className="space-y-4">
              {activeGuide.steps.map((step, idx) => {
                const isCompleted = completedSteps.includes(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`p-6 rounded-3xl border transition-all cursor-pointer ${
                      isCompleted
                        ? 'bg-white/60 border-emerald-500/40 opacity-75'
                        : 'bg-white border-[var(--border-soft)] hover:border-[#c66624] shadow-xs'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                            : 'bg-[#f5ede3] text-[#c66624] border border-[var(--border-card)]'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h5 className={`text-base font-bold ${isCompleted ? 'line-through text-stone-400' : 'text-[#24140b]'}`}>
                            {step.title}
                          </h5>
                          {step.waterAmount && (
                            <span className="text-xs font-bold text-[#8c4716] bg-[#f5ede3] px-3 py-1 rounded-lg">
                              {step.waterAmount}
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-[#614d3f] leading-relaxed">
                          {step.instruction}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
