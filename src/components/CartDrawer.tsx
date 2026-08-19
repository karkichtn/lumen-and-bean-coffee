'use client';

import React, { useState } from 'react';
import { useCoffeeStore } from '@/lib/store';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Truck,
  Store,
  Tag,
  CheckCircle2,
} from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    orderType,
    setOrderType,
    appliedPromo,
    promoDiscount,
    applyPromoCode,
    subtotal,
    shippingFee,
    total,
    freeShippingThreshold,
    setIsCheckoutOpen,
  } = useCoffeeStore();

  const [promoInput, setPromoInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    applyPromoCode(promoInput);
    setPromoInput('');
  };

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-sm flex justify-end">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md h-full bg-[#faf6f0] border-l border-[var(--border-card)] flex flex-col justify-between shadow-2xl animate-slideLeft text-[#5a4537]"
      >
        {/* Drawer Header */}
        <div className="p-6 sm:p-7 border-b border-[var(--border-soft)] flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-[#c66624]" />
            <h2 className="font-serif text-xl font-bold text-[#24140b]">
              Your Tasting Cart
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#fceddb] text-[#8c4716] font-bold">
              {cart.reduce((a, b) => a + b.quantity, 0)}
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full bg-[#faf6f0] text-[#8c7462] hover:text-[#24140b] border border-[var(--border-soft)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-6 py-3.5 bg-[#f4ebe0] border-b border-stone-200/60 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            {amountNeededForFreeShipping === 0 ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Complimentary Pan-India Shipping Unlocked!
              </span>
            ) : (
              <span className="text-[#614d3f]">
                Add <strong className="text-[#c66624]">₹{Math.round(amountNeededForFreeShipping)}</strong> for FREE Shipping
              </span>
            )}
            <span className="text-[11px] text-[#8c7462] font-semibold">{Math.round(freeShippingProgress)}%</span>
          </div>
          <div className="w-full h-2 bg-white/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#df9335] to-[#c66624] transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Delivery / Pickup Switch */}
        <div className="px-6 pt-4">
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-white border border-[var(--border-card)] text-xs font-bold shadow-xs">
            <button
              onClick={() => setOrderType('delivery')}
              className={`py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
                orderType === 'delivery'
                  ? 'bg-[#c66624] text-white shadow-xs'
                  : 'text-[#8c7462] hover:text-[#24140b]'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Doorstep Delivery</span>
            </button>
            <button
              onClick={() => setOrderType('pickup')}
              className={`py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
                orderType === 'pickup'
                  ? 'bg-[#c66624] text-white shadow-xs'
                  : 'text-[#8c7462] hover:text-[#24140b]'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Cafe Pickup (Free)</span>
            </button>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3.5">
          {cart.length === 0 ? (
            <div className="text-center py-20 space-y-3">
              <ShoppingBag className="w-12 h-12 text-[#9c8574] mx-auto opacity-40" />
              <p className="text-sm font-bold text-[#24140b]">Your cart is currently empty</p>
              <p className="text-xs text-[#8c7462] max-w-xs mx-auto">
                Explore our sweet roasts or craft a bespoke drink in our interactive Coffee Lab.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-cream-soft text-xs mt-2"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-white border border-[var(--border-card)] flex gap-3.5 items-center shadow-xs"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover bg-[#f3ece1] border border-[var(--border-soft)] shrink-0"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-[#24140b] truncate">{item.name}</h4>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-stone-400 hover:text-red-600 p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {item.grind && (
                    <span className="text-[10px] text-[#c66624] block truncate font-semibold">
                      Grind: {item.grind}
                    </span>
                  )}

                  {item.customDetails && (
                    <div className="text-[10px] text-[#8c7462] space-y-0.5">
                      <span className="block truncate">
                        {item.customDetails.size} • {item.customDetails.milk}
                      </span>
                      <span className="block truncate text-[#8c4716] font-medium">
                        {item.customDetails.temperature} • {item.customDetails.caffeineMg}mg caffeine
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-extrabold text-[#24140b]">
                      ₹{Math.round(item.price * item.quantity)}
                    </span>

                    {/* Quantity Selector */}
                    <div className="flex items-center rounded-lg bg-[#faf6f0] border border-[var(--border-soft)]">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2 py-0.5 text-xs text-[#8c7462] hover:text-[#24140b]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-[#24140b]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2 py-0.5 text-xs text-[#8c7462] hover:text-[#24140b]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Promo & Checkout Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[var(--border-soft)] bg-white space-y-4 shadow-lg">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-[#9c8574] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Promo code (WELCOME15, BEANS20)"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#faf6f0] border border-[var(--border-card)] text-xs text-[#24140b] uppercase placeholder-[#9c8574] focus:outline-none focus:border-[#c66624]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#f5ede3] hover:bg-[#c66624] text-[#8c4716] hover:text-white border border-[var(--border-card)] transition-colors"
              >
                Apply
              </button>
            </form>

            {appliedPromo && (
              <div className="flex items-center justify-between text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 font-semibold">
                <span>Code <strong>{appliedPromo}</strong> applied</span>
                <span>-₹{Math.round(promoDiscount)}</span>
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#614d3f]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{Math.round(subtotal)}</span>
              </div>

              {promoDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Promo Discount</span>
                  <span>-₹{Math.round(promoDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
              </div>

              <div className="flex justify-between font-bold text-base text-[#24140b] pt-2 border-t border-stone-200/60">
                <span>Total Amount</span>
                <span className="font-serif text-[#c66624] text-xl">₹{Math.round(total)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleProceedToCheckout}
              className="btn-caramel w-full py-3.5 text-sm font-bold shadow-lg flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
