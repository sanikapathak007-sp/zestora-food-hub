import React from 'react';
import { ShoppingBag, Sparkles, Menu as MenuIcon, X, Calendar, Compass, Utensils, MessageSquare, Clock, Award } from 'lucide-react';
import { playChime } from '../utils/audio';
import { formatINR } from '../utils/format';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  cartTotal: number;
  openCart: () => void;
  rewardPoints: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  cartTotal,
  openCart,
  rewardPoints
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { id: 'recommendations', label: 'Smart Taste', icon: Compass },
    { id: 'menu', label: 'Interactive Menu', icon: Utensils },
    { id: 'dinebot', label: 'DineBot AI', icon: MessageSquare },
    { id: 'reserve', label: 'Reservations', icon: Calendar },
    { id: 'tracking', label: 'Live Orders', icon: Clock },
    { id: 'rewards', label: 'Privilege Club', icon: Award }
  ];

  const handleNavClick = (id: string) => {
    playChime('click');
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/92 backdrop-blur-md border-b border-amber-900/30 shadow-lg shadow-black/40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-baseline gap-1.5 text-left focus-visible:outline-none group cursor-pointer"
            aria-label="ZESTORA Home"
          >
            <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-wider text-zinc-100 group-hover:text-amber-400 transition-colors">
              ZESTORA
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 shadow-sm shadow-amber-500/50"></span>
          </button>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`transition-colors whitespace-nowrap cursor-pointer relative py-1 focus-visible:outline-none ${
                    isActive
                      ? 'text-amber-400 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            {/* Currency badge */}
            <span className="hidden xl:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono text-zinc-400 bg-zinc-900/80 border border-zinc-800">
              INR (₹)
            </span>

            {/* Loyalty points chip */}
            <button
              onClick={() => handleNavClick('rewards')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-amber-500/40 text-xs font-mono text-amber-400 transition-all cursor-pointer"
              title="View loyalty rewards"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{rewardPoints} pts</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => {
                playChime('click');
                openCart();
              }}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-zinc-950 font-semibold text-xs sm:text-sm transition-all shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer whitespace-nowrap"
              aria-label={`Open shopping cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
              <span className="tabular-nums font-mono font-bold">
                {cartCount > 0 ? `${cartCount} · ${formatINR(cartTotal)}` : 'Cart'}
              </span>
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-400 hover:text-zinc-100 rounded-lg hover:bg-zinc-900 transition-colors focus-visible:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-zinc-800 bg-zinc-950/98 px-4 pt-3 pb-6 space-y-2">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-zinc-800/80 text-xs text-zinc-400">
            <span>Privilege Club Points</span>
            <span className="text-amber-400 font-mono font-medium">{rewardPoints} pts</span>
          </div>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                  isActive
                    ? 'bg-amber-500/10 text-amber-400 font-semibold'
                    : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

