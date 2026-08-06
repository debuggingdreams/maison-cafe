import React, { useState } from 'react';
import { MENU_ITEMS } from '../data/menuData';
import { MenuItem, Category, Language, CartItem } from '../types';
import { Search, Plus, Check, Sparkles } from 'lucide-react';
import { MaisonLogo } from './MaisonLogo';

interface MenuSectionProps {
  language: Language;
  onAddToCart: (item: CartItem) => void;
  onOpenBagelCustomizer?: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  language,
  onAddToCart,
  onOpenBagelCustomizer,
}) => {
  const [activeCategory, setActiveCategory] = useState<Category | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const categories: { key: Category | 'ALL'; labelEN: string; labelFR: string }[] = [
    { key: 'ALL', labelEN: 'Full Menu', labelFR: 'Menu Complet' },
    { key: 'BAGELS', labelEN: 'Bagels & Toasts', labelFR: 'Bagels & Toasts' },
    { key: 'CLASSIQUES', labelEN: 'Classiques Espresso', labelFR: 'Classiques Espresso' },
    { key: 'MATCHA_LATTES', labelEN: 'Matcha & Specialty', labelFR: 'Matcha & Spécialités' },
    { key: 'SUPPLEMENTS', labelEN: 'Suppléments & Milk', labelFR: 'Suppléments' },
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'ALL' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.EN.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.FR.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || (item.tags && item.tags.includes(selectedTag as any));

    return matchesCategory && matchesSearch && matchesTag;
  });

  const handleQuickAdd = (item: MenuItem) => {
    if (item.category === 'BAGELS' && onOpenBagelCustomizer) {
      onOpenBagelCustomizer(item);
      return;
    }

    const cartItem: CartItem = {
      id: `${item.id}-${Date.now()}`,
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
    };

    onAddToCart(cartItem);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1800);
  };

  return (
    <section id="menu" className="w-full py-12 sm:py-20 px-4 sm:px-6 md:px-12 bg-transparent border-t border-[#1C1917]/20">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 border-b border-[#1C1917]/20 pb-6 sm:pb-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#78716C] font-semibold block mb-2">
              03 — Essentials &amp; Menu
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-normal text-[#1C1917] tracking-tight">
              {language === 'EN' ? 'Artisanal Menu Board' : 'Menu Artisanal Maison'}
            </h2>
          </div>
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#524E4A] max-w-sm leading-relaxed">
            {language === 'EN'
              ? 'Handcrafted bagels baked daily in wood-fired ovens, paired with first flush Uji matcha and slow espresso.'
              : 'Bagels cuits au four à bois, matcha Uji de première récolte et espresso.'}
          </p>
        </div>

        {/* Minimal Search & Filter Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 bg-[#FAF8F5]/50 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-[#1C1917]/15 shadow-xs">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-3.5 h-3.5 absolute left-4 top-1/2 -translate-y-1/2 text-[#78716C]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'EN' ? 'Filter smoked salmon, matcha...' : 'Filtrer saumon, matcha...'}
              className="w-full bg-[#FAF8F5]/80 border border-[#1C1917]/15 text-[#1C1917] placeholder-[#78716C] text-xs rounded-full pl-10 pr-4 py-2.5 min-h-[40px] focus:outline-none focus:border-[#1C1917] transition-colors"
            />
          </div>

          {/* Category Tabs (Horizontally scrollable on mobile) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar -mx-1 px-1">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3.5 py-2 min-h-[38px] rounded-full text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat.key
                    ? 'bg-[#1C1917] text-[#E2DFD8] shadow-xs'
                    : 'bg-[#FAF8F5]/60 text-[#1C1917] hover:bg-[#FAF8F5] border border-[#1C1917]/15'
                }`}
              >
                {language === 'EN' ? cat.labelEN : cat.labelFR}
              </button>
            ))}
          </div>

          {/* Tag Quick Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
            {['House Special', 'Best Seller', 'Vegan'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-3 py-1.5 min-h-[34px] rounded-full text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold whitespace-nowrap transition-all ${
                  selectedTag === tag
                    ? 'bg-[#3F5A37] text-white'
                    : 'bg-[#FAF8F5]/60 text-[#1C1917] hover:bg-[#FAF8F5] border border-[#1C1917]/15'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

        </div>

        {/* Dual Column Framed Wooden Menu Boards (Matching physical cafe menu plaque, now with subtle transparency) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-start">
          
          {/* Column 1: BAGELS & CLASSIQUES Framed Plaque */}
          <div className="relative group">
            {/* Wall Shadow & Dark Walnut Wood Frame */}
            <div className="bg-[#2B1D15]/85 backdrop-blur-md p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.18),0_10px_25px_rgba(0,0,0,0.12)] border border-[#3E2C20]/80">
              {/* Inner Frame Bevel / Paper Inset (Slightly transparent to let wall texture show gently) */}
              <div className="bg-[#FAF8F5]/88 backdrop-blur-md text-[#1C1917] p-6 sm:p-8 md:p-10 rounded-lg sm:rounded-xl border border-[#EAE5DC]/80 shadow-inner flex flex-col justify-between min-h-[520px] relative">
                
                <div>
                  {/* Category Header matching image */}
                  <div className="border-b border-[#E0DACC] pb-4 mb-6">
                    <span className="text-[9px] uppercase tracking-[0.25em] text-[#78716C] font-semibold block mb-1">
                      Menu Plaque • LaSalle
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-[0.15em] text-[#1C1917] uppercase font-sans">
                      BAGELS
                    </h3>
                  </div>

                  {/* Menu Items List */}
                  <div className="space-y-6">
                    {filteredItems
                      .filter((i) => i.category === 'BAGELS' || i.category === 'CLASSIQUES')
                      .map((item) => (
                        <div
                          key={item.id}
                          className="group/item flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-5 border-b border-[#EDE8DF] last:border-0 last:pb-0 transition-colors"
                        >
                          <div className="flex-1 pr-2">
                            <div className="flex items-baseline justify-between gap-4">
                              <span className="font-sans font-medium text-base sm:text-lg text-[#1C1917] tracking-tight">
                                {item.name}
                              </span>
                              <span className="font-sans font-normal text-base sm:text-lg text-[#1C1917] whitespace-nowrap">
                                ${item.price.toFixed(2)}
                                {item.secondaryPrice && (
                                  <span className="text-xs text-[#78716C]">
                                    {' '}/ ${item.secondaryPrice.toFixed(2)}
                                  </span>
                                )}
                              </span>
                            </div>

                            <p className="text-xs text-[#6B6560] font-light mt-1 leading-snug max-w-md">
                              {language === 'EN' ? item.description.EN : item.description.FR}
                            </p>

                            {/* Tags & Action row */}
                            <div className="flex items-center justify-between gap-2 mt-2 pt-1">
                              <div className="flex flex-wrap gap-1.5">
                                {item.tags?.map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-[8px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#EFECE6]/80 text-[#524E4A]"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>

                              <button
                                onClick={() => handleQuickAdd(item)}
                                className={`px-3 py-1.5 min-h-[32px] rounded-full text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1 transition-all active:scale-95 ${
                                  addedItemIds[item.id]
                                    ? 'bg-[#3F5A37] text-white'
                                    : 'bg-[#1C1917] text-[#FAF8F5] hover:bg-[#38332E]'
                                }`}
                                title={item.category === 'BAGELS' ? 'Build Bagel' : 'Add to Cart'}
                              >
                                {addedItemIds[item.id] ? (
                                  <Check className="w-3 h-3" />
                                ) : (
                                  <Plus className="w-3 h-3" />
                                )}
                                <span>
                                  {item.category === 'BAGELS' ? 'Customize' : 'Add'}
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Bottom Signature Maison Logo as seen on the physical menu board */}
                <div className="pt-8 mt-8 border-t border-[#E0DACC] flex flex-col items-center justify-center">
                  <MaisonLogo size="md" light={false} />
                </div>

              </div>
            </div>
          </div>

          {/* Column 2: MATCHA & SPECIALTY LATTES Framed Plaque */}
          <div className="relative group">
            {/* Wall Shadow & Dark Walnut Wood Frame */}
            <div className="bg-[#2B1D15]/85 backdrop-blur-md p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.18),0_10px_25px_rgba(0,0,0,0.12)] border border-[#3E2C20]/80">
              {/* Inner Frame Bevel / Paper Inset (Slightly transparent to let wall texture show gently) */}
              <div className="bg-[#FAF8F5]/88 backdrop-blur-md text-[#1C1917] p-6 sm:p-8 md:p-10 rounded-lg sm:rounded-xl border border-[#EAE5DC]/80 shadow-inner flex flex-col justify-between min-h-[520px] relative">
                
                <div>
                  {/* Category Header matching image */}
                  <div className="border-b border-[#E0DACC] pb-4 mb-6">
                    <span className="text-[9px] uppercase tracking-[0.25em] text-[#78716C] font-semibold block mb-1">
                      Menu Plaque • Studio
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-[0.15em] text-[#1C1917] uppercase font-sans">
                      MATCHA &amp; SPECIALTY
                    </h3>
                  </div>

                  {/* Menu Items List */}
                  <div className="space-y-6">
                    {filteredItems
                      .filter((i) => i.category === 'MATCHA_LATTES' || i.category === 'SUPPLEMENTS')
                      .map((item) => (
                        <div
                          key={item.id}
                          className="group/item flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-5 border-b border-[#EDE8DF] last:border-0 last:pb-0 transition-colors"
                        >
                          <div className="flex-1 pr-2">
                            <div className="flex items-baseline justify-between gap-4">
                              <span className="font-sans font-medium text-base sm:text-lg text-[#1C1917] tracking-tight">
                                {item.name}
                              </span>
                              <span className="font-sans font-normal text-base sm:text-lg text-[#1C1917] whitespace-nowrap">
                                ${item.price.toFixed(2)}
                              </span>
                            </div>

                            <p className="text-xs text-[#6B6560] font-light mt-1 leading-snug max-w-md">
                              {language === 'EN' ? item.description.EN : item.description.FR}
                            </p>

                            {/* Tags & Action row */}
                            <div className="flex items-center justify-between gap-2 mt-2 pt-1">
                              <div className="flex flex-wrap gap-1.5">
                                {item.tags?.map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-[8px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#EFECE6]/80 text-[#524E4A]"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>

                              <button
                                onClick={() => handleQuickAdd(item)}
                                className={`px-3 py-1.5 min-h-[32px] rounded-full text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1 transition-all active:scale-95 ${
                                  addedItemIds[item.id]
                                    ? 'bg-[#3F5A37] text-white'
                                    : 'bg-[#1C1917] text-[#FAF8F5] hover:bg-[#38332E]'
                                }`}
                              >
                                {addedItemIds[item.id] ? (
                                  <Check className="w-3 h-3" />
                                ) : (
                                  <Plus className="w-3 h-3" />
                                )}
                                <span>Add</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Bottom Signature Maison Logo as seen on the physical menu board */}
                <div className="pt-8 mt-8 border-t border-[#E0DACC] flex flex-col items-center justify-center">
                  <MaisonLogo size="md" light={false} />
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
