import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRESET_DRINKS } from '../data/menuData';
import { PresetDrink, CartItem, Language } from '../types';
import { Sparkles, Plus, Check, Flame, Info, ShoppingBag } from 'lucide-react';
import { MaisonLogo } from './MaisonLogo';

interface DrinkStudioProps {
  language: Language;
  onAddToCart: (item: CartItem) => void;
  onOpenBookingWithDrink?: (drinkName: string) => void;
}

export const DrinkStudio: React.FC<DrinkStudioProps> = ({
  language,
  onAddToCart,
  onOpenBookingWithDrink,
}) => {
  const [selectedPreset, setSelectedPreset] = useState<PresetDrink>(PRESET_DRINKS[0]);
  const [milk, setMilk] = useState<string>('Oat Milk');
  const [sweetness, setSweetness] = useState<string>('Maison Balanced (50%)');
  const [extraMatcha, setExtraMatcha] = useState<boolean>(false);
  const [extraFoam, setExtraFoam] = useState<boolean>(false);
  const [temperature, setTemperature] = useState<'Iced' | 'Hot'>('Iced');
  const [isAdded, setIsAdded] = useState<boolean>(false);

  let totalPrice = selectedPreset.price;
  if (extraMatcha) totalPrice += 1.0;
  if (extraFoam) totalPrice += 0.75;

  let totalCalories = selectedPreset.baseCalories;
  if (milk === 'Whole Milk') totalCalories += 40;
  if (extraMatcha) totalCalories += 10;
  if (extraFoam) totalCalories += 35;

  const handleAdd = () => {
    const item: CartItem = {
      id: `custom-${Date.now()}`,
      menuItemId: selectedPreset.id,
      name: `${selectedPreset.name} (${temperature})`,
      price: totalPrice,
      quantity: 1,
      customizations: {
        milk,
        sweetness,
        extraMatcha,
        notes: extraFoam ? 'With Extra Cold Foam' : undefined
      }
    };
    onAddToCart(item);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section id="drink-studio" className="w-full py-12 sm:py-20 px-4 sm:px-6 md:px-12 bg-transparent border-t border-[#1C1917]/20">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 border-b border-[#1C1917]/20 pb-6 sm:pb-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#78716C] font-semibold block mb-2">
              04 — Beverage Craftsmanship
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-normal text-[#1C1917] tracking-tight">
              {language === 'EN' ? 'Interactive Drink Studio' : 'Studio de Boissons Sur Mesure'}
            </h2>
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#524E4A] mt-2 max-w-xl leading-relaxed">
              {language === 'EN'
                ? 'Design custom layered infusions with ceremonial Uji matcha, espresso shots, oat milk, and sea salt cold foam.'
                : 'Créez des lattes étagés avec matcha Uji, espresso, lait d’avoine et mousse froide.'}
            </p>
          </div>

          {/* Temperature Toggle */}
          <div className="flex items-center gap-1 bg-[#A5A39D]/40 p-1.5 rounded-full border border-[#1C1917]/20 self-start md:self-auto">
            <button
              onClick={() => setTemperature('Iced')}
              className={`px-4 sm:px-5 py-2.5 min-h-[40px] rounded-full text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold transition-all ${
                temperature === 'Iced' ? 'bg-[#1C1917] text-[#E2DFD8] shadow-xs' : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              🧊 {language === 'EN' ? 'Iced Layered' : 'Glacé Étagé'}
            </button>
            <button
              onClick={() => setTemperature('Hot')}
              className={`px-4 sm:px-5 py-2.5 min-h-[40px] rounded-full text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold transition-all ${
                temperature === 'Hot' ? 'bg-[#1C1917] text-[#E2DFD8] shadow-xs' : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              ☕ {language === 'EN' ? 'Steamed Warm' : 'Chaud Moussé'}
            </button>
          </div>
        </div>

        {/* Preset Drink Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
          {PRESET_DRINKS.map((drink) => {
            const isSelected = selectedPreset.id === drink.id;
            return (
              <button
                key={drink.id}
                onClick={() => setSelectedPreset(drink)}
                className={`p-3.5 sm:p-5 rounded-xl sm:rounded-2xl text-left border transition-all relative overflow-hidden active:scale-98 ${
                  isSelected
                    ? 'border-[#1F1C1A] bg-[#1F1C1A] text-[#FAF8F5] shadow-md'
                    : 'border-[#E8E2D5] bg-[#FAF8F5] hover:bg-[#F5F0E8] text-[#1F1C1A]'
                }`}
              >
                <div className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.18em] sm:tracking-[0.2em] opacity-70 mb-1 truncate">
                  {drink.subtitle}
                </div>
                <div className="font-serif font-normal text-sm sm:text-lg leading-snug truncate">
                  {drink.name}
                </div>
                <div className="text-xs font-medium mt-2 sm:mt-3 flex items-center justify-between">
                  <span>${drink.price.toFixed(2)}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold ${
                    isSelected ? 'bg-white/20 text-[#FAF8F5]' : 'bg-[#E8E2D5] text-[#1F1C1A]'
                  }`}>
                    {drink.tags[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Studio Workspace: Visualizer + Customizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Visualizer Column */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-[#F5F0E8] p-8 rounded-2xl border border-[#E8E2D5] relative min-h-[420px]">
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4E6E45] animate-pulse" />
              <span className="text-[10px] font-mono font-medium text-[#1F1C1A] uppercase tracking-wider">
                {temperature} • {selectedPreset.name}
              </span>
            </div>

            {/* Cup Container */}
            <div className="relative w-48 h-80 flex flex-col items-center justify-end my-4">
              <div className="w-48 h-5 border-2 border-[#1F1C1A]/20 rounded-t-full bg-white/40 backdrop-blur-sm z-20 flex items-center justify-center">
                <div className="w-2.5 h-24 bg-[#1F1C1A] rounded-full -mt-20 transform -rotate-6 z-30 opacity-90 shadow-xs" />
              </div>

              <div className="relative w-44 h-72 border-2 border-[#1F1C1A]/20 rounded-b-3xl overflow-hidden bg-white/30 backdrop-blur-md flex flex-col justify-end shadow-inner z-10">
                {temperature === 'Iced' && (
                  <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                    <motion.div
                      animate={{ y: [0, -6, 0], rotate: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                      className="absolute top-6 left-6 w-8 h-8 rounded-lg border border-white/60 bg-white/30 backdrop-blur-md shadow-xs"
                    />
                    <motion.div
                      animate={{ y: [0, 8, 0], rotate: [0, -6, 0] }}
                      transition={{ repeat: Infinity, duration: 3.5, delay: 0.5, ease: 'easeInOut' }}
                      className="absolute top-16 right-8 w-9 h-9 rounded-lg border border-white/60 bg-white/30 backdrop-blur-md shadow-xs"
                    />
                  </div>
                )}

                {temperature === 'Hot' && (
                  <div className="absolute -top-12 inset-x-0 flex justify-center gap-3 pointer-events-none z-30">
                    <motion.div
                      animate={{ y: [-5, -25], opacity: [0, 0.7, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-1.5 h-10 bg-white/80 rounded-full blur-xs"
                    />
                  </div>
                )}

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedPreset.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full flex flex-col justify-end"
                  >
                    {selectedPreset.layers.map((layer, index) => (
                      <motion.div
                        key={layer.name + index}
                        initial={{ height: 0 }}
                        animate={{ height: `${layer.heightPercent}%` }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        style={{
                          backgroundColor: layer.color,
                          opacity: layer.opacity,
                        }}
                        className="w-full relative flex items-center justify-center transition-all group"
                      >
                        <span className="text-[10px] font-medium text-white/90 drop-shadow-sm px-1 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                          {layer.name}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                  <div className="px-3 py-2 rounded-xl bg-white/20 backdrop-blur-xs border border-white/30 shadow-2xs">
                    <MaisonLogo size="md" light={false} className="drop-shadow-[0_1px_3px_rgba(255,255,255,0.95)]" />
                  </div>
                </div>
              </div>

              <div className="w-36 h-3 bg-black/5 rounded-full blur-sm mt-2" />
            </div>

            {/* Legend */}
            <div className="w-full mt-4 space-y-1.5 bg-white/80 p-3.5 rounded-xl border border-[#E8E2D5]">
              <span className="text-[10px] font-medium text-[#8C867D] uppercase tracking-[0.2em] block mb-1">
                Layer Breakdown
              </span>
              {selectedPreset.layers.map((layer, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs text-[#1F1C1A]">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/10 shadow-xs"
                      style={{ backgroundColor: layer.color }}
                    />
                    <span>{layer.name}</span>
                  </div>
                  <span className="text-[11px] text-[#8C867D] italic">{layer.flavor}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-normal text-[#1F1C1A]">
                {selectedPreset.name}
              </h3>
              <p className="text-xs text-[#5C544E] font-light mt-1 leading-relaxed">
                {selectedPreset.description}
              </p>
            </div>

            {/* Milk Selection */}
            <div>
              <label className="text-[10px] font-semibold text-[#8C867D] uppercase tracking-[0.2em] block mb-2">
                {language === 'EN' ? 'Choice of Milk / Alternative' : 'Choix du Lait / Végétal'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Oat Milk', 'Almond Milk', 'Whole Milk', 'Coconut Milk'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setMilk(option)}
                    className={`py-2.5 px-3 min-h-[42px] rounded-full text-xs font-semibold border text-center transition-all active:scale-95 ${
                      milk === option
                        ? 'border-[#1F1C1A] bg-[#1F1C1A] text-[#FAF8F5]'
                        : 'border-[#DCD4C5] bg-[#FAF8F5] text-[#1F1C1A] hover:bg-[#F5F0E8]'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Sweetness Selector */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] font-semibold text-[#8C867D] uppercase tracking-[0.2em]">
                  {language === 'EN' ? 'Sweetness Level' : 'Niveau de Sucre'}
                </label>
                <span className="text-xs text-[#1F1C1A] font-semibold">{sweetness}</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                {[
                  { label: '0%', val: 'Unsweetened (0%)' },
                  { label: '25%', val: 'Subtle Sweet (25%)' },
                  { label: '50%', val: 'Maison Balanced (50%)' },
                  { label: '100%', val: 'Sweet Tooth (100%)' },
                ].map((lvl) => (
                  <button
                    key={lvl.label}
                    onClick={() => setSweetness(lvl.val)}
                    className={`py-2.5 min-h-[42px] rounded-full text-xs font-semibold border transition-all active:scale-95 ${
                      sweetness === lvl.val
                        ? 'border-[#1F1C1A] bg-[#1F1C1A] text-[#FAF8F5]'
                        : 'border-[#DCD4C5] bg-[#FAF8F5] text-[#1F1C1A] hover:bg-[#F5F0E8]'
                    }`}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Extra Enhancements */}
            <div>
              <label className="text-[10px] font-semibold text-[#8C867D] uppercase tracking-[0.2em] block mb-2">
                {language === 'EN' ? 'Signature Enhancements' : 'Suppléments Maison'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <button
                  onClick={() => setExtraMatcha(!extraMatcha)}
                  className={`p-3.5 min-h-[44px] rounded-xl border flex items-center justify-between text-left transition-all active:scale-98 ${
                    extraMatcha
                      ? 'border-[#4E6E45] bg-[#E8EFE5] text-[#2C4222]'
                      : 'border-[#DCD4C5] bg-[#FAF8F5] text-[#1F1C1A] hover:bg-[#F5F0E8]'
                  }`}
                >
                  <div>
                    <div className="text-xs font-semibold">+ Extra Uji Matcha Shot</div>
                    <div className="text-[10px] text-[#8C867D]">Concentrated ceremonial matcha</div>
                  </div>
                  <span className="text-xs font-semibold">+$1.00</span>
                </button>

                <button
                  onClick={() => setExtraFoam(!extraFoam)}
                  className={`p-3.5 min-h-[44px] rounded-xl border flex items-center justify-between text-left transition-all active:scale-98 ${
                    extraFoam
                      ? 'border-[#D9A05B] bg-[#FAF2E6] text-[#6F4E37]'
                      : 'border-[#DCD4C5] bg-[#FAF8F5] text-[#1F1C1A] hover:bg-[#F5F0E8]'
                  }`}
                >
                  <div>
                    <div className="text-xs font-semibold">+ Cold Foam Cloud</div>
                    <div className="text-[10px] text-[#8C867D]">Sea salt cream foam</div>
                  </div>
                  <span className="text-xs font-semibold">+$0.75</span>
                </button>
              </div>
            </div>

            {/* Price & Action */}
            <div className="pt-4 sm:pt-6 border-t border-[#DCD4C5] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center justify-between sm:justify-start gap-4 text-xs text-[#8C867D]">
                <div className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-[#D9A05B]" />
                  <span className="font-semibold text-[#1F1C1A]">{totalCalories}</span> kcal
                </div>
                <span>• {milk}</span>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                <div className="flex items-center justify-between sm:block text-left sm:text-right">
                  <span className="text-[10px] text-[#8C867D] uppercase tracking-wider block">Total Price</span>
                  <span className="text-2xl font-serif text-[#1F1C1A]">${totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAdd}
                    className={`flex-1 sm:flex-none px-6 py-3.5 min-h-[44px] rounded-full font-semibold text-xs uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-all active:scale-98 ${
                      isAdded ? 'bg-[#4E6E45] text-white' : 'bg-[#1F1C1A] text-[#FAF8F5] hover:bg-[#3D3834]'
                    }`}
                  >
                    {isAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                    <span>{isAdded ? 'Added' : 'Add to Order'}</span>
                  </button>

                  {onOpenBookingWithDrink && (
                    <button
                      onClick={() => onOpenBookingWithDrink(selectedPreset.name)}
                      className="px-4 py-3.5 min-h-[44px] rounded-full border border-[#1F1C1A] text-[#1F1C1A] hover:bg-[#F5F0E8] text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-1 active:scale-98"
                      title="Pre-order drink for reservation"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Reserve</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
