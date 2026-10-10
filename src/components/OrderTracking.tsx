import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, Flame, Wine, Utensils, Bell, FastForward, Sparkles, ChefHat, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { OrderState } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { playChime } from '../utils/audio';
import { formatINR } from '../utils/format';

interface OrderTrackingProps {
  activeOrder: OrderState | null;
  onSetOrder: (order: OrderState) => void;
  onNavigateToMenu: () => void;
}

export const OrderTracking: React.FC<OrderTrackingProps> = ({
  activeOrder,
  onSetOrder,
  onNavigateToMenu
}) => {
  const [waiterCalled, setWaiterCalled] = useState(false);
  const [waterRequested, setWaterRequested] = useState(false);

  // Stepper stages
  const stages: { key: OrderState['status']; title: string; desc: string; icon: any }[] = [
    {
      key: 'confirmed',
      title: 'Order Queued at Hearth',
      desc: 'Order received and verified by Kitchen Display System.',
      icon: Clock
    },
    {
      key: 'cooking',
      title: 'Chef Marc Sautéing & Hearth Firing',
      desc: 'Active cooking on mesquite wood hearth and pasta station.',
      icon: Flame
    },
    {
      key: 'plating',
      title: 'Cellar Pairing & Plating Polish',
      desc: 'Sommelier checking vintage pour and micro-herb finishing.',
      icon: Wine
    },
    {
      key: 'served',
      title: 'Presented Tableside',
      desc: 'Served hot to your table. Bon appétit!',
      icon: Utensils
    }
  ];

  // Helper to get step index
  const getStepIndex = (status: OrderState['status']) => {
    switch (status) {
      case 'confirmed': return 0;
      case 'cooking': return 1;
      case 'plating': return 2;
      case 'served': return 3;
      default: return 0;
    }
  };

  const currentStep = activeOrder ? getStepIndex(activeOrder.status) : 0;

  // Judge simulator button: advance order stage
  const handleAdvanceStage = () => {
    if (!activeOrder) return;
    playChime('click');
    const orderStatuses: OrderState['status'][] = ['confirmed', 'cooking', 'plating', 'served'];
    const nextIdx = (currentStep + 1) % orderStatuses.length;
    const nextStatus = orderStatuses[nextIdx];

    onSetOrder({
      ...activeOrder,
      status: nextStatus,
      estimatedMinutes: Math.max(0, 20 - nextIdx * 6)
    });

    if (nextStatus === 'served') {
      playChime('reward');
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } else {
      playChime('bell');
    }
  };

  // Seed demo order for instant hackathon testing if none placed
  const handleCreateDemoOrder = () => {
    playChime('success');
    const demo: OrderState = {
      orderId: 'ZS-8492',
      items: [
        {
          id: 'cart-1',
          menuItem: MENU_ITEMS[0], // Wagyu Ribeye (₹1,450)
          quantity: 1,
          selectedChoices: { Doneness: 'Medium Rare (Chef Signature)', 'Artisanal Sauce': 'Truffle Bone Marrow Butter' }
        },
        {
          id: 'cart-2',
          menuItem: MENU_ITEMS[1], // Kashmiri Saffron Risotto (₹1,180)
          quantity: 1,
          selectedChoices: { 'Cheese Finish': '36-Month Parmigiano-Reggiano' }
        },
        {
          id: 'cart-3',
          menuItem: MENU_ITEMS[2], // Botanical Cocktail (₹420)
          quantity: 2
        }
      ],
      subtotal: 3470,
      tax: 173.5, // 5% GST
      tip: 347,   // 10% Gratuity
      discount: 0,
      total: 3990.5,
      tableNumber: 'Table 12',
      diningMode: 'Dine-In',
      timestamp: '19:42',
      status: 'cooking',
      estimatedMinutes: 12
    };
    onSetOrder(demo);
  };

  const handleCallServer = () => {
    playChime('bell');
    setWaiterCalled(true);
    setTimeout(() => setWaiterCalled(false), 4000);
  };

  const handleRequestWater = () => {
    playChime('bell');
    setWaterRequested(true);
    setTimeout(() => setWaterRequested(false), 4000);
  };

  return (
    <section className="py-12 bg-zinc-950 border-t border-amber-900/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-amber-400 text-xs font-mono mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>Innovation Feature 06 · Live Kitchen KDS</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl text-zinc-100 font-medium tracking-tight mb-2">
            Live Order Tracking & Hospitality
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Synchronized with our kitchen hearth display system. Watch your courses advance in real-time or summon floor assistance with one tap.
          </p>
        </div>

        {!activeOrder ? (
          /* Empty State */
          <div className="max-w-xl mx-auto rounded-3xl bg-zinc-900/40 border border-zinc-800 p-8 sm:p-12 text-center">
            <div className="w-14 h-14 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 mx-auto mb-4">
              <ChefHat className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-zinc-200 font-medium mb-2">
              No Active Order in Kitchen Queue
            </h3>
            <p className="text-zinc-500 text-xs sm:text-sm mb-6 max-w-sm mx-auto">
              Place an order from the digital cart or launch our simulated Chef's Tasting order in ₹ (INR) to test real-time tracking immediately.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleCreateDemoOrder}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-zinc-950 font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-md shadow-amber-500/20"
              >
                Launch Demo Tasting Order in ₹ (3 Courses)
              </button>
              <button
                onClick={onNavigateToMenu}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium text-xs sm:text-sm transition-all cursor-pointer"
              >
                Browse Menu
              </button>
            </div>
          </div>
        ) : (
          /* Active Tracker View */
          <div className="space-y-6">
            
            {/* Top Status Card */}
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono uppercase text-amber-400 font-bold">
                    Order {activeOrder.orderId}
                  </span>
                  <span aria-hidden="true" className="text-zinc-600">·</span>
                  <span className="text-xs font-mono text-zinc-400">{activeOrder.tableNumber}</span>
                  <span aria-hidden="true" className="text-zinc-600">·</span>
                  <span className="text-xs font-mono text-zinc-400">{activeOrder.diningMode}</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-zinc-100">
                  {stages[currentStep].title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  {stages[currentStep].desc}
                </p>
              </div>

              {/* Countdown badge & Judge Simulator Trigger */}
              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                <div className="text-left sm:text-right">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block">Est. Time Remaining</span>
                  <span className="text-xl sm:text-2xl font-mono text-amber-400 font-bold tabular-nums">
                    {activeOrder.status === 'served' ? 'Served' : `~${activeOrder.estimatedMinutes} mins`}
                  </span>
                </div>

                {/* Judge Fast-forward button */}
                <button
                  onClick={handleAdvanceStage}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 text-xs font-mono text-amber-400 transition-all cursor-pointer border border-zinc-700"
                  title="Simulate advancing to next preparation step"
                >
                  <FastForward className="w-3.5 h-3.5" />
                  <span>Advance Stage</span>
                </button>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
                {stages.map((stage, idx) => {
                  const Icon = stage.icon;
                  const isDone = idx < currentStep;
                  const isCurrent = idx === currentStep;
                  return (
                    <div
                      key={stage.key}
                      className={`p-4 rounded-xl border transition-all ${
                        isCurrent
                          ? 'border-amber-500 bg-amber-500/10 shadow-sm'
                          : isDone
                          ? 'border-emerald-500/40 bg-zinc-900/60'
                          : 'border-zinc-800/80 bg-zinc-950/40 opacity-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isCurrent
                              ? 'bg-amber-500 text-zinc-950'
                              : isDone
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-zinc-800 text-zinc-500'
                          }`}
                        >
                          {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : <Icon className="w-4 h-4" />}
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">
                          Step 0{idx + 1}
                        </span>
                      </div>

                      <h4 className="text-xs font-semibold text-zinc-200 mb-1">
                        {stage.title}
                      </h4>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">
                        {stage.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions: Waiter Call & Water Request */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-medium text-zinc-200">Summon Floor Server</h4>
                  <p className="text-[11px] text-zinc-500">Notifies your dedicated server's smartwatch immediately.</p>
                </div>
                <button
                  onClick={handleCallServer}
                  disabled={waiterCalled}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    waiterCalled
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-amber-400'
                  }`}
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>{waiterCalled ? 'Server Notified!' : 'Call Server'}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-medium text-zinc-200">Request Still / Sparkling Water</h4>
                  <p className="text-[11px] text-zinc-500">Artisanal table water refresh service.</p>
                </div>
                <button
                  onClick={handleRequestWater}
                  disabled={waterRequested}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    waterRequested
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-blue-400'
                  }`}
                >
                  <span>💧</span>
                  <span>{waterRequested ? 'Water Requested!' : 'Refill Water'}</span>
                </button>
              </div>
            </div>

            {/* Itemized Order Breakdown with formatINR */}
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-4">
                Active Order Itemization ({activeOrder.items.length} items)
              </h4>

              <div className="space-y-3">
                {activeOrder.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-2 border-b border-zinc-800/60 text-xs"
                  >
                    <div>
                      <span className="font-mono text-amber-400 mr-2 font-bold">{item.quantity}x</span>
                      <span className="text-zinc-200 font-medium">{item.menuItem.name}</span>
                      {item.selectedChoices && (
                        <span className="text-zinc-500 ml-2">
                          ({Object.values(item.selectedChoices).join(', ')})
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-zinc-300 tabular-nums font-semibold">
                      {formatINR(item.menuItem.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800 flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-400">Total Billed to {activeOrder.tableNumber}:</span>
                <span className="text-sm font-bold text-amber-400">{formatINR(activeOrder.total)}</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
