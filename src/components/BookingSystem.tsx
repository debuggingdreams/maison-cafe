import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookingDetails, Language } from '../types';
import { Calendar as CalendarIcon, Clock, Users, MapPin, Coffee, CheckCircle, Download, Sparkles } from 'lucide-react';
import { MaisonLogo } from './MaisonLogo';

interface BookingSystemProps {
  language: Language;
  isOpen?: boolean;
  onClose?: () => void;
  preSelectedDrink?: string | null;
}

export const BookingSystem: React.FC<BookingSystemProps> = ({
  language,
  preSelectedDrink = null,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [date, setDate] = useState<string>('2026-08-10');
  const [time, setTime] = useState<string>('10:30 AM');
  const [guests, setGuests] = useState<number>(2);
  const [seatingArea, setSeatingArea] = useState<BookingDetails['seatingArea']>('Window Bistro');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [welcomeDrink, setWelcomeDrink] = useState<string>(preSelectedDrink || 'Mango Coco Matcha');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<BookingDetails | null>(null);

  const timeSlots = [
    '08:30 AM', '09:15 AM', '10:00 AM', '10:45 AM',
    '11:30 AM', '12:15 PM', '01:00 PM', '01:45 PM',
    '02:30 PM', '03:15 PM', '04:00 PM', '05:00 PM'
  ];

  const seatingOptions: { area: BookingDetails['seatingArea']; labelEN: string; labelFR: string; descEN: string; descFR: string }[] = [
    {
      area: 'Window Bistro',
      labelEN: 'Window Bistro Table',
      labelFR: 'Table Côté Fenêtre',
      descEN: 'Bright natural sunlight with street view',
      descFR: 'Lumière naturelle et vue sur la rue'
    },
    {
      area: 'Concrete Bar',
      labelEN: 'Concrete Bar Counter',
      labelFR: 'Comptoir Bar en Béton',
      descEN: 'Front-row view of barista matcha whisking',
      descFR: 'Vue directe sur la préparation des boissons'
    },
    {
      area: 'Patio Seating',
      labelEN: 'Outdoor Terrace Bistro',
      labelFR: 'Terrasse Extérieure',
      descEN: 'Fresh air seating under Parisian awning',
      descFR: 'Sièges en plein air sous l’auvent'
    },
    {
      area: 'Quiet Reading Nook',
      labelEN: 'Quiet Reading Nook',
      labelFR: 'Coin Lecture Calme',
      descEN: 'Cozy corner under warm amber pendant glow',
      descFR: 'Espace paisible avec éclairage chaleureux'
    }
  ];

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const booking: BookingDetails = {
      id: `MSN-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      email,
      phone,
      date,
      time,
      guests,
      seatingArea,
      welcomeDrinks: [welcomeDrink],
      specialRequests,
      status: 'Confirmed'
    };

    setConfirmedBooking(booking);
    setStep(3);
  };

  const handleDownloadCalendar = () => {
    if (!confirmedBooking) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Maison Cafe//Table Booking//EN
BEGIN:VEVENT
SUMMARY:Maison Café Table Reservation (${confirmedBooking.seatingArea})
DESCRIPTION:Table for ${confirmedBooking.guests} guests. Pre-ordered welcome drink: ${confirmedBooking.welcomeDrinks?.join(', ')}.
LOCATION:7500 Boul. Newman, LaSalle, QC H8N 1X2
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `maison_reservation_${confirmedBooking.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="reserve" className="w-full py-12 sm:py-20 px-4 sm:px-6 md:px-12 bg-transparent border-t border-[#1C1917]/20">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 border-b border-[#1C1917]/20 pb-6 sm:pb-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C867D] font-semibold block mb-2">
              05 — Table Reservations
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-light text-[#1F1C1A] tracking-tight">
              {language === 'EN' ? 'Reserve A Quiet Corner' : 'Réservez Une Table Paisible'}
            </h2>
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#5C544E] mt-2 max-w-xl leading-relaxed">
              {language === 'EN'
                ? 'Select your preferred seating area, time, and welcome drink for an effortless café experience.'
                : 'Choisissez votre table, l’heure et votre boisson d’accueil.'}
            </p>
          </div>

          {/* Steps Indicator */}
          <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-mono text-[#8C867D] self-start md:self-auto">
            <span className={step === 1 ? 'text-[#1F1C1A] font-bold border-b-2 border-[#1F1C1A] pb-0.5' : ''}>01 TIME</span>
            <span>—</span>
            <span className={step === 2 ? 'text-[#1F1C1A] font-bold border-b-2 border-[#1F1C1A] pb-0.5' : ''}>02 DETAILS</span>
            <span>—</span>
            <span className={step === 3 ? 'text-[#1F1C1A] font-bold border-b-2 border-[#1F1C1A] pb-0.5' : ''}>03 CONFIRMED</span>
          </div>
        </div>

        {/* Step 1: Date, Time & Seating Selection */}
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10">
            
            {/* Left Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 bg-[#A8A6A1]/40 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl border border-[#1C1917]/20">
              
              {/* Date & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#8C867D] block mb-2 font-semibold">
                    {language === 'EN' ? 'Select Date' : 'Sélect. Date'}
                  </label>
                  <div className="relative">
                    <CalendarIcon className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#8C867D]" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#DCD4C5] text-[#1F1C1A] text-xs rounded-full pl-10 pr-4 py-3 min-h-[44px] focus:outline-none focus:border-[#1F1C1A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#8C867D] block mb-2 font-semibold">
                    {language === 'EN' ? 'Number of Guests' : 'Nombre d’Invités'}
                  </label>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {[1, 2, 3, 4, 6].map((num) => (
                      <button
                        key={num}
                        onClick={() => setGuests(num)}
                        className={`flex-1 py-3 min-h-[44px] rounded-full text-xs font-semibold border transition-all active:scale-95 ${
                          guests === num
                            ? 'bg-[#1F1C1A] text-[#FAF8F5] border-[#1F1C1A]'
                            : 'bg-[#FAF8F5] text-[#1F1C1A] border-[#DCD4C5] hover:bg-[#F5F0E8]'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#8C867D] block mb-2 font-semibold">
                  {language === 'EN' ? 'Available Time Slots' : 'Heures Disponibles'}
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setTime(slot)}
                      className={`py-2.5 min-h-[42px] rounded-full text-xs font-semibold border transition-all active:scale-95 ${
                        time === slot
                          ? 'bg-[#1F1C1A] text-[#FAF8F5] border-[#1F1C1A]'
                          : 'bg-[#FAF8F5] text-[#1F1C1A] border-[#DCD4C5] hover:bg-[#F5F0E8]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seating Area Selection */}
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#8C867D] block mb-2 font-semibold">
                  {language === 'EN' ? 'Seating Atmosphere' : 'Atmosphère de la Table'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {seatingOptions.map((option) => (
                    <button
                      key={option.area}
                      onClick={() => setSeatingArea(option.area)}
                      className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all active:scale-98 ${
                        seatingArea === option.area
                          ? 'bg-[#1F1C1A] text-[#FAF8F5] border-[#1F1C1A]'
                          : 'bg-[#FAF8F5] text-[#1F1C1A] border-[#DCD4C5] hover:bg-[#F5F0E8]'
                      }`}
                    >
                      <div className="font-serif font-normal text-sm sm:text-base">
                        {language === 'EN' ? option.labelEN : option.labelFR}
                      </div>
                      <div className="text-[11px] opacity-70 mt-0.5 font-light">
                        {language === 'EN' ? option.descEN : option.descFR}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Next Step Action */}
              <div className="pt-2 sm:pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="w-full sm:w-auto px-8 py-3.5 min-h-[44px] rounded-full bg-[#1F1C1A] text-[#FAF8F5] text-xs uppercase tracking-[0.18em] font-semibold hover:bg-[#3D3834] transition-all active:scale-98"
                >
                  {language === 'EN' ? 'Continue To Guest Details →' : 'Continuer Aux Coordonnées →'}
                </button>
              </div>

            </div>

            {/* Right Summary Card (5 cols) */}
            <div className="lg:col-span-5 bg-[#1F1C1A] text-[#FAF8F5] p-6 sm:p-8 rounded-2xl flex flex-col justify-between space-y-6">
              <div className="space-y-5 sm:space-y-6">
                <MaisonLogo size="md" light={true} />
                <div className="border-b border-white/10 pb-4">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C867D] block">
                    Reservation Preview
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-light mt-1">
                    {seatingArea}
                  </h3>
                </div>

                <div className="space-y-3 text-xs text-[#D6D0C4]">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-[#D9A05B]" />
                    <span>{date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#D9A05B]" />
                    <span>{time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#D9A05B]" />
                    <span>{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#D9A05B]" />
                    <span>1672 Dollard Ave, LaSalle, QC</span>
                  </div>
                </div>

                {preSelectedDrink && (
                  <div className="bg-white/10 p-3.5 rounded-xl border border-white/10 text-xs">
                    <span className="text-[10px] uppercase tracking-wider text-[#D9A05B] block">Pre-ordered Drink</span>
                    <p className="font-serif italic text-sm mt-0.5">{preSelectedDrink}</p>
                  </div>
                )}
              </div>

              <div className="text-[11px] text-[#8C867D] border-t border-white/10 pt-4 font-serif italic">
                "Quiet mornings, slow espresso, and Montreal wood-fired bagels."
              </div>
            </div>

          </div>
        )}

        {/* Step 2: Guest Details Form */}
        {step === 2 && (
          <form onSubmit={handleConfirm} className="max-w-2xl mx-auto bg-[#F5F0E8] p-5 sm:p-8 rounded-2xl border border-[#E8E2D5] space-y-5 sm:space-y-6">
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1F1C1A] border-b border-[#DCD4C5] pb-3 sm:pb-4">
              {language === 'EN' ? 'Guest Information' : 'Informations Personnelles'}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#8C867D] block mb-1 font-semibold">
                  {language === 'EN' ? 'Full Name *' : 'Nom Complet *'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Élodie Laurent"
                  className="w-full bg-[#FAF8F5] border border-[#DCD4C5] text-[#1F1C1A] text-xs rounded-full px-5 py-3 min-h-[44px] focus:outline-none focus:border-[#1F1C1A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#8C867D] block mb-1 font-semibold">
                    {language === 'EN' ? 'Email Address *' : 'Adresse Courriel *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="elodie@example.com"
                    className="w-full bg-[#FAF8F5] border border-[#DCD4C5] text-[#1F1C1A] text-xs rounded-full px-5 py-3 min-h-[44px] focus:outline-none focus:border-[#1F1C1A]"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#8C867D] block mb-1 font-semibold">
                    {language === 'EN' ? 'Phone Number' : 'Numéro de Téléphone'}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(514) 555-0199"
                    className="w-full bg-[#FAF8F5] border border-[#DCD4C5] text-[#1F1C1A] text-xs rounded-full px-5 py-3 min-h-[44px] focus:outline-none focus:border-[#1F1C1A]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#8C867D] block mb-1 font-semibold">
                  {language === 'EN' ? 'Welcome Drink Pre-Order' : 'Boisson d’Accueil'}
                </label>
                <select
                  value={welcomeDrink}
                  onChange={(e) => setWelcomeDrink(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-[#DCD4C5] text-[#1F1C1A] text-xs rounded-full px-5 py-3 min-h-[44px] focus:outline-none focus:border-[#1F1C1A]"
                >
                  <option value="Mango Coco Matcha">Mango Coco Matcha ($7.50)</option>
                  <option value="Dirty Biscoff Cookie Latte">Dirty Biscoff Cookie Latte ($6.75)</option>
                  <option value="Strawberry Cloud Cream Foam">Strawberry Cloud Cream Foam ($7.25)</option>
                  <option value="Ceremonial Uji Cold Brew">Ceremonial Uji Cold Brew ($6.00)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#8C867D] block mb-1 font-semibold">
                  {language === 'EN' ? 'Special Requests / Dietary Notes' : 'Remarques / Allergies'}
                </label>
                <textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  rows={2}
                  placeholder="e.g. Oat milk preferred, high chair needed, celebrating anniversary..."
                  className="w-full bg-[#FAF8F5] border border-[#DCD4C5] text-[#1F1C1A] text-xs rounded-2xl p-4 focus:outline-none focus:border-[#1F1C1A]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#DCD4C5]">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs uppercase tracking-wider text-[#8C867D] hover:text-[#1F1C1A] p-2"
              >
                ← Back
              </button>

              <button
                type="submit"
                className="px-8 py-3.5 min-h-[44px] rounded-full bg-[#1F1C1A] text-[#FAF8F5] text-xs uppercase tracking-[0.18em] font-semibold hover:bg-[#3D3834] transition-all active:scale-98"
              >
                {language === 'EN' ? 'Confirm Reservation' : 'Confirmer La Réservation'}
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Confirmed Booking Ticket */}
        {step === 3 && confirmedBooking && (
          <div className="max-w-xl mx-auto bg-[#1F1C1A] text-[#FAF8F5] p-6 sm:p-8 md:p-12 rounded-3xl space-y-6 sm:space-y-8 text-center border border-[#DCD4C5]">
            <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-[#4E6E45] mx-auto" />
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D9A05B]">
                Reservation Confirmed • Code #{confirmedBooking.id}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-light">
                {language === 'EN' ? 'We Look Forward To Welcoming You' : 'Au Plaisir De Vous Accueillir'}
              </h3>
              <p className="text-xs text-[#D6D0C4] max-w-md mx-auto leading-relaxed font-light">
                A confirmation has been sent to <span className="text-white font-medium">{confirmedBooking.email}</span>. Your table is held for 15 minutes past reservation time.
              </p>
            </div>

            <div className="bg-[#2A2724] p-4 sm:p-6 rounded-2xl text-left text-xs space-y-3 border border-white/10">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-[#8C867D]">Guest</span>
                <span className="font-semibold text-white">{confirmedBooking.name}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-[#8C867D]">Date &amp; Time</span>
                <span className="font-semibold text-white">{confirmedBooking.date} @ {confirmedBooking.time}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-[#8C867D]">Seating</span>
                <span className="font-semibold text-white">{confirmedBooking.seatingArea}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C867D]">Welcome Drink</span>
                <span className="font-semibold text-[#D9A05B]">{confirmedBooking.welcomeDrinks?.[0]}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={handleDownloadCalendar}
                className="w-full sm:w-auto px-6 py-3.5 min-h-[44px] rounded-full bg-[#FAF8F5] text-[#1F1C1A] text-xs uppercase tracking-wider font-semibold hover:bg-white transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <Download className="w-4 h-4 text-[#4E6E45]" />
                <span>Add To Calendar (.ics)</span>
              </button>

              <button
                onClick={() => setStep(1)}
                className="w-full sm:w-auto px-6 py-3.5 min-h-[44px] rounded-full border border-white/20 text-white text-xs uppercase tracking-wider font-semibold hover:bg-white/10 transition-all active:scale-98"
              >
                Book Another Table
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
