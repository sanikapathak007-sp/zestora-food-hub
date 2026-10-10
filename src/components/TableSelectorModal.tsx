import React from 'react';
import { X, MapPin, Check } from 'lucide-react';
import { playChime } from '../utils/audio';

interface TableSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTable: string;
  onSelectTable: (table: string) => void;
}

export const TableSelectorModal: React.FC<TableSelectorModalProps> = ({
  isOpen,
  onClose,
  currentTable,
  onSelectTable
}) => {
  if (!isOpen) return null;

  const tables = [
    { id: 'Table 04', zone: 'Solarium Glass Atrium', seats: '2-4 Guests' },
    { id: 'Table 08', zone: 'Chef Hearth Counter', seats: '1-2 Guests' },
    { id: 'Table 12', zone: 'Intimate Velvet Booth', seats: '2-4 Guests' },
    { id: 'Table 16', zone: 'Main Dining Grand Salon', seats: '4-8 Guests' },
    { id: 'Table 21', zone: 'Skyline Terrace', seats: '2-6 Guests' }
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="table-select-heading"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="relative w-full max-w-md bg-zinc-950 rounded-2xl border border-zinc-800 p-6 shadow-2xl animate-in zoom-in-95">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-400" />
            <h3 id="table-select-heading" className="font-serif text-lg font-medium text-zinc-100">
              Select Dining Table
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-zinc-400 mb-4">
          Sync your digital orders, waiter calls, and tableside bill directly with your physical seat.
        </p>

        <div className="space-y-2 mb-6">
          {tables.map((t) => {
            const isSelected = currentTable === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  playChime('click');
                  onSelectTable(t.id);
                  onClose();
                }}
                className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500 text-amber-300'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <div>
                  <span className="font-mono text-sm font-semibold block">{t.id}</span>
                  <span className="text-xs text-zinc-400">{t.zone} · {t.seats}</span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-amber-400 stroke-[2.5]" />}
              </button>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-lg bg-zinc-800 text-xs font-medium text-zinc-300 hover:bg-zinc-700 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
