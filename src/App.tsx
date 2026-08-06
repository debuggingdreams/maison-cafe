import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { EditorialStory } from './components/EditorialStory';
import { MenuSection } from './components/MenuSection';
import { DrinkStudio } from './components/DrinkStudio';
import { BookingSystem } from './components/BookingSystem';
import { Photobooth } from './components/Photobooth';
import { CafeAtmosphere } from './components/CafeAtmosphere';
import { ReviewsLocation } from './components/ReviewsLocation';
import { OrderDrawer } from './components/OrderDrawer';
import { BagelCustomizerModal } from './components/BagelCustomizerModal';
import { OpeningIntroOverlay } from './components/OpeningIntroOverlay';
import { MaisonLogo } from './components/MaisonLogo';
import { Language, CartItem, MenuItem } from './types';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('EN');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [preSelectedDrink, setPreSelectedDrink] = useState<string | null>(null);
  const [customizingBagel, setCustomizingBagel] = useState<MenuItem | null>(null);
  const [isOpeningIntroOpen, setIsOpeningIntroOpen] = useState<boolean>(true);

  const handleAddToCart = (newItem: CartItem) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex((i) => i.id === newItem.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += newItem.quantity;
        return updated;
      }
      return [...prev, newItem];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOpenBookingWithDrink = (drinkName: string) => {
    setPreSelectedDrink(drinkName);
    setIsBookingOpen(true);
    const element = document.getElementById('reserve');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen concrete-bg text-[#1C1917] font-sans antialiased selection:bg-[#1C1917] selection:text-[#E2DFD8]">
      
      {/* Full-Screen Hand-Drawn Opening Sketch Overlay (Runs on initial page load at the start) */}
      <OpeningIntroOverlay
        language={language}
        isOpen={isOpeningIntroOpen}
        onClose={() => setIsOpeningIntroOpen(false)}
      />

      {/* Editorial Navigation Header */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBooking={() => {
          setIsBookingOpen(true);
          handleNavigateToSection('reserve');
        }}
        onNavigateToSection={handleNavigateToSection}
      />

      {/* Main Editorial Content Flow */}
      <main className="w-full">
        
        {/* Hero Section */}
        <Hero
          language={language}
          onOpenBooking={() => {
            setIsBookingOpen(true);
            handleNavigateToSection('reserve');
          }}
          onOpenMenu={() => handleNavigateToSection('menu')}
          onOpenDrinkStudio={() => handleNavigateToSection('drink-studio')}
        />

        {/* 01 — Philosophy & Story */}
        <EditorialStory language={language} />

        {/* 02 — Artisanal Menu Board */}
        <section id="menu" className="scroll-mt-24">
          <MenuSection
            language={language}
            onAddToCart={handleAddToCart}
            onOpenBagelCustomizer={(bagel) => setCustomizingBagel(bagel)}
          />
        </section>

        {/* 04 — Beverage Craft Studio */}
        <section id="drink-studio" className="scroll-mt-24">
          <DrinkStudio
            language={language}
            onAddToCart={handleAddToCart}
            onOpenBookingWithDrink={handleOpenBookingWithDrink}
          />
        </section>

        {/* 05 — Table Reservations */}
        <section id="reserve" className="scroll-mt-24">
          <BookingSystem
            language={language}
            isOpen={isBookingOpen}
            preSelectedDrink={preSelectedDrink}
          />
        </section>

        {/* 06 — Photobooth Souvenir Strip */}
        <section id="photobooth" className="scroll-mt-24">
          <Photobooth language={language} />
        </section>

        {/* 07 — Gallery & Café Atmosphere */}
        <CafeAtmosphere language={language} />

        {/* 08 — Accolades & Location */}
        <section id="location" className="scroll-mt-24">
          <ReviewsLocation language={language} />
        </section>

      </main>

      {/* Slide-over Order Drawer */}
      <OrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        language={language}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Bagel Customizer Modal */}
      {customizingBagel && (
        <BagelCustomizerModal
          bagel={customizingBagel}
          language={language}
          isOpen={!!customizingBagel}
          onClose={() => setCustomizingBagel(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Editorial Footer */}
      <footer className="w-full bg-[#1F1C1A] text-[#FAF8F5] py-20 px-6 md:px-12 border-t border-[#DCD4C5]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12">
            
            <div className="space-y-4">
              <MaisonLogo size="md" light={true} />
              <p className="text-xs text-[#8C867D] font-light leading-relaxed">
                Artisanal Montreal wood-fired bagel bar and Uji ceremonial matcha espresso studio in LaSalle.
              </p>
              <div className="text-[10px] text-[#D9A05B] font-mono tracking-wider flex items-center gap-1 uppercase">
                <Sparkles className="w-3 h-3" />
                <span>LaSalle • Montréal, QC</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C867D] block">Explore</span>
              <ul className="space-y-2 text-[#D6D0C4] font-light">
                <li>
                  <button onClick={() => handleNavigateToSection('story')} className="hover:text-white transition-colors">
                    Philosophy
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigateToSection('menu')} className="hover:text-white transition-colors">
                    Bagels &amp; Espresso Menu
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigateToSection('drink-studio')} className="hover:text-white transition-colors">
                    Beverage Craft Studio
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigateToSection('photobooth')} className="hover:text-white transition-colors">
                    Analog Photo Strip
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3 text-xs">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C867D] block">Visit Us</span>
              <p className="text-[#D6D0C4] font-light leading-relaxed">
                1672 Dollard Ave
                <br />
                LaSalle, QC H8N 1T8
                <br />
                Mon — Wed: 10:00 — 20:00
                <br />
                Thu — Sun: 10:00 — 23:00
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C867D] block">Community</span>
              <p className="text-[#D6D0C4] font-light leading-relaxed">
                Tag @maisoncafe.lasalle on Instagram to be featured in our monthly photo journal.
              </p>
              <a
                href="https://instagram.com/maisoncafe.lasalle"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs font-serif italic text-[#D9A05B] hover:underline"
              >
                @maisoncafe.lasalle
              </a>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#8C867D] font-mono">
            <span>© 2026 Maison Café. All rights reserved.</span>
            <span className="font-serif italic text-xs lowercase tracking-normal text-[#D6D0C4]">
              "Café, Bagels &amp; Quiet Mornings in LaSalle"
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}

