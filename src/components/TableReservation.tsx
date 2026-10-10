import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, MapPin, CheckCircle, Sparkles, Shield, AlertCircle, Phone, Mail, User } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TableBooking } from '../types';
import { playChime } from '../utils/audio';

interface TableReservationProps {
  onNavigateToMenu: () => void;
}

export const TableReservation: React.FC<TableReservationProps> = ({ onNavigateToMenu }) => {
  const [formData, setFormData] = useState({
    guestName: 'Sanika Pathak',
    phone: '+91 98201 44520',
    email: 'sanikapathak007@gmail.com',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '19:30',
    partySize: 2,
    seatingZone: 'Intimate Velvet Booth' as TableBooking['seatingZone'],
    specialOccasion: 'Anniversary Celebration',
    notes: 'Window side preferred if available. Satvik/Jain preparation for one guest.'
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [confirmedBooking, setConfirmedBooking] = useState<TableBooking | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const zones: { name: TableBooking['seatingZone']; tag: string; desc: string }[] = [
    {
      name: 'Intimate Velvet Booth',
      tag: 'Most Popular for Couples',
      desc: 'Deep emerald velvet banquette with private acoustic baffling and dim candlelight.'
    },
    {
      name: 'Chef\'s Tasting Counter',
      tag: 'Front-Row Culinary Theater',
      desc: 'Interactive front-row seats overlooking Executive Chef Marc\'s open hearth station.'
    },
    {
      name: 'Solarium Garden',
      tag: 'Botanical Glass Atrium',
      desc: 'Under starlit glass canopy flanked by olive trees and vertical herb gardens.'
    },
    {
      name: 'Main Dining',
      tag: 'Vibrant & Grand',
      desc: 'Spacious brass-accented hall with live ambient acoustic acoustics.'
    }
  ];

  const timeSlots = [
    { time: '17:30', status: 'Available' },
    { time: '18:15', status: 'Available' },
    { time: '19:00', status: 'Limited' },
    { time: '19:30', status: 'Available' },
    { time: '20:15', status: 'Limited' },
    { time: '21:00', status: 'Available' }
  ];

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.guestName.trim()) errors.guestName = 'Please provide your primary name';
    if (!formData.phone.trim() || formData.phone.length < 8) errors.phone = 'Valid telephone contact required';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Valid confirmation email required';
    if (!formData.date) errors.date = 'Please select a reservation date';
    if (!formData.timeSlot) errors.timeSlot = 'Please select a dining time slot';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      playChime('bell');
      return;
    }

    setIsSubmitting(true);
    playChime('click');

    setTimeout(() => {
      setIsSubmitting(false);
      const newBooking: TableBooking = {
        id: `ZS-${Math.floor(100000 + Math.random() * 900000)}`,
        guestName: formData.guestName,
        phone: formData.phone,
        email: formData.email,
        date: formData.date,
        timeSlot: formData.timeSlot,
        partySize: formData.partySize,
        seatingZone: formData.seatingZone,
        specialOccasion: formData.specialOccasion,
        notes: formData.notes,
        status: 'Confirmed'
      };

      setConfirmedBooking(newBooking);
      playChime('reward');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 600);
  };

  return (
    <section className="py-12 bg-zinc-950 border-t border-zinc-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-amber-400 text-xs font-mono mb-3">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Innovation Feature 04 · Live Seating</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl text-zinc-100 font-medium tracking-tight mb-2">
            Table & Experience Reservation
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Select your preferred dining zone, party size, and celebration preferences for guaranteed instant table seating.
          </p>
        </div>

        {confirmedBooking ? (
          /* Confirmation Pass */
          <div className="max-w-xl mx-auto rounded-3xl bg-zinc-900/90 border border-amber-500/40 p-6 sm:p-8 text-center shadow-2xl relative overflow-hidden">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono uppercase text-amber-400 block mb-1">
              Reservation Confirmed · Instant Pass
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-zinc-100 font-medium mb-1">
              We Await You, {confirmedBooking.guestName}
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Confirmation dispatch sent to <span className="text-zinc-200">{confirmedBooking.email}</span>
            </p>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-left space-y-3 mb-6 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                <span className="text-zinc-500">Booking Reference:</span>
                <span className="text-amber-400 font-semibold">{confirmedBooking.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Seating Zone:</span>
                <span className="text-zinc-200 font-sans font-medium">{confirmedBooking.seatingZone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Date & Seating:</span>
                <span className="text-zinc-200">{confirmedBooking.date} at {confirmedBooking.timeSlot}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Guests:</span>
                <span className="text-zinc-200">{confirmedBooking.partySize} Guests</span>
              </div>
              {confirmedBooking.specialOccasion && (
                <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                  <span className="text-zinc-500">Occasion:</span>
                  <span className="text-amber-300 font-sans">{confirmedBooking.specialOccasion}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  playChime('click');
                  onNavigateToMenu();
                }}
                className="flex-1 py-3 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
              >
                Pre-Select Menu Courses
              </button>

              <button
                onClick={() => {
                  playChime('click');
                  setConfirmedBooking(null);
                }}
                className="py-3 px-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium text-xs sm:text-sm transition-all cursor-pointer"
              >
                Make Another Booking
              </button>
            </div>
          </div>
        ) : (
          /* Reservation Form */
          <form onSubmit={handleBookingSubmit} className="space-y-8">
            
            {/* Step 1: Zone Selection */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-3">
                1. Select Atmosphere & Seating Zone
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {zones.map((zone) => {
                  const isSelected = formData.seatingZone === zone.name;
                  return (
                    <div
                      key={zone.name}
                      onClick={() => {
                        playChime('click');
                        setFormData({ ...formData, seatingZone: zone.name });
                      }}
                      className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/10 shadow-sm'
                          : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700'
                      }`}
                    >
                      <div>
                        <span className="text-[10px] font-mono uppercase text-amber-400 block mb-1">
                          {zone.tag}
                        </span>
                        <h4 className="font-semibold text-sm text-zinc-100 mb-1">
                          {zone.name}
                        </h4>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          {zone.desc}
                        </p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono">
                        <span className={isSelected ? 'text-amber-400 font-bold' : 'text-zinc-500'}>
                          {isSelected ? '✓ Selected' : 'Tap to select'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Date, Time & Party Size */}
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-6">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                2. Schedule & Party Details
              </span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Party Size */}
                <div>
                  <label className="text-xs text-zinc-400 block mb-2 font-medium">Party Size</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 4, 6, 8].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => {
                          playChime('click');
                          setFormData({ ...formData, partySize: size });
                        }}
                        className={`flex-1 py-2 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer border ${
                          formData.partySize === size
                            ? 'bg-amber-500 text-zinc-950 border-amber-500 font-bold'
                            : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        {size} {size === 1 ? 'Guest' : 'Guests'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="text-xs text-zinc-400 block mb-2 font-medium">Reservation Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:border-amber-500"
                  />
                  {formErrors.date && <p className="text-xs text-red-400 mt-1">{formErrors.date}</p>}
                </div>

                {/* Time Slots */}
                <div>
                  <label className="text-xs text-zinc-400 block mb-2 font-medium">Seating Time</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {timeSlots.map((ts) => (
                      <button
                        key={ts.time}
                        type="button"
                        onClick={() => {
                          playChime('click');
                          setFormData({ ...formData, timeSlot: ts.time });
                        }}
                        className={`py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer border ${
                          formData.timeSlot === ts.time
                            ? 'bg-amber-500 text-zinc-950 border-amber-500 font-bold'
                            : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        {ts.time}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Step 3: Contact & Special Requests */}
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                3. Primary Guest Contact & Occasion
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-zinc-400 block mb-1.5 font-medium">Full Name</label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.guestName}
                      onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                      placeholder="e.g. Sanika Pathak"
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  {formErrors.guestName && <p className="text-xs text-red-400 mt-1">{formErrors.guestName}</p>}
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1.5 font-medium">Phone Number</label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  {formErrors.phone && <p className="text-xs text-red-400 mt-1">{formErrors.phone}</p>}
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1.5 font-medium">Email Address</label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="guest@domain.com"
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  {formErrors.email && <p className="text-xs text-red-400 mt-1">{formErrors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-xs text-zinc-400 block mb-1.5 font-medium">Special Occasion</label>
                  <select
                    value={formData.specialOccasion}
                    onChange={(e) => setFormData({ ...formData, specialOccasion: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="None">Casual Dining</option>
                    <option value="Anniversary Celebration">Anniversary Celebration</option>
                    <option value="Birthday Honor">Birthday Honor</option>
                    <option value="Business Entertaining">Business Entertaining</option>
                    <option value="First Date">First Date</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1.5 font-medium">Dietary Allergies & Notes</label>
                  <input
                    type="text"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Allergies, seating requests, dietary requirements..."
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-zinc-950 font-semibold text-sm sm:text-base transition-all shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer"
              >
                {isSubmitting ? 'Confirming Table Allocation...' : 'Confirm Table Reservation · Free Instant Hold'}
              </button>
              <p className="text-zinc-500 text-xs mt-2">
                No cancellation penalty up to 2 hours prior to seating.
              </p>
            </div>

          </form>
        )}

      </div>
    </section>
  );
};
