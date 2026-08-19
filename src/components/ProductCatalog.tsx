'use client';

import React, { useMemo } from 'react';
import { useCoffeeStore } from '@/lib/store';
import { CATEGORIES } from '@/lib/coffeeData';
import {
  Search,
  SlidersHorizontal,
  Plus,
  Flame,
  Globe,
  Sparkles,
  Snowflake,
  Croissant,
  Sliders,
  Star,
  Coffee,
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Coffee: <Coffee className="w-4 h-4" />,
  Globe: <Globe className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  Flame: <Flame className="w-4 h-4" />,
  Snowflake: <Snowflake className="w-4 h-4" />,
  Croissant: <Croissant className="w-4 h-4" />,
  Sliders: <Sliders className="w-4 h-4" />,
};

const ROAST_OPTIONS = [
  { id: 'all', label: 'All Roast Profiles' },
  { id: 'Light', label: 'Light Roast' },
  { id: 'Medium', label: 'Medium Roast' },
  { id: 'Dark', label: 'Dark Roast' },
  { id: 'Cold Draft', label: 'Cold Brew & Nitro' },
  { id: 'Bakery', label: 'Bakery' },
  { id: 'Equipment', label: 'Brew Gear' },
];

export default function ProductCatalog() {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    selectedRoast,
    setSelectedRoast,
    setActiveProduct,
    addToCart,
  } = useCoffeeStore();

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== 'all' && p.categorySlug !== selectedCategory) {
        return false;
      }
      if (selectedRoast !== 'all' && p.roastLevel !== selectedRoast) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesOrigin = p.origin.toLowerCase().includes(q);
        const matchesNotes = p.tastingNotes.some((t) => t.toLowerCase().includes(q));
        const matchesDesc = p.description.toLowerCase().includes(q);
        if (!matchesName && !matchesOrigin && !matchesNotes && !matchesDesc) {
          return false;
        }
      }
      return true;
    });
  }, [products, selectedCategory, selectedRoast, searchQuery]);

  return (
    <section id="catalog" className="py-28 sm:py-36 lg:py-44 bg-[#f6efe6] relative border-t border-[var(--border-soft)]">
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-16 2xl:px-20 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold bg-[#fceddb] text-[#8c4716] border border-[#e8d7c3] uppercase tracking-widest">
            Handcrafted Offerings
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#24140b]">
            The Artisan Coffee Menu
          </h2>
          <p className="text-base sm:text-lg text-[#614d3f] leading-relaxed">
            Carefully curated seasonal harvests, freshly roasted in small 5kg micro-batches to highlight singular terroir and natural sweetness.
          </p>
        </div>

        {/* Filter Bar & Search Container */}
        <div className="space-y-6 bg-white p-7 sm:p-9 rounded-[32px] border border-[var(--border-card)] shadow-soft">
          {/* Categories Pill Bar & Search */}
          <div className="flex flex-col xl:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 overflow-x-auto w-full xl:w-auto pb-2 xl:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`flex items-center gap-2.5 px-5 py-3 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-[#c66624] text-white shadow-md shadow-[#c66624]/20'
                        : 'bg-[#faf6f0] text-[#5a4537] hover:text-[#c66624] hover:bg-[#f3ece1] border border-[var(--border-soft)] shadow-2xs'
                    }`}
                  >
                    {CATEGORY_ICONS[cat.icon] || <Coffee className="w-4 h-4" />}
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Search Input Box */}
            <div className="relative w-full xl:w-80 shrink-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9c8574]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes, origin, roasts..."
                className="w-full pl-11 pr-4 py-3 rounded-full text-xs sm:text-sm bg-[#faf6f0] text-[#24140b] placeholder-[#9c8574] border border-[var(--border-card)] focus:outline-none focus:border-[#c66624] transition-colors shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#9c8574] hover:text-[#24140b]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Roast Level Filter Pills */}
          <div className="flex items-center gap-3 overflow-x-auto pt-4 border-t border-stone-200/60 pb-1">
            <span className="text-xs sm:text-sm text-[#8c7462] font-bold flex items-center gap-2 pl-1 pr-2">
              <SlidersHorizontal className="w-4 h-4 text-[#c66624]" />
              Roast Profile:
            </span>
            {ROAST_OPTIONS.map((roast) => {
              const isRoastActive = selectedRoast === roast.id;
              return (
                <button
                  key={roast.id}
                  onClick={() => setSelectedRoast(roast.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    isRoastActive
                      ? 'bg-[#c66624]/15 text-[#8c4716] border border-[#c66624]/40 font-bold shadow-2xs'
                      : 'bg-[#faf6f0] text-[#614d3f] hover:text-[#c66624] border border-[var(--border-soft)]'
                  }`}
                >
                  {roast.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid (Expands to 3 and 4 cols on wide screens to fill all space) */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[32px] border border-[var(--border-card)] space-y-4 shadow-sm">
            <Coffee className="w-14 h-14 text-[#9c8574] mx-auto opacity-50" />
            <h3 className="text-xl font-bold text-[#24140b]">No coffees match your selection</h3>
            <p className="text-sm text-[#8c7462] max-w-sm mx-auto">
              Try resetting your search query or choosing another roast profile to discover our roastery offerings.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedRoast('all');
                setSearchQuery('');
              }}
              className="btn-cream-soft text-sm mt-2"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 xl:gap-10">
            {filteredProducts.map((product) => {
              return (
                <div
                  key={product.id}
                  className="card-soft-luxe overflow-hidden flex flex-col group relative shadow-soft"
                >
                  {/* Image Header with Roast Badge */}
                  <div
                    onClick={() => setActiveProduct(product)}
                    className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#f3ece1] cursor-pointer"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#24140b]/60 via-transparent to-transparent opacity-70" />

                    {/* Top Tag Badges */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span
                        className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-md"
                        style={{
                          backgroundColor:
                            product.roastLevel === 'Light'
                              ? '#d97706'
                              : product.roastLevel === 'Medium'
                              ? '#c66624'
                              : product.roastLevel === 'Dark'
                              ? '#8c4716'
                              : '#482e1e',
                        }}
                      >
                        {product.roastLevel}
                      </span>
                      {product.isBestseller && (
                        <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#df9335] text-white shadow-md">
                          Bestseller
                        </span>
                      )}
                    </div>

                    {/* Rating Pill */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-white/95 backdrop-blur-md text-[#8c4716] border border-white/80 shadow-sm">
                      <Star className="w-3.5 h-3.5 fill-[#df9335] text-[#df9335]" />
                      <span>{product.rating}</span>
                    </div>

                    {/* Origin / Elevation Footer */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                      <span className="truncate max-w-[200px] font-semibold bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                        📍 {product.origin}
                      </span>
                      {product.altitude && (
                        <span className="text-[11px] bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg font-medium">{product.altitude}</span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <h3
                        onClick={() => setActiveProduct(product)}
                        className="font-serif text-xl font-bold text-[#24140b] group-hover:text-[#c66624] transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#614d3f] line-clamp-2 leading-relaxed">
                        {product.shortDescription}
                      </p>

                      {/* Tasting Notes Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {product.tastingNotes.slice(0, 3).map((note) => (
                          <span
                            key={note}
                            className="px-3 py-1 rounded-lg text-[11px] font-semibold bg-[#faf6f0] text-[#8c4716] border border-[var(--border-soft)]"
                          >
                            ✨ {note}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer with Price in ₹ and Actions */}
                    <div className="pt-4 border-t border-[var(--border-soft)] flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[11px] text-[#9c8574] block font-medium">Per 250g Bag</span>
                        <span className="text-2xl font-serif font-extrabold text-[#24140b]">
                          ₹{product.price}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <button
                          onClick={() => setActiveProduct(product)}
                          className="px-4 py-2 rounded-xl text-xs font-bold text-[#5a4537] hover:text-[#c66624] bg-[#faf6f0] hover:bg-[#f3ece1] border border-[var(--border-soft)] transition-colors"
                        >
                          Details
                        </button>
                        <button
                          onClick={() =>
                            addToCart({
                              productId: product.id,
                              name: product.name,
                              price: product.price,
                              quantity: 1,
                              imageUrl: product.imageUrl,
                              grind: product.grindOptions[0] || 'Whole Bean',
                            })
                          }
                          className="p-2.5 rounded-xl bg-[#c66624] hover:bg-[#ad5417] text-white hover:scale-105 transition-transform shadow-md shadow-[#c66624]/25"
                          title="Add to Cart"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
