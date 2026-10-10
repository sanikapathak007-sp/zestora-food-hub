import React, { useState } from 'react';
import { Award, Sparkles, Gift, Check, Wine, Utensils, Star, Flame, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { REWARD_PERKS } from '../data/menuData';
import { RewardPerk } from '../types';
import { playChime } from '../utils/audio';

interface RewardsClubProps {
  points: number;
  onUpdatePoints: (newPoints: number) => void;
}

export const RewardsClub: React.FC<RewardsClubProps> = ({
  points,
  onUpdatePoints
}) => {
  const [perks, setPerks] = useState<RewardPerk[]>(REWARD_PERKS);
  const [hasScratched, setHasScratched] = useState(false);
  const [mysteryReward, setMysteryReward] = useState<number | null>(null);
  const [redeemedCode, setRedeemedCode] = useState<{ id: string; code: string } | null>(null);

  // Tier calculation
  let currentTier = 'Silver Gourmet';
  let nextTier = 'Gold Epicurean';
  let tierProgress = (points / 500) * 100;

  if (points >= 1000) {
    currentTier = 'Platinum Connoisseur';
    nextTier = 'Supreme Member';
    tierProgress = 100;
  } else if (points >= 500) {
    currentTier = 'Gold Epicurean';
    nextTier = 'Platinum Connoisseur';
    tierProgress = ((points - 500) / 500) * 100;
  }

  const handleRedeem = (perk: RewardPerk) => {
    if (points < perk.pointsCost) {
      playChime('bell');
      return;
    }

    playChime('reward');
    onUpdatePoints(points - perk.pointsCost);
    const code = `PRIV-${Math.floor(10000 + Math.random() * 90000)}`;
    setRedeemedCode({ id: perk.id, code });

    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleScratch = () => {
    if (hasScratched) return;
    playChime('reward');
    const bonus = 100;
    setMysteryReward(bonus);
    setHasScratched(true);
    onUpdatePoints(points + bonus);

    confetti({
      particleCount: 110,
      spread: 80,
      origin: { y: 0.5 }
    });
  };

  return (
    <section className="py-12 bg-zinc-950 border-t border-zinc-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-amber-400 text-xs font-mono mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Innovation Feature 07 · Loyalty Architecture</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl text-zinc-100 font-medium tracking-tight mb-2">
            ZESTORA Privilege Club
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Earn 1 ZestPoint for every ₹10 spent. Unlock complimentary artisanal desserts, rare cellar flights, and flat ₹500 & ₹1,000 tableside credits.
          </p>
        </div>

        {/* Member Card & Tier Status */}
        <div className="rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 p-6 sm:p-8 shadow-2xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10 mb-6">
            <div>
              <span className="text-xs font-mono uppercase text-amber-400 font-semibold block mb-1">
                Active Member Tier
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-zinc-100 font-medium flex items-center gap-2">
                <span>{currentTier}</span>
                <Sparkles className="w-5 h-5 text-amber-400 fill-amber-400/20" />
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Account ID: #ZS-PRIV-9241 · Sanika Pathak
              </p>
            </div>

            <div className="sm:text-right">
              <span className="text-xs font-mono uppercase text-zinc-500 block mb-1">Available Rewards Points</span>
              <div className="text-3xl sm:text-4xl font-mono text-amber-400 font-bold tabular-nums">
                {points} <span className="text-base text-zinc-400 font-normal">pts</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative z-10 pt-4 border-t border-zinc-800/80">
            <div className="flex justify-between text-xs text-zinc-400 mb-2">
              <span>Tier Progress to {nextTier}</span>
              <span className="font-mono text-zinc-200">
                {points >= 1000 ? 'Highest Tier Reached' : `${1000 - points} pts to Platinum`}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-700"
                style={{ width: `${Math.min(100, Math.max(10, tierProgress))}%` }}
              />
            </div>
          </div>
        </div>

        {/* Daily Mystery Flavor Scratcher */}
        <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-6 mb-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400 mb-1">
              <Zap className="w-4 h-4" />
              <span>Daily Privilege Bonus</span>
            </div>
            <h4 className="font-serif text-lg sm:text-xl text-zinc-100 font-medium">
              Chef Marc's Daily Mystery Flavor Scratcher
            </h4>
            <p className="text-xs text-zinc-400 mt-1 max-w-md">
              Tap to unveil your daily VIP dining bonus. Awards between +50 to +150 points directly to your account.
            </p>
          </div>

          <div>
            {hasScratched ? (
              <div className="px-5 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center animate-in zoom-in-95">
                <span className="text-xs font-mono text-emerald-400 uppercase block font-semibold">
                  Congratulations!
                </span>
                <span className="text-lg font-mono font-bold text-zinc-100">+{mysteryReward} Bonus Points Added</span>
              </div>
            ) : (
              <button
                onClick={handleScratch}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs sm:text-sm transition-all shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer whitespace-nowrap flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Scratch & Reveal Bonus</span>
              </button>
            )}
          </div>
        </div>

        {/* Redeemable Perks Catalog */}
        <div>
          <h3 className="font-serif text-xl sm:text-2xl text-zinc-100 font-medium mb-6">
            Redeem Exclusive Gastronomy Perks
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {perks.map((perk) => {
              const canAfford = points >= perk.pointsCost;
              const isRedeemed = redeemedCode?.id === perk.id;

              return (
                <div
                  key={perk.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                    canAfford
                      ? 'bg-zinc-900/40 border-zinc-800 hover:border-amber-500/40'
                      : 'bg-zinc-950/40 border-zinc-800/40 opacity-75'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono uppercase text-amber-400 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                        {perk.category}
                      </span>
                      <span className="font-mono text-sm font-semibold text-amber-400">
                        {perk.pointsCost} pts
                      </span>
                    </div>

                    <h4 className="font-serif text-lg font-medium text-zinc-100 mb-1">
                      {perk.title}
                    </h4>

                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      {perk.description}
                    </p>
                  </div>

                  <div>
                    {isRedeemed ? (
                      <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/40 text-center">
                        <span className="text-[10px] font-mono text-emerald-400 uppercase block font-semibold">
                          Voucher Active · Show to Server
                        </span>
                        <span className="font-mono text-xs text-zinc-100 font-bold">{redeemedCode.code}</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleRedeem(perk)}
                        disabled={!canAfford}
                        className={`w-full py-2.5 px-4 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          canAfford
                            ? 'bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 text-zinc-200 active:scale-95'
                            : 'bg-zinc-900 text-zinc-600 cursor-not-allowed border border-zinc-800/60'
                        }`}
                      >
                        <Gift className="w-3.5 h-3.5" />
                        <span>{canAfford ? `Redeem for ${perk.pointsCost} Points` : `Need ${perk.pointsCost - points} More Points`}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
