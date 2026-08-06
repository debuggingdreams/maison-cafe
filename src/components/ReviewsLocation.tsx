import React, { useState } from 'react';
import { REVIEWS } from '../data/menuData';
import { Language } from '../types';
import { Star, MapPin, Clock, Phone, Mail, QrCode, MessageSquarePlus, Navigation } from 'lucide-react';
import { MaisonLogo } from './MaisonLogo';

interface ReviewsLocationProps {
  language: Language;
}

export const ReviewsLocation: React.FC<ReviewsLocationProps> = ({ language }) => {
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newComment, setNewComment] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [reviewsList, setReviewsList] = useState(REVIEWS);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

    setReviewsList([
      {
        id: `r-${Date.now()}`,
        author: newAuthor,
        rating: userRating,
        date: 'Just now',
        comment: newComment,
        location: 'Montreal'
      },
      ...reviewsList
    ]);

    setNewAuthor('');
    setNewComment('');
    setShowWriteReview(false);
  };

  return (
    <section id="location" className="w-full py-12 sm:py-20 px-4 sm:px-6 md:px-12 bg-transparent border-t border-[#1C1917]/20">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 border-b border-[#1C1917]/20 pb-6 sm:pb-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C867D] font-semibold block mb-2">
              08 — Accolades &amp; Location
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-light text-[#1F1C1A] tracking-tight">
              {language === 'EN' ? 'Community & LaSalle Location' : 'Avis & Localisation LaSalle'}
            </h2>
          </div>
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#524E4A] max-w-sm leading-relaxed">
            {language === 'EN'
              ? 'Visit us at 1672 Dollard Ave in LaSalle, Montréal • QC.'
              : 'Visitez-nous au 1672 Av. Dollard à LaSalle, Montréal • QC.'}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10">
          
          {/* Left Column: Community Stories (8 cols) */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8 bg-[#F5F0E8] p-4 sm:p-6 md:p-8 rounded-2xl border border-[#E8E2D5]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DCD4C5] pb-5 sm:pb-6">
              <div>
                <div className="flex items-center gap-1 text-[#D9A05B] mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D9A05B]" />
                  ))}
                  <span className="text-xs font-semibold text-[#1F1C1A] ml-2">4.9 / 5.0 Rating</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1F1C1A]">
                  {language === 'EN' ? 'Accolades & Guest Stories' : 'Avis & Témoignages'}
                </h3>
              </div>

              <button
                onClick={() => setShowWriteReview(true)}
                className="px-5 py-3 min-h-[44px] rounded-full bg-[#1F1C1A] text-[#FAF8F5] text-xs uppercase tracking-[0.18em] font-semibold hover:bg-[#3D3834] transition-all flex items-center justify-center gap-2 active:scale-98 self-start sm:self-auto"
              >
                <MessageSquarePlus className="w-4 h-4 text-[#D9A05B]" />
                <span>{language === 'EN' ? 'Write A Review' : 'Écrire Un Avis'}</span>
              </button>
            </div>

            {/* Write Review Modal */}
            {showWriteReview && (
              <form onSubmit={handleAddReview} className="bg-[#FAF8F5] p-4 sm:p-6 rounded-2xl border border-[#DCD4C5] space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-normal text-base text-[#1F1C1A]">
                    {language === 'EN' ? 'Share your Maison experience' : 'Partagez votre expérience'}
                  </h4>
                  <button
                    type="button"
                    onClick={() => setShowWriteReview(false)}
                    className="text-xs text-[#8C867D] underline p-1"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="Your Name"
                    className="bg-[#FAF8F5] border border-[#DCD4C5] rounded-full px-4 py-2.5 text-xs min-h-[42px] focus:outline-none"
                  />
                  <div className="flex items-center gap-1 bg-[#FAF8F5] px-4 py-2 rounded-full border border-[#DCD4C5] min-h-[42px]">
                    <span className="text-xs text-[#8C867D] mr-2">Rating:</span>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button key={s} type="button" onClick={() => setUserRating(s)} className="p-1">
                        <Star className={`w-4 h-4 ${s <= userRating ? 'fill-[#D9A05B] text-[#D9A05B]' : 'text-[#DCD4C5]'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  rows={3}
                  required
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="What did you think of our Uji matcha or bagels?"
                  className="w-full bg-[#FAF8F5] border border-[#DCD4C5] rounded-2xl p-4 text-xs focus:outline-none"
                />

                <button
                  type="submit"
                  className="px-6 py-3 min-h-[44px] rounded-full bg-[#1F1C1A] text-[#FAF8F5] text-xs uppercase tracking-wider font-semibold active:scale-98"
                >
                  Post Review
                </button>
              </form>
            )}

            {/* Reviews Cards List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {reviewsList.map((rev) => (
                <div key={rev.id} className="bg-[#A8A6A1]/40 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-[#1C1917]/20 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-medium text-sm text-[#1F1C1A]">{rev.author}</span>
                    <span className="text-[10px] text-[#8C867D] font-mono">{rev.date}</span>
                  </div>
                  <div className="flex text-[#D9A05B]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#D9A05B]" />
                    ))}
                  </div>
                  <p className="text-xs text-[#5C544E] font-light leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: QR Code Stand & Location Card (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Table Stand QR Code Card */}
            <div className="bg-[#1F1C1A] text-[#FAF8F5] p-6 sm:p-8 rounded-2xl border border-[#DCD4C5] space-y-5 sm:space-y-6 text-center">
              <MaisonLogo size="md" light={true} />
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#D9A05B] font-semibold block">
                  Tabletop QR Stand
                </span>
                <h4 className="font-serif text-lg sm:text-xl font-light mt-1">Order &amp; Pay From Table</h4>
              </div>

              <div className="bg-white p-3.5 sm:p-4 rounded-xl inline-block shadow-lg mx-auto">
                <QrCode className="w-28 h-28 sm:w-32 sm:h-32 text-[#1F1C1A]" />
              </div>

              <p className="text-[11px] text-[#D6D0C4] font-light leading-relaxed">
                Scan the QR code on your concrete table stand to order bagels and matcha drinks directly.
              </p>
            </div>

            {/* Address & Hours */}
            <div className="bg-[#F5F0E8] p-5 sm:p-6 rounded-2xl border border-[#E8E2D5] space-y-4">
              <h4 className="font-serif text-base sm:text-lg font-normal text-[#1F1C1A] border-b border-[#DCD4C5] pb-2">
                Café LaSalle Details
              </h4>

              <div className="space-y-3 text-xs text-[#5C544E]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#3F5A37] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#1C1917]">1672 Dollard Ave</p>
                    <p>LaSalle, QC H8N 1T8 • Montréal</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#8C5E3C] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#1C1917]">Opening Hours</p>
                    <p>Mon - Wed: 10:00 AM - 08:00 PM</p>
                    <p>Thu - Sun: 10:00 AM - 11:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#1F1C1A] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#1F1C1A]">(514) 368-8888</p>
                  </div>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=1672+Dollard+Ave+LaSalle+QC+H8N+1T8"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 min-h-[44px] rounded-full bg-[#1C1917] text-[#E2DFD8] text-xs uppercase tracking-[0.18em] font-semibold flex items-center justify-center gap-2 hover:bg-[#322E2B] transition-all active:scale-98"
              >
                <Navigation className="w-3.5 h-3.5 text-[#D9A05B]" />
                <span>Get Google Directions</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
