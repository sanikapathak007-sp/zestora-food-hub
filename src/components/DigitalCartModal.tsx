import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Tag, Check, CreditCard, Users, Utensils, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, OrderState } from '../types';
import { playChime } from '../utils/audio';
import { formatINR } from '../utils/format';

interface DigitalCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  currentTable: string;
  onOrderPlaced: (order: OrderState) => void;
}

export const DigitalCartModal: React.FC<DigitalCartModalProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  currentTable,
  onOrderPlaced
}) => {
  if (!isOpen) return null;

  const [diningMode, setDiningMode] = useState<'Dine-In' | 'Takeaway Express'>('Dine-In');
  const [tableNum, setTableNum] = useState(currentTable.replace('Table ', '') || '12');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percent?: number; fixed?: number } | null>(null);
  const [promoError, setPromoError] = useState('');
  const [tipPercent, setTipPercent] = useState<number>(10);
  const [splitCount, setSplitCount] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculations in INR
  const subtotal = items.reduce((acc, item) => {
    let itemPrice = item.menuItem.price;
    // Account for customizations in INR
    if (item.selectedChoices) {
      item.menuItem.customizationOptions?.forEach((opt) => {
        const choice = opt.choices.find((c) => c.label === item.selectedChoices?.[opt.name]);
        if (choice?.extraPrice) itemPrice += choice.extraPrice;
      });
    }
    return acc + itemPrice * item.quantity;
  }, 0);

  let discount = 0;
  if (appliedPromo) {
    if (appliedPromo.percent) {
      discount = (subtotal * appliedPromo.percent) / 100;
    } else if (appliedPromo.fixed) {
      discount = Math.min(subtotal, appliedPromo.fixed);
    }
  }

  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = taxableAmount * 0.05; // 5% GST for restaurant dining in India
  const tip = (taxableAmount * tipPercent) / 100;
  const total = taxableAmount + tax + tip;
  const perPerson = total / splitCount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();

    if (code === 'ZESTORA15') {
      setAppliedPromo({ code, percent: 15 });
      playChime('reward');
    } else if (code === 'CHEFGIFT') {
      setAppliedPromo({ code, fixed: 250 });
      playChime('reward');
    } else if (code === 'HACKATHON2026') {
      setAppliedPromo({ code, fixed: 500 });
      playChime('reward');
    } else {
      setPromoError('Invalid code. Try ZESTORA15 or HACKATHON2026 (₹500 off)');
      playChime('bell');
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    setIsProcessing(true);
    playChime('click');

    setTimeout(() => {
      setIsProcessing(false);
      const newOrder: OrderState = {
        orderId: `ZS-${Math.floor(1000 + Math.random() * 9000)}`,
        items: [...items],
        subtotal,
        tax,
        tip,
        discount,
        total,
        tableNumber: `Table ${tableNum}`,
        diningMode,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'confirmed',
        estimatedMinutes: 20
      };

      playChime('reward');
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
      onOrderPlaced(newOrder);
      onClose();
    }, 700);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-heading"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
    >
      <div className="relative w-full max-w-2xl bg-zinc-950 rounded-3xl border border-amber-500/30 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
          <div className="flex items-center gap-2.5">
            <h2 id="cart-heading" className="font-serif text-xl sm:text-2xl font-medium text-zinc-100">
              Digital Cart & Tableside Bill
            </h2>
            <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-xs font-mono text-amber-400">
              {items.length} {items.length === 1 ? 'course' : 'courses'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer border border-zinc-800"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-6">
          
          {/* Dining Mode & Table Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
            <div>
              <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1.5">Dining Mode</span>
              <div className="flex rounded-xl bg-zinc-950 p-1 border border-zinc-800">
                {(['Dine-In', 'Takeaway Express'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      playChime('click');
                      setDiningMode(mode);
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      diningMode === mode
                        ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-zinc-950 font-bold shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1.5">
                {diningMode === 'Dine-In' ? 'Active Table' : 'Guest Name'}
              </span>
              <div className="flex items-center gap-2">
                {diningMode === 'Dine-In' ? (
                  <select
                    value={tableNum}
                    onChange={(e) => setTableNum(e.target.value)}
                    className="w-full py-1.5 px-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-200 focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="4">Table 04 · Solarium Garden</option>
                    <option value="8">Table 08 · Chef's Hearth</option>
                    <option value="12">Table 12 · Velvet Booth (Current)</option>
                    <option value="16">Table 16 · Terrace View</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    defaultValue="Express Dining Guest"
                    className="w-full py-1.5 px-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Items List */}
          {items.length === 0 ? (
            <div className="py-12 text-center text-zinc-500">
              <Utensils className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm font-medium text-zinc-300">Your tableside cart is empty</p>
              <p className="text-xs text-zinc-500 mt-1">Explore our gastronomic courses to add dishes.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 flex items-start justify-between gap-3"
                >
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center p-0.5 bg-zinc-950/90 ${
                            item.menuItem.tags.includes('Vegetarian') || item.menuItem.tags.includes('Jain Friendly') || item.menuItem.tags.includes('Vegan')
                              ? 'border-emerald-500'
                              : 'border-red-500'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.menuItem.tags.includes('Vegetarian') || item.menuItem.tags.includes('Jain Friendly') || item.menuItem.tags.includes('Vegan')
                                ? 'bg-emerald-500'
                                : 'bg-red-500'
                            }`}
                          />
                        </span>
                        <h4 className="text-sm font-medium text-zinc-100">{item.menuItem.name}</h4>
                      </div>

                      <span className="text-xs font-mono font-bold text-amber-400 tabular-nums">
                        {formatINR(item.menuItem.price * item.quantity)}
                      </span>
                    </div>

                    {/* Customization Details */}
                    {item.selectedChoices && Object.keys(item.selectedChoices).length > 0 && (
                      <div className="text-[11px] text-zinc-400 space-y-0.5 pl-5">
                        {Object.entries(item.selectedChoices).map(([k, v]) => (
                          <span key={k} className="inline-block mr-2 text-zinc-400">
                            <span className="text-zinc-500">{k}:</span> {v}
                          </span>
                        ))}
                      </div>
                    )}

                    {item.specialInstructions && (
                      <p className="text-[11px] text-amber-400/90 italic mt-1 pl-5">
                        Note: "{item.specialInstructions}"
                      </p>
                    )}

                    {/* Stepper */}
                    <div className="flex items-center gap-3 mt-3 pl-5">
                      <div className="flex items-center rounded-lg border border-zinc-800 bg-zinc-950 p-0.5">
                        <button
                          onClick={() => {
                            playChime('click');
                            onUpdateQuantity(item.id, -1);
                          }}
                          className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono text-zinc-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => {
                            playChime('click');
                            onUpdateQuantity(item.id, 1);
                          }}
                          className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          playChime('click');
                          onRemoveItem(item.id);
                        }}
                        className="text-zinc-500 hover:text-red-400 transition-colors p-1 cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {items.length > 0 && (
            <>
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code (e.g. ZESTORA15 or HACKATHON2026)"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 uppercase font-mono placeholder:normal-case placeholder:font-sans placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="py-2 px-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-amber-400 transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <p className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
                    <Check className="w-3.5 h-3.5" /> Code {appliedPromo.code} applied successfully!
                  </p>
                )}
                {promoError && (
                  <p className="text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {promoError}
                  </p>
                )}
              </form>

              {/* Service Gratuity Selector in INR */}
              <div>
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                  <span>Culinary Team Gratuity</span>
                  <span className="font-mono text-amber-400 font-semibold">{formatINR(tip)}</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {[5, 10, 12, 0].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => {
                        playChime('click');
                        setTipPercent(pct);
                      }}
                      className={`py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                        tipPercent === pct
                          ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-zinc-950 font-bold'
                          : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
                      }`}
                    >
                      {pct === 0 ? 'Custom/0%' : `${pct}%`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bill Splitting Calculator in INR */}
              <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-400" />
                  <div>
                    <span className="text-xs font-medium text-zinc-200 block">Split Check</span>
                    <span className="text-[11px] text-zinc-400">
                      {formatINR(perPerson)} / guest across {splitCount} {splitCount === 1 ? 'diner' : 'diners'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center rounded-lg border border-zinc-800 bg-zinc-950 p-0.5">
                  <button
                    onClick={() => {
                      playChime('click');
                      setSplitCount(Math.max(1, splitCount - 1));
                    }}
                    className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center text-xs font-mono text-zinc-200">
                    {splitCount}
                  </span>
                  <button
                    onClick={() => {
                      playChime('click');
                      setSplitCount(Math.min(8, splitCount + 1));
                    }}
                    className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Financial Breakdown in INR */}
              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-zinc-200 font-semibold">{formatINR(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Privilege Promo Discount</span>
                    <span>-{formatINR(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-400">
                  <span>Restaurant GST (5%)</span>
                  <span className="text-zinc-200">{formatINR(tax)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Staff Gratuity ({tipPercent}%)</span>
                  <span className="text-zinc-200">{formatINR(tip)}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-zinc-100 pt-2 border-t border-zinc-800">
                  <span className="font-sans">Total Payable</span>
                  <span className="text-amber-400 font-bold text-base">{formatINR(total)}</span>
                </div>
              </div>
            </>
          )}

        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-zinc-800 bg-zinc-950 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 disabled:opacity-50 text-zinc-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/25 active:scale-95 cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              <span>
                {isProcessing
                  ? 'Transmitting to Kitchen Display...'
                  : `Send Order to Kitchen · ${formatINR(total)}`}
              </span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
