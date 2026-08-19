'use client';

import React from 'react';
import { useCoffeeStore } from '@/lib/store';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useCoffeeStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-xl shadow-2xl transition-all animate-bounce-short"
          style={{
            backgroundColor: 'rgba(24, 18, 14, 0.95)',
            borderColor:
              toast.type === 'error'
                ? '#ef4444'
                : toast.type === 'info'
                ? '#3b82f6'
                : 'rgba(224, 122, 56, 0.6)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
          }}
        >
          <div className="mt-0.5 flex-shrink-0">
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400" />}
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
          </div>

          <div className="flex-1 text-sm font-medium text-amber-50">
            {toast.message}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-stone-400 hover:text-amber-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
