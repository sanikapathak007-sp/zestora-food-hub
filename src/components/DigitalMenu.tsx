import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Plus, Wine, Flame, Clock, RotateCcw, Utensils, Sparkles } from 'lucide-react';
import { MenuItem, CategoryId } from '../types';
import { MENU_ITEMS, CATEGORIES, DIETARY_FILTERS } from '../data/menuData';
import { playChime } from '../utils/audio';
import { formatINR } from '../utils/format';

interface DigitalMenuProps {
  onAddToCart: (item: MenuItem) => void;
  onViewDetails: (item: MenuItem) => void;
}

export const DigitalMenu: React.FC<DigitalMenuProps> = ({
  onAddToCart,
  onViewDetails
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [selectedDiet, setSelectedDiet] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'calories'>('featured');

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Dietary filter
      if (selectedDiet !== 'All' && !item.tags.includes(selectedDiet as any)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesHindi = (item.hindiTitle || '').toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesPairing = item.pairing.toLowerCase().includes(query);
        if (!matchesName && !matchesHindi && !matchesDesc && !matchesPairing) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'calories') return a.calories - b.calories;
      return 0; // featured default
    });
  }, [selectedCategory, selectedDiet, searchQuery, sortBy]);

  const resetFilters = () => {
    playChime('click');
    setSelectedCategory('all');
    setSelectedDiet('All');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <section className="py-12 bg-zinc-950 border-t border-amber-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
              <Utensils className="w-3.5 h-3.5" />
              <span>Innovation Feature 02 · Gastronomic Repertoire</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-zinc-100 font-medium tracking-tight mb-2">
              Interactive Digital Menu
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl">
              Signature courses crafted with regional Indian & global provenance. Filter by dietary discipline (Jain, Vegetarian, Vegan), explore cellar pairings, or inspect sensory notes.
            </p>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dish, saffron, guchhi, wine..."
                className="w-full sm:w-72 pl-9 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-zinc-300"
                >
                  ✕
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-zinc-300 focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="featured">Sort: Chef Selection</option>
              <option value="price-low">Price: Low to High (₹)</option>
              <option value="price-high">Price: High to Low (₹)</option>
              <option value="calories">Lowest Calorie</option>
            </select>
          </div>
        </div>

        {/* Category Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none border-b border-zinc-800/60">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  playChime('click');
                  setSelectedCategory(cat.id as CategoryId);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-zinc-950 font-semibold shadow-md shadow-amber-500/20'
                    : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 border border-zinc-800/80'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Dietary Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs font-mono uppercase text-zinc-500 mr-1 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3" />
            <span>Diet:</span>
          </span>
          {DIETARY_FILTERS.map((diet) => {
            const isActive = selectedDiet === diet;
            return (
              <button
                key={diet}
                onClick={() => {
                  playChime('click');
                  setSelectedDiet(diet);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-zinc-800 text-amber-400 border border-amber-500/50 font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 border border-zinc-800/60 hover:border-zinc-700 bg-zinc-900/40'
                }`}
              >
                {diet}
              </button>
            );
          })}
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          /* Empty State */
          <div className="py-20 text-center rounded-2xl bg-zinc-900/30 border border-zinc-800/60 p-8">
            <div className="w-12 h-12 rounded-full bg-zinc-800/80 text-zinc-400 flex items-center justify-center mx-auto mb-4">
              <Utensils className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-zinc-200 font-medium mb-2">
              No matching culinary dishes found
            </h3>
            <p className="text-zinc-500 text-xs sm:text-sm max-w-sm mx-auto mb-6">
              We couldn't find any dishes matching your active search and filter combinations in our current tasting rotation.
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-amber-400 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isVeg = item.tags.includes('Vegetarian') || item.tags.includes('Jain Friendly') || item.tags.includes('Vegan');
              return (
                <div
                  key={item.id}
                  className="group rounded-2xl bg-gradient-to-b from-zinc-900/60 to-zinc-950 border border-zinc-800/80 hover:border-amber-500/50 transition-all flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-amber-500/5"
                >
                  {/* Visual Slot */}
                  <div
                    onClick={() => {
                      playChime('click');
                      onViewDetails(item);
                    }}
                    className="relative aspect-[4/3] w-full bg-zinc-900 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-transparent to-transparent pointer-events-none" />

                    {/* Top tags with Indian dietary icons */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {/* Standard Indian Veg/Non-Veg Mark */}
                        <div
                          className={`w-4 h-4 rounded-sm border flex items-center justify-center p-0.5 bg-zinc-950/90 ${
                            isVeg ? 'border-emerald-500' : 'border-red-500'
                          }`}
                          title={isVeg ? 'Vegetarian / Satvik' : 'Non-Vegetarian'}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isVeg ? 'bg-emerald-500' : 'bg-red-500'
                            }`}
                          />
                        </div>

                        {item.tags.includes('Chef Special') && (
                          <span className="px-2 py-0.5 rounded bg-amber-500 text-zinc-950 font-bold text-[10px] uppercase font-mono shadow-sm">
                            Signature
                          </span>
                        )}
                        {item.tags.includes('Jain Friendly') && (
                          <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-amber-300 text-[10px] font-mono">
                            Jain Satvik
                          </span>
                        )}
                        {item.tags.includes('Vegan') && (
                          <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono">
                            Vegan
                          </span>
                        )}
                      </div>

                      {item.spiciness > 0 && (
                        <span className="px-2 py-0.5 rounded bg-red-950/80 border border-red-500/40 text-red-300 text-[10px] font-mono flex items-center gap-1">
                          <Flame className="w-3 h-3 fill-red-400" />
                          <span>Spicy</span>
                        </span>
                      )}
                    </div>

                    {/* Metadata bottom overlay with Hindi name */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-[11px] font-mono text-zinc-300">
                      <div>
                        {item.hindiTitle && (
                          <span className="text-[10px] text-amber-400/90 font-sans block mb-0.5">
                            {item.hindiTitle}
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-zinc-300">
                          <Clock className="w-3 h-3 text-zinc-400" />
                          <span>{item.prepTime}</span>
                          <span aria-hidden="true" className="text-zinc-600">·</span>
                          <span>{item.calories} cal</span>
                        </span>
                      </div>

                      {item.sensory && (
                        <span className="text-[10px] font-sans text-zinc-400 bg-zinc-950/80 px-2 py-0.5 rounded border border-zinc-800">
                          {item.sensory.signatureNote}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-baseline justify-between mb-2">
                        <h3
                          onClick={() => {
                            playChime('click');
                            onViewDetails(item);
                          }}
                          className="font-serif text-lg font-medium text-zinc-100 group-hover:text-amber-400 transition-colors cursor-pointer"
                        >
                          {item.name}
                        </h3>
                        <span className="text-base font-mono font-bold text-amber-400 tabular-nums ml-2 whitespace-nowrap">
                          {formatINR(item.price)}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-400 leading-relaxed mb-4 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Cellar Pairing Snippet */}
                      <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 pt-3 border-t border-zinc-800/60 mb-4">
                        <Wine className="w-3 h-3 text-amber-400 shrink-0" />
                        <span className="truncate">Pair: {item.pairing}</span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => {
                          playChime('click');
                          onViewDetails(item);
                        }}
                        className="flex-1 py-2 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-300 transition-colors text-center cursor-pointer"
                      >
                        Details & Options
                      </button>

                      <button
                        onClick={() => {
                          playChime('success');
                          onAddToCart(item);
                        }}
                        className="py-2 px-3.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-xs font-semibold text-zinc-950 transition-colors flex items-center gap-1 cursor-pointer active:scale-95 shadow-sm"
                        aria-label={`Add ${item.name} to cart`}
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Add</span>
                      </button>
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
};
