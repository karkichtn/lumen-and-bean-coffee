'use client';

import React, { useState } from 'react';
import { useCoffeeStore } from '@/lib/store';
import {
  X,
  CheckCircle2,
  Ticket,
} from 'lucide-react';

const TIME_SLOTS = [
  '09:00 AM',
  '10:30 AM',
  '12:00 PM',
  '02:00 PM',
  '03:30 PM',
  '05:00 PM',
  '06:30 PM',
];

export default function ReservationModal() {
  const { isReservationOpen, setIsReservationOpen, createReservation } = useCoffeeStore();

  const [experienceType, setExperienceType] = useState<
    'Table Reservation' | 'Cupping Masterclass' | 'Barista Pour-Over Lab'
  >('Table Reservation');

  const [locationName, setLocationName] = useState('Downtown Roastery & Flagship Lab');
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[1]);
  const [partySize, setPartySize] = useState(2);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const [confirmedCode, setConfirmedCode] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isReservationOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    setIsSubmitting(true);
    const bookingCode = await createReservation({
      guestName: name,
      guestEmail: email,
      guestPhone: phone,
      experienceType,
      locationName,
      reservationDate: date,
      timeSlot,
      partySize,
      specialRequests: notes,
      status: 'confirmed',
    });

    setIsSubmitting(false);
    setConfirmedCode(bookingCode);
  };

  const handleClose = () => {
    setIsReservationOpen(false);
    setConfirmedCode(null);
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-content relative w-full max-w-2xl bg-[#faf6f0] rounded-[32px] border border-[var(--border-card)] shadow-2xl p-8 sm:p-10 space-y-7 max-h-[92vh] overflow-y-auto text-[#5a4537]"
      >
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white text-[#8c7462] hover:text-[#24140b] border border-[var(--border-soft)] shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedCode ? (
          <div className="text-center space-y-6 py-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center mx-auto p-3.5">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#c66624] tracking-widest uppercase">
                Reservation Confirmed
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#24140b]">
                We Look Forward to Welcoming You
              </h2>
              <p className="text-xs sm:text-sm text-[#614d3f] max-w-md mx-auto leading-relaxed">
                A confirmation with calendar invite and cupping notes has been dispatched to{' '}
                <span className="text-[#8c4716] font-bold">{email}</span>.
              </p>
            </div>

            {/* Ticket Card */}
            <div className="p-6 rounded-3xl bg-white border border-[var(--border-card)] text-left space-y-4 max-w-md mx-auto shadow-sm">
              <div className="flex items-center justify-between border-b border-stone-200/60 pb-3">
                <div className="flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-[#c66624]" />
                  <span className="font-serif font-bold text-[#24140b] text-sm">
                    {experienceType}
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-white bg-[#c66624] px-3 py-0.5 rounded-full">
                  {confirmedCode}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-[#614d3f]">
                <div>
                  <span className="text-[11px] text-[#9c8574] block">Date & Time:</span>
                  <span className="font-bold text-[#24140b] mt-0.5 block">{date} at {timeSlot}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#9c8574] block">Guests:</span>
                  <span className="font-bold text-[#24140b] mt-0.5 block">{partySize} Guest{partySize > 1 ? 's' : ''}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[11px] text-[#9c8574] block">Location:</span>
                  <span className="font-bold text-[#24140b] mt-0.5 block">{locationName}</span>
                </div>
              </div>
            </div>

            <button onClick={handleClose} className="btn-caramel px-8 py-3 text-xs font-bold">
              Done & Return to Menu
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#c66624] uppercase tracking-widest">
                Artisan Hospitality
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#24140b]">
                Book a Table or Masterclass
              </h2>
              <p className="text-xs sm:text-sm text-[#614d3f] leading-relaxed">
                Reserve a quiet cafe workspace or join an immersive sensory cupping workshop led by our certified Q-graders.
              </p>
            </div>

            {/* Experience Selection */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-[#24140b] uppercase tracking-wider">
                Select Experience
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'Table Reservation', title: 'Table Booking', badge: 'Complimentary' },
                  { id: 'Cupping Masterclass', title: 'Cupping Masterclass', badge: '₹999 / person' },
                  { id: 'Barista Pour-Over Lab', title: 'Pour-Over Lab', badge: '₹799 / person' },
                ].map((exp) => {
                  const isSelected = experienceType === exp.id;
                  return (
                    <button
                      type="button"
                      key={exp.id}
                      onClick={() => setExperienceType(exp.id as any)}
                      className={`p-3.5 rounded-2xl text-left border transition-all ${
                        isSelected
                          ? 'bg-[#fceddb] border-[#c66624] text-[#24140b] shadow-xs'
                          : 'bg-white text-[#5a4537] border-[var(--border-soft)] hover:bg-[#faf6f0]'
                      }`}
                    >
                      <span className="text-xs font-bold block">{exp.title}</span>
                      <span className="text-[10px] text-[#8c4716] block mt-1 font-semibold">{exp.badge}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Location Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#24140b] uppercase tracking-wider">
                Select Cafe Location
              </label>
              <select
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-white border border-[var(--border-card)] text-xs text-[#24140b] focus:outline-none focus:border-[#c66624]"
              >
                <option value="Downtown Roastery & Flagship Lab">Downtown Roastery & Flagship Lab (Indiranagar, Bangalore)</option>
                <option value="Waterfront Pavilion & Espresso Bar">Waterfront Pavilion & Espresso Bar (Bandra West, Mumbai)</option>
                <option value="The Mission Sanctuary & Slow Bar">The Mission Sanctuary & Slow Bar (Mehrauli, New Delhi)</option>
              </select>
            </div>

            {/* Date, Time & Party Size Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="text-xs font-bold text-[#24140b] uppercase tracking-wider block mb-1">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[var(--border-card)] text-xs text-[#24140b] focus:outline-none focus:border-[#c66624]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#24140b] uppercase tracking-wider block mb-1">
                  Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[var(--border-card)] text-xs text-[#24140b] focus:outline-none focus:border-[#c66624]"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#24140b] uppercase tracking-wider block mb-1">
                  Party Size
                </label>
                <select
                  value={partySize}
                  onChange={(e) => setPartySize(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[var(--border-card)] text-xs text-[#24140b] focus:outline-none focus:border-[#c66624]"
                >
                  {[1, 2, 3, 4, 5, 6, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Guest Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="text-xs text-[#5a4537] font-semibold block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maya Sharma"
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[var(--border-card)] text-xs text-[#24140b] placeholder-[#9c8574] focus:outline-none focus:border-[#c66624]"
                />
              </div>
              <div>
                <label className="text-xs text-[#5a4537] font-semibold block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="maya@example.com"
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[var(--border-card)] text-xs text-[#24140b] placeholder-[#9c8574] focus:outline-none focus:border-[#c66624]"
                />
              </div>
              <div>
                <label className="text-xs text-[#5a4537] font-semibold block mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[var(--border-card)] text-xs text-[#24140b] placeholder-[#9c8574] focus:outline-none focus:border-[#c66624]"
                />
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="text-xs text-[#5a4537] font-semibold block mb-1">Special Requests (Optional)</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Dietary preferences, seating preference, birthday cupping..."
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-[var(--border-card)] text-xs text-[#24140b] placeholder-[#9c8574] focus:outline-none focus:border-[#c66624]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-caramel w-full py-3.5 text-sm font-bold shadow-lg"
            >
              <span>{isSubmitting ? 'Confirming with Roastery...' : 'Confirm Experience Booking'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
