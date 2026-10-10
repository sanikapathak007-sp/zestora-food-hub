import React, { useState } from 'react';
import { X, Wine, Flame, Clock, Plus, Minus, Check, AlertCircle, Sparkles } from 'lucide-react';
import { MenuItem } from '../types';
import { playChime } from '../utils/audio';
import { formatINR } from '../utils/format';

interface ItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, choices?: Record<string, string>, instructions?: string) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  onAddToCart
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedChoices, setSelectedChoices] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    item.customizationOptions?.forEach((opt) => {
      initial[opt.name] = opt.choices[0].label;
    });
    return initial;
  });
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Calculate extra price in INR if any
  let extraPrice = 0;
  item.customizationOptions?.forEach((opt) => {
    const choiceLabel = selectedChoices[opt.name];
    const match = opt.choices.find((c) => c.label === choiceLabel);
    if (match?.extraPrice) {
      extraPrice += match.extraPrice;
    }
  });

  const finalUnitPrice = item.price + extraPrice;
  const totalPrice = finalUnitPrice * quantity;
  const isVeg = item.tags.includes('Vegetarian') || item.tags.includes('Jain Friendly') || item.tags.includes('Vegan');

  const handleAdd = () => {
    playChime('success');
    onAddToCart(item, quantity, selectedChoices, specialInstructions);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
    >
      <div className="relative w-full max-w-2xl bg-zinc-950 rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-zinc-950/80 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors focus-visible:outline-none cursor-pointer border border-zinc-800"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] w-full bg-zinc-900 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 mb-1">
                {/* Standard Indian Veg Mark */}
                <span
                  className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center p-0.5 bg-zinc-950/90 ${
                    isVeg ? 'border-emerald-500' : 'border-red-500'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isVeg ? 'bg-emerald-500' : 'bg-red-500'}`} />
                </span>

                {item.hindiTitle && (
                  <>
                    <span className="text-amber-400 font-sans font-medium">{item.hindiTitle}</span>
                    <span aria-hidden="true" className="text-zinc-600">·</span>
                  </>
                )}
                <span>{item.prepTime}</span>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span>{item.calories} kcal</span>
                {item.spiciness > 0 && (
                  <>
                    <span aria-hidden="true" className="text-zinc-600">·</span>
                    <span className="flex items-center gap-0.5 text-amber-400">
                      <Flame className="w-3.5 h-3.5 fill-amber-400" />
                      <span>Level {item.spiciness}</span>
                    </span>
                  </>
                )}
              </div>
              <h2 id="modal-title" className="font-serif text-2xl sm:text-3xl font-medium text-white">
                {item.name}
              </h2>
            </div>
            <div className="text-xl sm:text-2xl font-mono text-amber-400 font-bold tabular-nums">
              {formatINR(finalUnitPrice)}
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Description */}
          <p className="text-zinc-300 text-sm leading-relaxed">
            {item.description}
          </p>

          {/* Sensory Profile Wheel / Bars */}
          {item.sensory && (
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Sensory Tasting Note</span>
                </span>
                <span className="text-xs text-zinc-300 font-medium">{item.sensory.signatureNote}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-mono">
                <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800">
                  <span className="text-zinc-500 block text-[10px] uppercase">Umami Depth</span>
                  <div className="flex gap-1 text-amber-400 mt-1">{'★'.repeat(item.sensory.umami)}</div>
                </div>
                <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800">
                  <span className="text-zinc-500 block text-[10px] uppercase">Aromatic Lift</span>
                  <div className="flex gap-1 text-amber-400 mt-1">{'★'.repeat(item.sensory.aroma)}</div>
                </div>
                <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800">
                  <span className="text-zinc-500 block text-[10px] uppercase">Acidity / Crisp</span>
                  <div className="flex gap-1 text-amber-400 mt-1">{'★'.repeat(item.sensory.acidity)}</div>
                </div>
                <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800">
                  <span className="text-zinc-500 block text-[10px] uppercase">Richness</span>
                  <div className="flex gap-1 text-amber-400 mt-1">{'★'.repeat(item.sensory.richness)}</div>
                </div>
              </div>
            </div>
          )}

          {/* Tags & Allergens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-xs">
            <div>
              <span className="text-zinc-400 font-mono uppercase block mb-1.5">Dietary Profile</span>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-zinc-400 font-mono uppercase block mb-1.5">Allergens</span>
              {item.allergens.length > 0 ? (
                <div className="flex items-center gap-1.5 text-zinc-300">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Contains: {item.allergens.join(', ')}</span>
                </div>
              ) : (
                <span className="text-emerald-400">No major allergens noted</span>
              )}
            </div>
          </div>

          {/* Sommelier Pairing */}
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                <Wine className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-amber-400 block mb-1">
                  Sommelier Cellar Pairing
                </span>
                <p className="text-sm font-medium text-zinc-200">{item.pairing}</p>
                {item.pairingNote && (
                  <p className="text-xs text-zinc-400 mt-1">{item.pairingNote}</p>
                )}
              </div>
            </div>
          </div>

          {/* Customization Options with INR price */}
          {item.customizationOptions?.map((opt) => (
            <div key={opt.name} className="space-y-2">
              <label className="text-xs font-mono uppercase text-zinc-400 block">
                {opt.name}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {opt.choices.map((choice) => {
                  const isSelected = selectedChoices[opt.name] === choice.label;
                  return (
                    <button
                      key={choice.label}
                      type="button"
                      onClick={() => {
                        playChime('click');
                        setSelectedChoices({ ...selectedChoices, [opt.name]: choice.label });
                      }}
                      className={`p-2.5 rounded-xl text-xs font-medium border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/10 text-amber-300'
                          : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <span>{choice.label}</span>
                      {choice.extraPrice ? (
                        <span className="font-mono text-[10px] text-amber-400 font-semibold">
                          +{formatINR(choice.extraPrice)}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Kitchen Notes */}
          <div>
            <label className="text-xs font-mono uppercase text-zinc-400 block mb-2">
              Special Kitchen Instructions
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g., Less spicy, sauce on the side, extra crispy..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Footer with Quantity & Add Button */}
        <div className="p-6 border-t border-zinc-800 bg-zinc-950 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase text-zinc-400">Qty</span>
            <div className="flex items-center rounded-xl border border-zinc-800 bg-zinc-900 p-1">
              <button
                onClick={() => {
                  playChime('click');
                  setQuantity(Math.max(1, quantity - 1));
                }}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-mono font-medium text-zinc-100 tabular-nums">
                {quantity}
              </span>
              <button
                onClick={() => {
                  playChime('click');
                  setQuantity(quantity + 1);
                }}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-zinc-950 font-semibold text-sm transition-all shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>Add to Cart · {formatINR(totalPrice)}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
