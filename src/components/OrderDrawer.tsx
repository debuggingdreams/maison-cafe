import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CartItem, Language } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle } from 'lucide-react';
import { MaisonLogo } from './MaisonLogo';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  language: Language;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  language,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [pickupTime, setPickupTime] = useState<string>('ASAP (10-15 mins)');
  const [tipPercent, setTipPercent] = useState<number>(18);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [orderCode, setOrderCode] = useState<string>('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const gst = subtotal * 0.05;
  const qst = subtotal * 0.09975;
  const tipAmount = (subtotal * tipPercent) / 100;
  const grandTotal = subtotal + gst + qst + tipAmount;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const code = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderCode(code);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between p-8 overflow-y-auto border-l border-[#DCD4C5]"
      >
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#DCD4C5] mb-6">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#1F1C1A]" />
              <h3 className="font-serif font-normal text-xl text-[#1F1C1A]">
                {language === 'EN' ? 'Your Order' : 'Votre Commande'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#F5F0E8] transition-colors text-[#1F1C1A]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {!isSubmitted ? (
            cart.length === 0 ? (
              <div className="py-20 text-center space-y-3 text-[#8C867D]">
                <MaisonLogo size="md" />
                <p className="text-xs font-serif italic mt-4">
                  {language === 'EN' ? 'Your order selection is empty.' : 'Votre commande est vide.'}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#F5F0E8] p-4 rounded-xl border border-[#E8E2D5] flex items-start justify-between gap-3"
                    >
                      <div className="flex-1">
                        <div className="font-serif font-medium text-sm text-[#1F1C1A]">
                          {item.name}
                        </div>
                        {item.customizations && (
                          <div className="text-[10px] text-[#8C867D] font-light mt-0.5 space-y-0.5">
                            {item.customizations.bagelType && <div>Bagel: {item.customizations.bagelType}</div>}
                            {item.customizations.spreads?.length ? <div>Spread: {item.customizations.spreads.join(', ')}</div> : null}
                            {item.customizations.toppings?.length ? <div>Toppings: {item.customizations.toppings.join(', ')}</div> : null}
                            {item.customizations.milk && <div>Milk: {item.customizations.milk}</div>}
                            {item.customizations.sweetness && <div>Sweetness: {item.customizations.sweetness}</div>}
                          </div>
                        )}
                        <div className="text-xs font-serif text-[#1F1C1A] mt-2">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-[#FAF8F5] border border-[#DCD4C5] rounded-full">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:text-[#1F1C1A] text-[#8C867D]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-medium px-2">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:text-[#1F1C1A] text-[#8C867D]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1 text-[#8C867D] hover:text-red-700"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pickup Time */}
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#8C867D] block mb-2 font-medium">
                    Pickup Time (LaSalle Store)
                  </label>
                  <select
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full bg-[#F5F0E8] border border-[#DCD4C5] text-[#1F1C1A] text-xs rounded-full px-4 py-2.5 focus:outline-none"
                  >
                    <option value="ASAP (10-15 mins)">ASAP (10-15 mins)</option>
                    <option value="In 30 mins">In 30 mins</option>
                    <option value="In 45 mins">In 45 mins</option>
                    <option value="At specified reservation time">At specified reservation time</option>
                  </select>
                </div>

                {/* Tip */}
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#8C867D] block mb-2 font-medium">
                    Barista Gratitude
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[15, 18, 20, 25].map((pct) => (
                      <button
                        key={pct}
                        onClick={() => setTipPercent(pct)}
                        className={`py-2 rounded-full text-xs font-medium border transition-all ${
                          tipPercent === pct
                            ? 'bg-[#1F1C1A] text-[#FAF8F5] border-[#1F1C1A]'
                            : 'bg-[#F5F0E8] text-[#1F1C1A] border-[#DCD4C5]'
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="py-12 space-y-6 text-center">
              <CheckCircle className="w-12 h-12 text-[#4E6E45] mx-auto" />
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#D9A05B]">Order Received</span>
                <h3 className="font-serif text-2xl font-light text-[#1F1C1A] mt-1">#{orderCode}</h3>
                <p className="text-xs text-[#8C867D] mt-2 font-light">
                  Your order is being prepared in our LaSalle kitchen. Show this ticket at the counter upon pickup.
                </p>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-3 rounded-full bg-[#1F1C1A] text-[#FAF8F5] text-xs uppercase tracking-[0.18em] font-medium"
              >
                Close &amp; Finish
              </button>
            </div>
          )}
        </div>

        {/* Total Summary Footer */}
        {!isSubmitted && cart.length > 0 && (
          <div className="border-t border-[#DCD4C5] pt-4 space-y-3">
            <div className="space-y-1 text-xs text-[#8C867D]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%) + QST (9.975%)</span>
                <span>${(gst + qst).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tip ({tipPercent}%)</span>
                <span>${tipAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-serif text-[#1F1C1A] pt-2 border-t border-[#DCD4C5]">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 rounded-full bg-[#1F1C1A] text-[#FAF8F5] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#3D3834] transition-all"
            >
              Submit Order • ${grandTotal.toFixed(2)}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
