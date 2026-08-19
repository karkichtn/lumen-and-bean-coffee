'use client';

import React, { useState } from 'react';
import { useCoffeeStore } from '@/lib/store';
import {
  Star,
  MessageSquarePlus,
} from 'lucide-react';

export default function ReviewsSection() {
  const { reviews, addReview, products } = useCoffeeStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [productId, setProductId] = useState(products[0]?.id || 'prod-1');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [tag, setTag] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    await addReview({
      productId,
      authorName: name,
      rating,
      title: title || 'Exceptional Micro-Lot',
      comment,
      tastingTags: tag ? tag.split(',').map((t) => t.trim()) : ['Artisan Craft'],
      isVerifiedBuyer: true,
    });

    setIsModalOpen(false);
    setName('');
    setTitle('');
    setComment('');
    setTag('');
  };

  return (
    <section className="py-28 sm:py-36 lg:py-44 bg-[#faf6f0] relative border-t border-[var(--border-soft)]">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16 2xl:px-20 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold bg-[#fceddb] text-[#8c4716] border border-[#e8d7c3] uppercase tracking-widest">
              <Star className="w-4 h-4 fill-[#df9335] text-[#df9335]" />
              Community Tasting Log
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#24140b]">
              Loved by Baristas & Coffee Purists
            </h2>
            <p className="text-base sm:text-lg text-[#614d3f] leading-relaxed">
              Read real cupping logs and aroma impressions from home brewers and specialty coffee judges across India.
            </p>
          </div>

          {/* Rating Score Card */}
          <div className="flex items-center gap-8 p-6 sm:p-7 rounded-3xl bg-white border border-[var(--border-card)] self-start md:self-auto shadow-soft">
            <div className="text-center">
              <span className="font-serif text-3xl sm:text-4xl font-extrabold text-[#24140b] block">
                4.9 / 5.0
              </span>
              <div className="flex items-center justify-center text-[#df9335] text-base mt-1">
                {'★'.repeat(5)}
              </div>
              <span className="text-xs text-[#9c8574] block mt-1 font-semibold">1,240+ Verified Reviews</span>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-caramel text-xs sm:text-sm py-3.5 px-6 shadow-sm"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid (Expands to 4 cols on wide screens) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reviews.slice(0, 8).map((rev) => {
            return (
              <div
                key={rev.id}
                className="card-soft-luxe p-7 flex flex-col justify-between space-y-5 shadow-soft"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center text-[#df9335]">
                      {'★'.repeat(rev.rating)}
                    </div>
                    {rev.isVerifiedBuyer && (
                      <span className="text-[10px] text-emerald-700 bg-emerald-100/80 px-3 py-0.5 rounded-full border border-emerald-200 font-semibold">
                        ✓ Verified
                      </span>
                    )}
                  </div>

                  <h4 className="font-serif text-base font-bold text-[#24140b] line-clamp-2">
                    "{rev.title}"
                  </h4>

                  <p className="text-xs sm:text-sm text-[#614d3f] leading-relaxed line-clamp-4">
                    {rev.comment}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {rev.tastingTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-[#faf6f0] text-[#8c4716] border border-[var(--border-soft)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200/60 flex items-center justify-between text-xs text-[#9c8574]">
                  <span className="font-bold text-[#24140b]">{rev.authorName}</span>
                  <span>{rev.createdAt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="modal-content relative w-full max-w-lg bg-[#faf6f0] rounded-[32px] border border-[var(--border-card)] shadow-2xl p-8 sm:p-10 space-y-6 max-h-[90vh] overflow-y-auto text-[#5a4537]"
          >
            <div className="flex items-center justify-between border-b border-stone-200/60 pb-3">
              <h3 className="font-serif text-2xl font-bold text-[#24140b]">
                Submit Tasting Impression
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-[#24140b]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#5a4537] block mb-1">Select Coffee Roast</label>
                <select
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[var(--border-card)] text-xs text-[#24140b] focus:outline-none focus:border-[#c66624]"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.roastLevel})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-semibold text-[#5a4537] block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Siddharth Rao"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[var(--border-card)] text-xs text-[#24140b] focus:outline-none focus:border-[#c66624]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#5a4537] block mb-1">Rating</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[var(--border-card)] text-xs text-[#24140b] focus:outline-none focus:border-[#c66624]"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5.0 Outstanding)</option>
                    <option value={4}>⭐⭐⭐⭐ (4.0 Great)</option>
                    <option value={3}>⭐⭐⭐ (3.0 Good)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#5a4537] block mb-1">Review Headline</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Unbelievable berry sweetness on Aeropress"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[var(--border-card)] text-xs text-[#24140b] focus:outline-none focus:border-[#c66624]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#5a4537] block mb-1">Tasting Notes & Impression</label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share aroma, acidity, mouthfeel, and extraction method..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[var(--border-card)] text-xs text-[#24140b] focus:outline-none focus:border-[#c66624]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#5a4537] block mb-1">Tasting Tags (comma separated)</label>
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="e.g. Jasmine, Honey, V60"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[var(--border-card)] text-xs text-[#24140b] focus:outline-none focus:border-[#c66624]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#9c8574] hover:text-[#24140b]"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-caramel text-xs py-2.5 px-6">
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
