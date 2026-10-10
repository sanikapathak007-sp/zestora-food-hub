import React, { useState, useMemo } from 'react';
import { Sparkles, Utensils, Wine, Check, ArrowRight, RotateCcw, Flame, IndianRupee } from 'lucide-react';
import { MenuItem, RecommendationPreferences } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { playChime } from '../utils/audio';
import { formatINR } from '../utils/format';

interface SmartRecommendationProps {
  onAddToCart: (item: MenuItem) => void;
  onViewDetails: (item: MenuItem) => void;
}

export const SmartRecommendation: React.FC<SmartRecommendationProps> = ({
  onAddToCart,
  onViewDetails
}) => {
  const [preferences, setPreferences] = useState<RecommendationPreferences>({
    mood: 'celebration',
    diet: 'all',
    spiceTolerance: 'medium',
    craving: 'umami-seared',
    budget: 'budget-mid'
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Preset quick triggers for hackathon judging demo
  const presets = [
    {
      name: 'Royal Heritage Feast',
      prefs: { mood: 'celebration', diet: 'all', spiceTolerance: 'mild', craving: 'rich-creamy', budget: 'budget-high' } as RecommendationPreferences
    },
    {
      name: 'Satvik Jain Gourmet',
      prefs: { mood: 'comfort', diet: 'jain', spiceTolerance: 'mild', craving: 'rich-creamy', budget: 'budget-mid' } as RecommendationPreferences
    },
    {
      name: 'Vibrant Vegan Supper',
      prefs: { mood: 'energizing', diet: 'vegan', spiceTolerance: 'medium', craving: 'crisp-fresh', budget: 'budget-mid' } as RecommendationPreferences
    },
    {
      name: 'Hearth Wood-Fired Umami',
      prefs: { mood: 'celebration', diet: 'gluten-free', spiceTolerance: 'mild', craving: 'umami-seared', budget: 'budget-high' } as RecommendationPreferences
    }
  ];

  const handleApplyPreset = (presetPrefs: RecommendationPreferences) => {
    playChime('click');
    setPreferences(presetPrefs);
    runAnalysis();
  };

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setHasSearched(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      playChime('success');
    }, 450);
  };

  // Recommendation algorithm: calculates match score (0-100%)
  const recommendations = useMemo(() => {
    return MENU_ITEMS.map((item) => {
      let score = 70;
      const reasons: string[] = [];

      // Diet compatibility check (hard filter)
      if (preferences.diet === 'vegetarian' && !item.tags.includes('Vegetarian') && !item.tags.includes('Vegan') && !item.tags.includes('Jain Friendly')) {
        score -= 60;
      }
      if (preferences.diet === 'jain' && !item.tags.includes('Jain Friendly')) {
        score -= 75;
      }
      if (preferences.diet === 'vegan' && !item.tags.includes('Vegan')) {
        score -= 70;
      }
      if (preferences.diet === 'gluten-free' && !item.tags.includes('Gluten-Free')) {
        score -= 50;
      }

      // Budget check in INR
      if (preferences.budget === 'budget-low') {
        if (item.price <= 500) {
          score += 15;
          reasons.push('Fits comfortably within under ₹500 budget');
        } else {
          score -= 30;
        }
      } else if (preferences.budget === 'budget-mid') {
        if (item.price >= 500 && item.price <= 1000) {
          score += 15;
          reasons.push('Ideal mid-range pairing (₹500–₹1,000)');
        }
      } else if (preferences.budget === 'budget-high') {
        if (item.price >= 1000) {
          score += 15;
          reasons.push('Signature reserve tasting course (₹1,000+)');
        }
      }

      // Mood alignment
      if (preferences.mood === 'romantic' && (item.category === 'specials' || item.category === 'desserts')) {
        score += 15;
        reasons.push('Artisanal presentation crafted for intimate dining');
      }
      if (preferences.mood === 'celebration' && (item.category === 'specials' || item.category === 'drinks')) {
        score += 15;
        reasons.push('Centerpiece course with celebratory flavor complexity');
      }
      if (preferences.mood === 'comfort' && (item.category === 'pastas' || item.category === 'desserts')) {
        score += 15;
        reasons.push('Hearty, warm textures that satisfy comforting cravings');
      }
      if (preferences.mood === 'energizing' && (item.category === 'starters' || item.tags.includes('Vegan'))) {
        score += 12;
        reasons.push('Light, botanical essence with clean citrus finish');
      }

      // Craving alignment
      if (preferences.craving === 'umami-seared' && (item.id === 'dish-1' || item.id === 'dish-7' || item.id === 'dish-2')) {
        score += 15;
        reasons.push('High-heat seared crust with deep caramelized savoriness');
      }
      if (preferences.craving === 'rich-creamy' && (item.id === 'dish-2' || item.id === 'dish-5' || item.id === 'dish-9' || item.id === 'dish-12')) {
        score += 15;
        reasons.push('Silken emulsion balancing fresh dairy and spice oils');
      }
      if (preferences.craving === 'crisp-fresh' && (item.id === 'dish-8' || item.id === 'dish-6' || item.id === 'dish-3' || item.id === 'dish-13')) {
        score += 15;
        reasons.push('Bright crisp textures with vibrant regional acidity');
      }
      if (preferences.craving === 'sweet' && item.category === 'desserts') {
        score += 20;
        reasons.push('Artisanal confectionery balance of honeyed sweetness and floral aroma');
      }

      // Spice tolerance check
      if (preferences.spiceTolerance === 'mild' && item.spiciness > 1) {
        score -= 20;
      } else if (preferences.spiceTolerance === 'fiery' && item.spiciness > 0) {
        score += 8;
        reasons.push('Pleasant thermal warmth tailored to your spice preference');
      }

      // Clamp score
      const matchScore = Math.min(99, Math.max(35, score));
      return {
        item,
        score: matchScore,
        reasons: reasons.slice(0, 2)
      };
    })
    .sort((a, b) => b.score - a.score);
  }, [preferences]);

  return (
    <div className="py-12 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Innovation Feature 01 · Sensory Gastronomy Engine</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl text-zinc-100 font-medium tracking-tight mb-3">
            Smart Food Recommendation Engine
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Harness our sensory flavor intelligence matrix. Specify your dining mood, dietary discipline (including Satvik/Jain & Vegan), budget in Indian Rupees (₹), and spice tolerance to calculate tailored gastronomy matches.
          </p>
        </div>

        {/* Quick judge presets */}
        <div className="mb-8 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
          <div className="text-xs font-mono uppercase text-zinc-400 mb-3 flex items-center gap-2">
            <span>Quick Evaluation Presets</span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-500">Tap to test live taste computation</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p.name}
                onClick={() => handleApplyPreset(p.prefs)}
                className="px-3 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-amber-500 hover:text-zinc-950 text-xs font-medium text-zinc-300 transition-colors cursor-pointer border border-zinc-700/60"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Matrix Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 mb-10">
          
          {/* 1. Dining Mood */}
          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-2.5">
              1. Dining Mood
            </label>
            <div className="space-y-1.5">
              {[
                { id: 'celebration', label: 'Celebration & Festive' },
                { id: 'romantic', label: 'Romantic & Intimate' },
                { id: 'comfort', label: 'Hearty Comfort' },
                { id: 'energizing', label: 'Light & Energizing' }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    playChime('click');
                    setPreferences({ ...preferences, mood: m.id as any });
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                    preferences.mood === m.id
                      ? 'bg-amber-500 text-zinc-950 font-semibold'
                      : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  <span>{m.label}</span>
                  {preferences.mood === m.id && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Dietary Discipline */}
          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-2.5">
              2. Dietary Protocol
            </label>
            <div className="space-y-1.5">
              {[
                { id: 'all', label: 'No Restrictions' },
                { id: 'vegetarian', label: 'Vegetarian' },
                { id: 'jain', label: 'Satvik / Jain Friendly' },
                { id: 'vegan', label: 'Plant-Based (Vegan)' },
                { id: 'gluten-free', label: 'Gluten-Sensitive' }
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => {
                    playChime('click');
                    setPreferences({ ...preferences, diet: d.id as any });
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                    preferences.diet === d.id
                      ? 'bg-amber-500 text-zinc-950 font-semibold'
                      : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  <span>{d.label}</span>
                  {preferences.diet === d.id && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Craving Texture */}
          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-2.5">
              3. Flavor Craving
            </label>
            <div className="space-y-1.5">
              {[
                { id: 'umami-seared', label: 'Deep Umami / Seared' },
                { id: 'rich-creamy', label: 'Velvety & Saffron Rich' },
                { id: 'crisp-fresh', label: 'Bright & Botanical' },
                { id: 'sweet', label: 'Artisanal Confection' }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    playChime('click');
                    setPreferences({ ...preferences, craving: c.id as any });
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                    preferences.craving === c.id
                      ? 'bg-amber-500 text-zinc-950 font-semibold'
                      : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  <span>{c.label}</span>
                  {preferences.craving === c.id && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Budget Range in INR */}
          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-2.5">
              4. Budget in ₹ (INR)
            </label>
            <div className="space-y-1.5">
              {[
                { id: 'budget-low', label: 'Under ₹500', desc: 'Starters & Elixirs' },
                { id: 'budget-mid', label: '₹500 – ₹1,000', desc: 'Pastas & Mains' },
                { id: 'budget-high', label: '₹1,000+ Reserve', desc: 'Signature Cuts' }
              ].map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    playChime('click');
                    setPreferences({ ...preferences, budget: b.id as any });
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                    preferences.budget === b.id
                      ? 'bg-amber-500 text-zinc-950 font-semibold'
                      : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  <div>
                    <span className="block">{b.label}</span>
                    <span className={`text-[10px] ${preferences.budget === b.id ? 'text-zinc-800' : 'text-zinc-500'}`}>{b.desc}</span>
                  </div>
                  {preferences.budget === b.id && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Thermal Spice & Action */}
          <div className="flex flex-col justify-between">
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-2.5">
                5. Spice Tolerance
              </label>
              <div className="grid grid-cols-3 gap-1.5 mb-4">
                {[
                  { id: 'mild', label: 'Mild' },
                  { id: 'medium', label: 'Warm' },
                  { id: 'fiery', label: 'Fiery' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      playChime('click');
                      setPreferences({ ...preferences, spiceTolerance: s.id as any });
                    }}
                    className={`py-2 px-1 text-center rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      preferences.spiceTolerance === s.id
                        ? 'bg-amber-500 text-zinc-950 font-semibold'
                        : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={runAnalysis}
              disabled={isAnalyzing}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-zinc-950 font-semibold text-xs sm:text-sm transition-all shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isAnalyzing ? 'Matching Flavors...' : 'Generate Matches'}</span>
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h3 className="font-serif text-xl sm:text-2xl text-zinc-100 font-medium">
                Top Gastronomy Matches
              </h3>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-amber-400">
                {recommendations.slice(0, 3).length} Curated Dishes in ₹ INR
              </span>
            </div>
            
            {hasSearched && (
              <button
                onClick={() => {
                  setPreferences({
                    mood: 'celebration',
                    diet: 'all',
                    spiceTolerance: 'medium',
                    craving: 'umami-seared',
                    budget: 'budget-mid'
                  });
                  playChime('click');
                }}
                className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Matrix</span>
              </button>
            )}
          </div>

          {isAnalyzing ? (
            <div className="py-20 text-center">
              <div className="inline-block w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-sm font-mono text-zinc-400">Synthesizing flavor affinities & cellar pairings in ₹...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendations.slice(0, 3).map(({ item, score, reasons }, idx) => (
                <div
                  key={item.id}
                  className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-amber-500/40 transition-all flex flex-col justify-between overflow-hidden group shadow-lg"
                >
                  {/* Image slot with high fallback resilience */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/30 pointer-events-none" />

                    {/* Match Score Badge */}
                    <div className="absolute top-3 right-3 bg-zinc-950/90 backdrop-blur-md border border-amber-500/40 px-2.5 py-1 rounded-md text-xs font-mono text-amber-400 font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>{score}% Match</span>
                    </div>

                    {/* Hindi subtitle & Position Label */}
                    <div className="absolute bottom-3 left-3 text-xs font-mono text-zinc-300">
                      <span className="text-[10px] uppercase tracking-wider text-amber-400 block font-sans">
                        {item.hindiTitle || `Top Match #${idx + 1}`}
                      </span>
                      <span className="text-[11px] text-zinc-300 font-semibold">Match #{idx + 1}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-baseline justify-between mb-2">
                        <h4 className="font-serif text-lg font-semibold text-zinc-100 group-hover:text-amber-400 transition-colors">
                          {item.name}
                        </h4>
                        <span className="text-base font-mono font-bold text-amber-400 tabular-nums ml-2">
                          {formatINR(item.price)}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Unique Sensory Bar Snapshot */}
                      {item.sensory && (
                        <div className="mb-4 p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-[11px] space-y-1.5">
                          <div className="flex items-center justify-between text-zinc-400">
                            <span className="font-mono text-[10px] text-amber-400 uppercase">Sensory Signature:</span>
                            <span className="text-zinc-300 font-medium text-[10px]">{item.sensory.signatureNote}</span>
                          </div>
                          <div className="grid grid-cols-4 gap-2 pt-1 text-[10px] font-mono text-zinc-400">
                            <div>Umami: <span className="text-amber-400 font-semibold">{'★'.repeat(item.sensory.umami)}</span></div>
                            <div>Aroma: <span className="text-amber-400 font-semibold">{'★'.repeat(item.sensory.aroma)}</span></div>
                            <div>Acidity: <span className="text-amber-400 font-semibold">{'★'.repeat(item.sensory.acidity)}</span></div>
                            <div>Rich: <span className="text-amber-400 font-semibold">{'★'.repeat(item.sensory.richness)}</span></div>
                          </div>
                        </div>
                      )}

                      {/* AI Reasoning */}
                      {reasons.length > 0 && (
                        <div className="mb-4 p-2.5 rounded-lg bg-zinc-950/70 border border-zinc-800 text-[11px] text-zinc-300 space-y-1">
                          <span className="font-mono text-amber-400 block text-[10px] uppercase">
                            Why it matches your profile:
                          </span>
                          {reasons.map((r, i) => (
                            <p key={i} className="text-zinc-400 flex items-start gap-1.5">
                              <span className="text-amber-500">·</span>
                              <span>{r}</span>
                            </p>
                          ))}
                        </div>
                      )}

                      {/* Cellar Pairing */}
                      <div className="flex items-start gap-2 text-xs text-zinc-400 mb-4 pt-3 border-t border-zinc-800/80">
                        <Wine className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-zinc-300 font-medium">Cellar Pairing:</span>
                          <span className="text-zinc-400 ml-1">{item.pairing}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => {
                          playChime('click');
                          onViewDetails(item);
                        }}
                        className="flex-1 py-2 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200 transition-colors text-center cursor-pointer"
                      >
                        Details
                      </button>

                      <button
                        onClick={() => {
                          playChime('success');
                          onAddToCart(item);
                        }}
                        className="py-2 px-4 rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-xs font-semibold text-zinc-950 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap active:scale-95 shadow-sm"
                      >
                        <Utensils className="w-3.5 h-3.5" />
                        <span>Add {formatINR(item.price)}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
