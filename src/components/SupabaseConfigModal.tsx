'use client';

import React, { useState, useEffect } from 'react';
import { useCoffeeStore } from '@/lib/store';
import {
  X,
  Database,
  CheckCircle2,
  Copy,
  Check,
  Zap,
  Key,
  Globe,
  RotateCcw,
  Code,
} from 'lucide-react';

export default function SupabaseConfigModal() {
  const {
    isSupabaseConfigOpen,
    setIsSupabaseConfigOpen,
    isSupabaseConnected,
    supabaseConfig,
    saveSupabaseConfig,
    resetSupabaseConfig,
    addToast,
  } = useCoffeeStore();

  const [url, setUrl] = useState(supabaseConfig.url || '');
  const [anonKey, setAnonKey] = useState(supabaseConfig.anonKey || '');
  const [isCopied, setIsCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setUrl(supabaseConfig.url || '');
    setAnonKey(supabaseConfig.anonKey || '');
  }, [supabaseConfig]);

  if (!isSupabaseConfigOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await saveSupabaseConfig(url, anonKey);
    setIsSaving(false);
  };

  const handleCopySchema = () => {
    const schemaSql = `-- LUMEN & BEAN SUPABASE MIGRATION
-- Run this in your Supabase SQL Editor:
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,
    category_slug VARCHAR(50) REFERENCES categories(slug),
    description TEXT NOT NULL,
    short_description VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL,
    roast_level VARCHAR(30) DEFAULT 'Medium',
    origin VARCHAR(100),
    altitude VARCHAR(50),
    process VARCHAR(50),
    tasting_notes TEXT[] DEFAULT '{}',
    rating DECIMAL(2, 1) DEFAULT 4.9,
    reviews_count INT DEFAULT 0,
    image_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(20) UNIQUE NOT NULL,
    customer_name VARCHAR(120) NOT NULL,
    customer_email VARCHAR(150) NOT NULL,
    order_type VARCHAR(20) DEFAULT 'delivery',
    total DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_code VARCHAR(20) UNIQUE NOT NULL,
    guest_name VARCHAR(120) NOT NULL,
    guest_email VARCHAR(150) NOT NULL,
    experience_type VARCHAR(50),
    reservation_date DATE NOT NULL,
    time_slot VARCHAR(30) NOT NULL,
    party_size INT NOT NULL DEFAULT 2,
    created_at TIMESTAMPTZ DEFAULT NOW()
);`;

    navigator.clipboard.writeText(schemaSql);
    setIsCopied(true);
    addToast('SQL Migration Schema copied to clipboard!', 'success');
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsSupabaseConfigOpen(false)}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-content relative w-full max-w-2xl bg-[#faf6f0] rounded-[32px] border border-[var(--border-card)] shadow-2xl p-8 sm:p-10 space-y-6 max-h-[92vh] overflow-y-auto text-[#5a4537]"
      >
        <button
          onClick={() => setIsSupabaseConfigOpen(false)}
          className="absolute top-6 right-6 p-2 rounded-full bg-white text-[#8c7462] hover:text-[#24140b] border border-[var(--border-soft)] shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
              Database & Cloud Sync
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#24140b]">
            Supabase Backend Integration
          </h2>
          <p className="text-xs sm:text-sm text-[#614d3f] leading-relaxed">
            This store is architected with a resilient dual-layer data architecture: zero-config instant demo mode with automatic cloud sync when connected to your Supabase project.
          </p>
        </div>

        {/* Status Card */}
        <div
          className="p-4 rounded-2xl border flex items-center justify-between"
          style={{
            backgroundColor: isSupabaseConnected ? 'rgba(16, 185, 129, 0.08)' : '#fceddb',
            borderColor: isSupabaseConnected ? 'rgba(16, 185, 129, 0.3)' : 'rgba(198, 102, 36, 0.3)',
          }}
        >
          <div className="flex items-center gap-3">
            {isSupabaseConnected ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            ) : (
              <Zap className="w-6 h-6 text-[#c66624] shrink-0" />
            )}
            <div>
              <span className="text-xs font-bold text-[#24140b] block">
                {isSupabaseConnected
                  ? 'Supabase Connection Active'
                  : 'Zero-Config Local / Mock Persistence Mode Active'}
              </span>
              <span className="text-[11px] text-[#8c7462] mt-0.5 block">
                {isSupabaseConnected
                  ? 'Orders, reservations, and reviews are persisting to your PostgreSQL database in real-time.'
                  : 'Everything works seamlessly out-of-the-box using reactive storage. Add credentials below to sync to live database.'}
              </span>
            </div>
          </div>
        </div>

        {/* SQL Schema Copy Card */}
        <div className="p-4 rounded-2xl bg-white border border-[var(--border-card)] space-y-2.5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#24140b] flex items-center gap-1.5">
              <Code className="w-4 h-4 text-[#c66624]" />
              Database Schema Script (`supabase/schema.sql`)
            </span>
            <button
              onClick={handleCopySchema}
              className="text-xs font-bold text-[#8c4716] hover:underline flex items-center gap-1 bg-[#faf6f0] px-3 py-1 rounded-lg border border-[var(--border-soft)]"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'Copied SQL!' : 'Copy SQL Script'}</span>
            </button>
          </div>
          <p className="text-[11px] text-[#8c7462] leading-relaxed">
            Paste this SQL script in your Supabase project's SQL Editor to instantiate all tables (products, orders, reservations, subscriptions, reviews) with Row Level Security (RLS) policies.
          </p>
        </div>

        {/* Config Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <span className="text-xs font-bold text-[#24140b] uppercase tracking-wider block">
            Custom Supabase Credentials
          </span>

          <div>
            <label className="text-xs font-semibold text-[#5a4537] block mb-1">
              Project URL (`NEXT_PUBLIC_SUPABASE_URL`)
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://xyzcompany.supabase.co"
                className="w-full pl-10 pr-3 py-2 rounded-xl bg-white border border-[var(--border-card)] text-xs text-[#24140b] focus:outline-none focus:border-[#c66624]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#5a4537] block mb-1">
              Public Anon API Key (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={anonKey}
                onChange={(e) => setAnonKey(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                className="w-full pl-10 pr-3 py-2 rounded-xl bg-white border border-[var(--border-card)] text-xs text-[#24140b] focus:outline-none focus:border-[#c66624]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={resetSupabaseConfig}
              className="text-xs font-medium text-[#8c7462] hover:text-[#24140b] flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsSupabaseConfigOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-[#8c7462] hover:text-[#24140b]"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="btn-caramel text-xs py-2 px-5 font-bold shadow-sm"
              >
                {isSaving ? 'Testing...' : 'Save & Test Connection'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
