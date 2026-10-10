import React, { useState } from 'react';
import { Sparkles, Utensils, MessageSquare, Calendar, ShoppingBag, Clock, Award, ArrowRight, ShieldCheck, MapPin, Compass, Flame } from 'lucide-react';
import heroImg from '../assets/images/hero_dining_ambiance_1790854684033.jpg';
import { playChime } from '../utils/audio';

interface HeroProps {
  onNavigate: (tabId: string) => void;
  openCart: () => void;
  currentTable: string;
  onChangeTable: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onNavigate,
  openCart,
  currentTable,
  onChangeTable
}) => {
  const [ambientMood, setAmbientMood] = useState<'candlelight' | 'solarium' | 'hearth'>('candlelight');

  const moods = [
    { id: 'candlelight' as const, label: '🕯️ Candlelit Velvet', desc: 'Intimate acoustic warmth & low amber glow' },
    { id: 'solarium' as const, label: '✨ Starlight Solarium', desc: 'Glass atrium with botanical starlight ambiance' },
    { id: 'hearth' as const, label: '🔥 Chef\'s Hearth Embers', desc: 'Open wood-fire culinary theater' }
  ];

  const innovationFeatures = [
    {
      id: 'recommendations',
      title: '1. Smart Taste Matcher',
      tagline: 'Personalized flavor radar by mood, diet & Indian spice tolerance',
      icon: Sparkles,
      action: () => onNavigate('recommendations')
    },
    {
      id: 'menu',
      title: '2. Interactive Digital Menu',
      tagline: 'Artisanal courses, cellar pairings & sensory flavor bars in ₹ (INR)',
      icon: Utensils,
      action: () => onNavigate('menu')
    },
    {
      id: 'dinebot',
      title: '3. DineBot AI Concierge',
      tagline: 'Multilingual culinary sommelier & pairing assistant',
      icon: MessageSquare,
      action: () => onNavigate('dinebot')
    },
    {
      id: 'reserve',
      title: '4. Table Reservation',
      tagline: 'Real-time zone allocation, instant digital pass & occasion hold',
      icon: Calendar,
      action: () => onNavigate('reserve')
    },
    {
      id: 'cart',
      title: '5. Digital Cart & Check Splitting',
      tagline: 'Smart bill split in ₹, GST transparency & promo engine',
      icon: ShoppingBag,
      action: openCart
    },
    {
      id: 'tracking',
      title: '6. Live Kitchen Tracking',
      tagline: 'KDS hearth tracker & smartwatch floor server summon',
      icon: Clock,
      action: () => onNavigate('tracking')
    },
    {
      id: 'rewards',
      title: '7. Privilege Rewards Vault',
      tagline: 'ZestPoints ladder, scratcher & instant ₹ dining credits',
      icon: Award,
      action: () => onNavigate('rewards')
    }
  ];

  return (
    <div className="relative overflow-hidden bg-zinc-950 border-b border-amber-900/30">
      {/* Background Hero Image with Measured Scrim & Subtle Mood Hue */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="ZESTORA Dining Ambiance"
          className="w-full h-full object-cover object-center opacity-30 scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className={`absolute inset-0 transition-colors duration-700 ${
          ambientMood === 'hearth'
            ? 'bg-gradient-to-t from-zinc-950 via-zinc-950/85 to-amber-950/30'
            : ambientMood === 'solarium'
            ? 'bg-gradient-to-t from-zinc-950 via-zinc-950/85 to-indigo-950/30'
            : 'bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/40'
        }`} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-16 lg:pb-24">
        
        {/* Unique Sensory Bar & Live Table Sync */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-xs font-mono">
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-200">Evening Service Active</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-amber-400 font-sans font-medium">Bandra Waterfront Flagship</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-zinc-400">Executive Chef Marc Vane</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onChangeTable}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-900/90 border border-amber-500/30 text-amber-400 hover:border-amber-400 transition-colors cursor-pointer shadow-sm shadow-amber-500/10"
              title="Click to sync your active dining table"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span className="font-semibold">{currentTable}</span>
              <span className="text-zinc-500 text-[10px] ml-1">Change Seat</span>
            </button>
            <div className="hidden sm:flex items-center gap-1.5 text-zinc-400 bg-zinc-900/60 px-2.5 py-1 rounded-lg border border-zinc-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Michelin Guide 2026</span>
            </div>
          </div>
        </div>

        {/* Primary Hero Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium mb-4 backdrop-blur-sm">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span className="tracking-wide">Taste. Discover. Experience.</span>
          </div>
          
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white mb-4 leading-tight">
            ZESTORA — Smart Dining Experience
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed mb-6 max-w-2xl">
            Where Michelin-caliber culinary artistry meets next-generation hospitality. Discover personalized flavor recommendations, interactive pairings in Indian Rupees (₹), live tableside orchestration, and frictionless dining.
          </p>

          {/* Unique Live Dining Ambiance Switcher */}
          <div className="mb-8 p-3 rounded-xl bg-zinc-900/70 border border-zinc-800/80 backdrop-blur-md max-w-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono uppercase text-zinc-400 tracking-wider">
                Active Dining Ambiance:
              </span>
              <span className="text-[11px] font-sans text-amber-400">
                {moods.find(m => m.id === ambientMood)?.desc}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {moods.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    playChime('click');
                    setAmbientMood(m.id);
                  }}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all cursor-pointer text-center ${
                    ambientMood === m.id
                      ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-zinc-950 font-semibold shadow-sm'
                      : 'bg-zinc-800/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Quick CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-14">
            <button
              onClick={() => {
                playChime('click');
                onNavigate('recommendations');
              }}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-zinc-950 font-semibold text-sm transition-all shadow-lg shadow-amber-500/25 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4" />
              <span>Smart Flavor Matcher</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => {
                playChime('click');
                onNavigate('menu');
              }}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-100 font-medium text-sm transition-all hover:border-amber-500/50 cursor-pointer whitespace-nowrap"
            >
              <Utensils className="w-4 h-4 text-amber-400" />
              <span>Explore Digital Menu</span>
            </button>

            <button
              onClick={() => {
                playChime('click');
                onNavigate('dinebot');
              }}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-100 font-medium text-sm transition-all hover:border-amber-500/50 cursor-pointer whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>DineBot AI Sommelier</span>
            </button>
          </div>
        </div>

        {/* 7 Core Innovation Showcase */}
        <div className="border-t border-amber-900/20 pt-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <h2 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-zinc-400">
                Key Innovation Showcase · 7 Core Features
              </h2>
            </div>
            <span className="text-xs text-amber-400 font-mono hidden sm:inline-block">
              All prices configured in Indian Currency (₹ INR)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {innovationFeatures.slice(0, 4).map((feature) => {
              const Icon = feature.icon;
              return (
                <button
                  key={feature.id}
                  onClick={() => {
                    playChime('click');
                    feature.action();
                  }}
                  className="p-4 rounded-xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-800/90 hover:border-amber-500/60 hover:shadow-lg hover:shadow-amber-500/10 text-left transition-all group flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-zinc-800/80 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-semibold text-zinc-100 text-sm group-hover:text-amber-400 transition-colors mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {feature.tagline}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-[11px] font-mono text-zinc-500 group-hover:text-amber-400 transition-colors">
                    <span>Inspect Feature</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            {innovationFeatures.slice(4, 7).map((feature) => {
              const Icon = feature.icon;
              return (
                <button
                  key={feature.id}
                  onClick={() => {
                    playChime('click');
                    feature.action();
                  }}
                  className="p-4 rounded-xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-800/90 hover:border-amber-500/60 hover:shadow-lg hover:shadow-amber-500/10 text-left transition-all group flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-zinc-800/80 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-semibold text-zinc-100 text-sm group-hover:text-amber-400 transition-colors mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {feature.tagline}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-[11px] font-mono text-zinc-500 group-hover:text-amber-400 transition-colors">
                    <span>Inspect Feature</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
