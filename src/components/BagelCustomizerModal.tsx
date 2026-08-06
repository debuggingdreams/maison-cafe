import React, { useState } from 'react';
import { MenuItem, CartItem, Language } from '../types';
import { X, ShoppingBag } from 'lucide-react';

interface BagelCustomizerModalProps {
  bagel: MenuItem;
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const BagelCustomizerModal: React.FC<BagelCustomizerModalProps> = ({
  bagel,
  language,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [bagelType, setBagelType] = useState<'Nature' | 'Sésame' | 'Everything'>('Sésame');
  const [toastLevel, setToastLevel] = useState<'Medium Toast' | 'Extra Crisp'>('Medium Toast');
  const [spread, setSpread] = useState<'Cream Cheese' | 'Herb Spread' | 'Vegan Spread'>('Cream Cheese');
  const [extraCapres, setExtraCapres] = useState<boolean>(false);
  const [extraOnions, setExtraOnions] = useState<boolean>(false);

  if (!isOpen) return null;

  let extraPrice = 0;
  if (extraCapres) extraPrice += 0.5;
  if (extraOnions) extraPrice += 0.5;
  const totalPrice = bagel.price + extraPrice;

  const handleAdd = () => {
    const item: CartItem = {
      id: `bagel-${bagel.id}-${Date.now()}`,
      menuItemId: bagel.id,
      name: `${bagel.name} Bagel (${bagelType})`,
      price: totalPrice,
      quantity: 1,
      customizations: {
        bagelType,
        notes: `${toastLevel}, ${spread}${extraCapres ? ', Extra Capers' : ''}${extraOnions ? ', Extra Pickled Onions' : ''}`
      }
    };
    onAddToCart(item);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-[#FAF8F5] border border-[#DCD4C5] rounded-3xl max-w-lg w-full p-8 shadow-2xl relative space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#F5F0E8] transition-colors text-[#1F1C1A]"
        >
          <X className="w-4 h-4" />
        </button>

        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C867D] block mb-1">
            Wood-Fired Bagel Bar
          </span>
          <h3 className="text-2xl font-serif font-normal text-[#1F1C1A]">
            {bagel.name}
          </h3>
          <p className="text-xs text-[#5C544E] font-light mt-1">
            {language === 'EN' ? bagel.description.EN : bagel.description.FR}
          </p>
        </div>

        {/* Bagel Variety */}
        <div>
          <label className="text-[10px] uppercase tracking-[0.2em] text-[#8C867D] block mb-2 font-medium">
            {language === 'EN' ? 'Choose Bagel Variety' : 'Choix du Bagel'}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['Nature', 'Sésame', 'Everything'] as const).map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBagelType(b)}
                className={`py-2 px-3 rounded-full text-xs font-medium border text-center transition-all ${
                  bagelType === b
                    ? 'bg-[#1F1C1A] text-[#FAF8F5] border-[#1F1C1A]'
                    : 'bg-[#FAF8F5] text-[#1F1C1A] border-[#DCD4C5] hover:bg-[#F5F0E8]'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Toasting */}
        <div>
          <label className="text-[10px] uppercase tracking-[0.2em] text-[#8C867D] block mb-2 font-medium">
            Toasting Preference
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['Medium Toast', 'Extra Crisp'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setToastLevel(t)}
                className={`py-2 px-3 rounded-full text-xs font-medium border text-center transition-all ${
                  toastLevel === t
                    ? 'bg-[#1F1C1A] text-[#FAF8F5] border-[#1F1C1A]'
                    : 'bg-[#FAF8F5] text-[#1F1C1A] border-[#DCD4C5] hover:bg-[#F5F0E8]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-[#DCD4C5] flex items-center justify-between">
          <span className="text-2xl font-serif text-[#1F1C1A]">${totalPrice.toFixed(2)}</span>
          <button
            onClick={handleAdd}
            className="px-8 py-3.5 rounded-full bg-[#1F1C1A] text-[#FAF8F5] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#3D3834] transition-all flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4 text-[#D9A05B]" />
            <span>Add Bagel To Order</span>
          </button>
        </div>

      </div>
    </div>
  );
};
