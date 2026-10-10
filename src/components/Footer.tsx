import React from 'react';
import { Award, Compass, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (tabId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 py-12 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand & Provenance */}
          <div className="space-y-3">
            <span className="font-serif text-2xl font-semibold text-zinc-100 tracking-wider">
              ZESTORA
            </span>
            <p className="text-zinc-500 leading-relaxed">
              Smart Dining Experience pairing modern culinary innovation with intuitive guest personalization and sommelier intelligence.
            </p>
            <div className="flex items-center gap-2 text-amber-400 font-mono text-[11px]">
              <Award className="w-3.5 h-3.5" />
              <span>Michelin Guide Selection 2026</span>
            </div>
          </div>

          {/* Operational Hours */}
          <div className="space-y-2">
            <span className="text-zinc-200 font-mono uppercase tracking-wider block font-semibold">
              Service Hours
            </span>
            <p className="text-zinc-400">
              Tuesday – Thursday: 17:30 – 23:00
            </p>
            <p className="text-zinc-400">
              Friday – Saturday: 17:00 – 00:00
            </p>
            <p className="text-zinc-400">
              Sunday Luncheon: 12:00 – 16:00
            </p>
            <p className="text-zinc-500 text-[11px]">
              Mondays: Closed for private culinary development
            </p>
          </div>

          {/* Innovation Modules */}
          <div className="space-y-2">
            <span className="text-zinc-200 font-mono uppercase tracking-wider block font-semibold">
              Quick Navigation
            </span>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onNavigate('recommendations')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Smart Food Recommendation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Interactive Digital Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dinebot')}
                  className="hover:text-amber-400 transition-colors"
                >
                  DineBot Concierge
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reserve')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Table Reservations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tracking')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Live Order Tracker
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Hospitality */}
          <div className="space-y-2">
            <span className="text-zinc-200 font-mono uppercase tracking-wider block font-semibold">
              Bandra Waterfront Flagship
            </span>
            <p className="text-zinc-400">
              Carter Road Promenade, Bandra West
            </p>
            <p className="text-zinc-400">
              Mumbai, Maharashtra 400050
            </p>
            <p className="text-amber-400/90 font-mono text-[11px] pt-1">
              Valet parking available at Promenade Gate
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px]">
          <div>
            © 2026 ZESTORA Smart Dining Experience. All prices in Indian Rupees (₹) · GST 5% Compliant.
          </div>
          <div className="flex items-center gap-4">
            <span>Satvik & Jain Transparency</span>
            <span aria-hidden="true">·</span>
            <span>Zero Plastic Policy</span>
            <span aria-hidden="true">·</span>
            <span>AI Studio Hackathon Edition</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
