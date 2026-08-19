'use client';

import React, { useState } from 'react';
import { useCoffeeStore } from '@/lib/store';
import confetti from 'canvas-confetti';
import {
  X,
  CreditCard,
  Lock,
  CheckCircle2,
  Receipt,
} from 'lucide-react';

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    promoDiscount,
    shippingFee,
    total,
    orderType,
    submitOrder,
  } = useCoffeeStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [notes, setNotes] = useState('');

  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    orderNumber: string;
    date: string;
    total: number;
    email: string;
  } | null>(null);

  if (!isCheckoutOpen) return null;

  const handleFillDemoData = () => {
    setName('Kabir Malhotra');
    setEmail('kabir.malhotra@coffee-connoisseur.in');
    setPhone('+91 98200 12345');
    setAddress('Penthouse 14B, Altamount Road, Mumbai, Maharashtra 400026');
    setCardNumber('4242 8888 9999 4242');
    setCardExp('08/29');
    setCardCvc('789');
    setNotes('Please ring bell 14B and leave package at concierge.');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1400));

    const result = await submitOrder({
      name,
      email,
      phone,
      address,
      notes,
    });

    setIsProcessing(false);

    if (result.success) {
      setCompletedOrder({
        orderNumber: result.orderNumber,
        date: new Date().toLocaleDateString('en-IN', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        total,
        email,
      });

      try {
        confetti({
          particleCount: 130,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#df9335', '#c66624', '#fceddb', '#4a7259'],
        });
      } catch (err) {
        console.log('Confetti trigger', err);
      }
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setCompletedOrder(null);
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-content relative w-full max-w-3xl bg-[#faf6f0] rounded-[32px] border border-[var(--border-card)] shadow-2xl p-8 sm:p-10 space-y-7 max-h-[92vh] overflow-y-auto text-[#5a4537]"
      >
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white text-[#8c7462] hover:text-[#24140b] border border-[var(--border-soft)] shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        {completedOrder ? (
          <div className="text-center space-y-6 py-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center mx-auto p-3.5">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#c66624] tracking-widest uppercase">
                Payment & Order Confirmed
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#24140b]">
                Fresh Roast Dispatched Soon!
              </h2>
              <p className="text-xs sm:text-sm text-[#614d3f] max-w-md mx-auto leading-relaxed">
                Thank you, {name || 'Coffee Purist'}! An itemized receipt and live roast tracking link have been dispatched to{' '}
                <span className="text-[#8c4716] font-bold">{completedOrder.email}</span>.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="p-6 rounded-3xl bg-white border border-[var(--border-card)] text-left space-y-4 max-w-md mx-auto shadow-sm">
              <div className="flex items-center justify-between border-b border-stone-200/60 pb-3">
                <div className="flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-[#c66624]" />
                  <span className="font-serif font-bold text-[#24140b] text-sm">
                    LUMEN & BEAN INVOICE
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-[#8c4716] bg-[#fceddb] px-2.5 py-0.5 rounded-full">
                  {completedOrder.orderNumber}
                </span>
              </div>

              <div className="space-y-2 text-xs text-[#614d3f]">
                <div className="flex justify-between">
                  <span>Order Date:</span>
                  <span className="text-[#24140b] font-semibold">{completedOrder.date}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fulfillment:</span>
                  <span className="text-[#24140b] font-semibold capitalize">{orderType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="text-[#24140b] font-semibold">Encrypted Card (•••• 4242)</span>
                </div>
                <div className="pt-2.5 border-t border-stone-200/60 flex justify-between font-bold text-sm text-[#24140b]">
                  <span>Total Paid:</span>
                  <span className="text-[#c66624] text-base">₹{Math.round(completedOrder.total)}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-2">
              <button
                onClick={() => window.print()}
                className="btn-cream-soft text-xs px-6"
              >
                Print Receipt
              </button>
              <button onClick={handleClose} className="btn-caramel text-xs px-8">
                Continue Exploring
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200/60 pb-4">
              <div>
                <span className="text-xs font-bold text-[#c66624] uppercase tracking-widest flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  256-Bit SSL Encrypted Checkout
                </span>
                <h2 className="text-2xl font-serif font-bold text-[#24140b] mt-1">
                  Complete Your Coffee Order
                </h2>
              </div>

              <button
                type="button"
                onClick={handleFillDemoData}
                className="text-xs font-bold text-[#8c4716] hover:text-[#24140b] bg-white border border-[var(--border-card)] px-3.5 py-1.5 rounded-xl self-start sm:self-auto shadow-xs"
              >
                ⚡ Auto-Fill Demo Info
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-7 items-start">
              {/* Customer & Shipping Inputs (7 cols) */}
              <div className="md:col-span-7 space-y-4">
                <h3 className="text-xs font-bold text-[#24140b] uppercase tracking-wider">
                  1. Contact & Fulfillment
                </h3>

                <div>
                  <label className="text-xs text-[#5a4537] font-semibold block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Kabir Malhotra"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[var(--border-card)] text-xs text-[#24140b] placeholder-[#9c8574] focus:outline-none focus:border-[#c66624]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-[#5a4537] font-semibold block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="kabir@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[var(--border-card)] text-xs text-[#24140b] placeholder-[#9c8574] focus:outline-none focus:border-[#c66624]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#5a4537] font-semibold block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98200 12345"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[var(--border-card)] text-xs text-[#24140b] placeholder-[#9c8574] focus:outline-none focus:border-[#c66624]"
                    />
                  </div>
                </div>

                {orderType === 'delivery' && (
                  <div>
                    <label className="text-xs text-[#5a4537] font-semibold block mb-1">Delivery Address</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Street address, Floor / Suite, City, PIN Code"
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[var(--border-card)] text-xs text-[#24140b] placeholder-[#9c8574] focus:outline-none focus:border-[#c66624]"
                    />
                  </div>
                )}

                {/* Payment Section */}
                <h3 className="text-xs font-bold text-[#24140b] uppercase tracking-wider pt-2">
                  2. Payment Method
                </h3>

                <div className="p-4 rounded-2xl bg-white border border-[var(--border-card)] space-y-3 shadow-xs">
                  <div>
                    <label className="text-xs text-[#5a4537] font-semibold block mb-1">Card Number</label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-[#9c8574] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4242 4242 4242 4242"
                        className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#faf6f0] border border-[var(--border-soft)] text-xs text-[#24140b] focus:outline-none focus:border-[#c66624]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-[#5a4537] font-semibold block mb-1">Exp Date</label>
                      <input
                        type="text"
                        required
                        value={cardExp}
                        onChange={(e) => setCardExp(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 rounded-lg bg-[#faf6f0] border border-[var(--border-soft)] text-xs text-[#24140b] focus:outline-none focus:border-[#c66624]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#5a4537] font-semibold block mb-1">CVC / Security</label>
                      <input
                        type="text"
                        required
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="CVC"
                        className="w-full px-3 py-2 rounded-lg bg-[#faf6f0] border border-[var(--border-soft)] text-xs text-[#24140b] focus:outline-none focus:border-[#c66624]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-[#5a4537] font-semibold block mb-1">Roasting / Delivery Notes (Optional)</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Gate directions, roast preference details, special packing..."
                    className="w-full px-4 py-2 rounded-xl bg-white border border-[var(--border-card)] text-xs text-[#24140b] placeholder-[#9c8574] focus:outline-none focus:border-[#c66624]"
                  />
                </div>
              </div>

              {/* Order Summary in ₹ (5 cols) */}
              <div className="md:col-span-5 p-5 rounded-2xl bg-white border border-[var(--border-card)] space-y-4 shadow-sm">
                <h3 className="font-serif text-base font-bold text-[#24140b] flex items-center justify-between">
                  <span>Order Items ({cart.length})</span>
                  <span className="text-xs text-[#c66624] font-sans font-bold capitalize">{orderType}</span>
                </h3>

                <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-xs text-[#614d3f]">
                      <span className="truncate pr-2">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-bold text-[#24140b]">
                        ₹{Math.round(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-stone-200/60 space-y-1.5 text-xs text-[#614d3f]">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{Math.round(subtotal)}</span>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Promo Discount:</span>
                      <span>-₹{Math.round(promoDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                  </div>
                  <div className="pt-2 border-t border-stone-200/60 flex justify-between font-bold text-base text-[#24140b]">
                    <span>Total:</span>
                    <span className="text-[#c66624] text-lg font-serif">₹{Math.round(total)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="btn-caramel w-full py-3.5 text-xs sm:text-sm font-bold shadow-md flex items-center justify-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{isProcessing ? 'Authorizing Roastery Payment...' : `Authorize & Pay ₹${Math.round(total)}`}</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
