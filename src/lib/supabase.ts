import { createClient } from '@supabase/supabase-js';

export interface SupabaseClientConfig {
  url: string;
  anonKey: string;
  isConfigured: boolean;
  isCustom?: boolean;
}

// Get configuration from env or localStorage if set in UI
export const getSupabaseConfig = (): SupabaseClientConfig => {
  if (typeof window !== 'undefined') {
    const customUrl = localStorage.getItem('lumen_supabase_url');
    const customKey = localStorage.getItem('lumen_supabase_anon_key');
    if (customUrl && customKey) {
      return {
        url: customUrl,
        anonKey: customKey,
        isConfigured: Boolean(customUrl && customKey),
        isCustom: true,
      };
    }
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  return {
    url,
    anonKey,
    isConfigured: Boolean(url && anonKey && !url.includes('placeholder')),
    isCustom: false,
  };
};

export const getSupabaseClient = () => {
  const config = getSupabaseConfig();
  if (config.url && config.anonKey) {
    try {
      return createClient(config.url, config.anonKey);
    } catch (err) {
      console.warn('Failed to initialize Supabase client:', err);
    }
  }
  return null;
};
