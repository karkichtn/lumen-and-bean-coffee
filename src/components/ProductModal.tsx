'use client';

import React, { useState } from 'react';
import { useCoffeeStore } from '@/lib/store';
import {
  X,
  Star,
  Check,
  ShoppingBag,
  MapPin,
  Compass,
  MessageSquarePlus,
} from 'lucide-react';

export default function ProductModal() {
  const { activeProduct, setActiveProduct, addToCart, reviews, addReview } = useCoffeeStore();
  const [selectedGrind, setSelectedGrind] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isWritingReview, setIsWritingReview] = useState<boolean>(false);

  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewTag, setReviewTag] = useState('');

  if (!activeProduct) return null;

  const currentGrind = selectedGrind || activeProduct.grindOptions[0] || 'Whole Bean';
  const productReviews = reviews.filter((r) => r.productId === activeProduct.id);

  const handleAddToCart = () => {
    addToCart({
      productId: activeProduct.id,
      name: activeProduct.name,
      price: activeProduct.price,
      quantity: quantity,
      imageUrl: activeProduct.imageUrl,
      grind: currentGrind,
    });
    setActiveProduct(null);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;

    await addReview({
      productId: activeProduct.id,
      authorName: reviewName,
      rating: reviewRating,
      title: reviewTitle || 'Exceptional Cup',
      comment: reviewComment,
      tastingTags: reviewTag ? reviewTag.split(',').map((t) => t.trim()) : ['Artisan Roasting'],
      isVerifiedBuyer: true,
    });

    setIsWritingReview(false);
    setReviewName('');
    setReviewTitle('');
    setReviewComment('');
    setReviewTag('');
  };

  return (
    <div className="modal-overlay" onClick={() => setActiveProduct(null)}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-content relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#faf6f0] rounded-[32px] border border-[var(--border-card)] shadow-2xl p-8 sm:p-10 space-y-8 text-[#5a4537]"
      >
        {/* Close Button */}
        <button
          onClick={() => setActiveProduct(null)}
          className="absolute top-6 right-6 z-20 p-2.5 rounded-full bg-white text-[#8c4716] hover:text-[#24140b] border border-[var(--border-soft)] shadow-sm hover:scale-105 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Section: Image & Main Details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 items-start">
          {/* Product Image Frame */}
          <div className="md:col-span-5 relative rounded-3xl overflow-hidden bg-[#f3ece1] border border-[var(--border-card)] h-80 sm:h-[400px] shadow-sm">
            <img
              src={activeProduct.imageUrl}
              alt={activeProduct.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#24140b]/60 via-transparent to-transparent opacity-75" />

            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#c66624] text-white shadow-md">
                {activeProduct.roastLevel} Roast
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
              <span className="bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#df9335]" />
                {activeProduct.origin}
              </span>
            </div>
          </div>

          {/* Product Info & Order Configuration */}
          <div className="md:col-span-7 space-y-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-sm font-bold text-[#c66624]">
                  <Star className="w-4 h-4 fill-[#df9335] text-[#df9335]" />
                  <span>{activeProduct.rating}</span>
                </div>
                <span className="text-xs text-[#9c8574]">
                  ({activeProduct.reviewsCount} customer reviews)
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#24140b]">
                {activeProduct.name}
              </h2>
              <p className="text-sm text-[#8c4716] font-semibold">
                {activeProduct.shortDescription}
              </p>
            </div>

            {/* Price Banner in ₹ */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-3xl sm:text-4xl font-serif font-extrabold text-[#24140b]">
                ₹{activeProduct.price * quantity}
              </span>
              <span className="text-xs text-[#9c8574]">
                (₹{activeProduct.price} / 250g bag)
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#614d3f] leading-relaxed">
              {activeProduct.description}
            </p>

            {/* Tasting Notes */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#24140b] tracking-wider uppercase">
                Tasting Notes:
              </label>
              <div className="flex flex-wrap gap-2">
                {activeProduct.tastingNotes.map((note) => (
                  <span
                    key={note}
                    className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#f5ede3] text-[#8c4716] border border-[var(--border-card)]"
                  >
                    ✨ {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Grind Option Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#24140b] tracking-wider uppercase flex items-center justify-between">
                <span>Select Grind Setting:</span>
                <span className="text-[#c66624] font-normal lowercase">{currentGrind}</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {activeProduct.grindOptions.map((grind) => {
                  const isSelected = currentGrind === grind;
                  return (
                    <button
                      key={grind}
                      onClick={() => setSelectedGrind(grind)}
                      className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#c66624] text-white shadow-sm'
                          : 'bg-white text-[#5a4537] hover:text-[#24140b] border border-[var(--border-soft)]'
                      }`}
                    >
                      <span className="truncate">{grind}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="pt-3 flex items-center gap-4">
              <div className="flex items-center rounded-2xl bg-white border border-[var(--border-card)] p-1 shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-xl text-sm font-bold text-[#5a4537] hover:text-[#24140b] hover:bg-[#faf6f0] transition-colors flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-sm text-[#24140b]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 rounded-xl text-sm font-bold text-[#5a4537] hover:text-[#24140b] hover:bg-[#faf6f0] transition-colors flex items-center justify-center"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn-caramel flex-1 py-4 text-sm font-bold shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart • ₹{activeProduct.price * quantity}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Specs & Agronomy Table */}
        <div className="pt-6 border-t border-[var(--border-soft)] space-y-4">
          <h3 className="font-serif text-lg font-bold text-[#24140b] flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#c66624]" />
            Agronomy & Micro-Lot Details
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-2xl bg-white border border-[var(--border-soft)] shadow-xs">
              <span className="text-[11px] text-[#9c8574] block">Origin / Region</span>
              <span className="text-xs font-bold text-[#24140b] mt-1 block">
                {activeProduct.origin}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[var(--border-soft)] shadow-xs">
              <span className="text-[11px] text-[#9c8574] block">Elevation</span>
              <span className="text-xs font-bold text-[#24140b] mt-1 block">
                {activeProduct.altitude || '1,800 – 2,200m'}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[var(--border-soft)] shadow-xs">
              <span className="text-[11px] text-[#9c8574] block">Processing</span>
              <span className="text-xs font-bold text-[#24140b] mt-1 block">
                {activeProduct.process || 'Fully Washed'}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[var(--border-soft)] shadow-xs">
              <span className="text-[11px] text-[#9c8574] block">Roast Profile</span>
              <span className="text-xs font-bold text-[#c66624] mt-1 block">
                {activeProduct.roastLevel} Roast
              </span>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="pt-6 border-t border-[var(--border-soft)] space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-[#24140b] flex items-center gap-2">
              <Star className="w-5 h-5 text-[#df9335] fill-[#df9335]" />
              Cupping Impressions & Reviews ({productReviews.length})
            </h3>
            <button
              onClick={() => setIsWritingReview(!isWritingReview)}
              className="text-xs font-bold text-[#c66624] hover:underline flex items-center gap-1.5"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#c66624]" />
              {isWritingReview ? 'Cancel Review' : 'Write a Review'}
            </button>
          </div>

          {/* Write Review Form */}
          {isWritingReview && (
            <form
              onSubmit={handleReviewSubmit}
              className="p-6 rounded-3xl bg-white border border-[var(--border-card)] space-y-4 shadow-sm animate-fadeIn"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#5a4537] font-semibold block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="e.g. Vikram Singhania"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#faf6f0] border border-[var(--border-card)] text-xs text-[#24140b] focus:outline-none focus:border-[#c66624]"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#5a4537] font-semibold block mb-1">Rating Score</label>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#faf6f0] border border-[var(--border-card)] text-xs text-[#24140b] focus:outline-none focus:border-[#c66624]"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5.0 Exceptional)</option>
                    <option value={4}>⭐⭐⭐⭐ (4.0 Great)</option>
                    <option value={3}>⭐⭐⭐ (3.0 Good)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-[#5a4537] font-semibold block mb-1">Review Headline</label>
                <input
                  type="text"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="e.g. Remarkable clarity and floral notes on V60"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#faf6f0] border border-[var(--border-card)] text-xs text-[#24140b] focus:outline-none focus:border-[#c66624]"
                />
              </div>

              <div>
                <label className="text-xs text-[#5a4537] font-semibold block mb-1">Detailed Tasting Impression</label>
                <textarea
                  required
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Describe your brew method, grind size, and aroma..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#faf6f0] border border-[var(--border-card)] text-xs text-[#24140b] focus:outline-none focus:border-[#c66624]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsWritingReview(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#9c8574] hover:text-[#24140b]"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-caramel text-xs py-2.5 px-6">
                  Submit Review
                </button>
              </div>
            </form>
          )}

          {/* Reviews List */}
          <div className="space-y-3.5">
            {productReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-4 rounded-2xl bg-white border border-[var(--border-soft)] space-y-2 shadow-xs"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#24140b]">{rev.authorName}</span>
                    {rev.isVerifiedBuyer && (
                      <span className="text-[10px] text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full border border-emerald-300/40 font-semibold">
                        ✓ Verified Buyer
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-[#df9335]">
                    {'★'.repeat(rev.rating)}
                  </div>
                </div>
                <p className="text-xs font-bold text-[#8c4716]">{rev.title}</p>
                <p className="text-xs text-[#614d3f] leading-relaxed">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
