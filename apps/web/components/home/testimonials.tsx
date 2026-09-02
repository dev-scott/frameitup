'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguageStore } from '@/store/use-language-store';
import { Star, Quote, Sparkles, CheckCircle2 } from 'lucide-react';

export function TestimonialsSection() {
  const { language } = useLanguageStore();
  const isFr = language === 'fr';

  const reviews = [
    {
      name: 'Sophie Marceau-Lemaire',
      role: isFr ? 'Architecte d’Intérieur, Paris 7e' : 'Interior Architect, Paris',
      text: isFr
        ? "J’ai confié l’encadrement des tirages d’une galerie haussmannienne à FrameItUp. La régularité des assemblages en chêne et le verre musée anti-reflet sont simplement irréprochables."
        : 'I commissioned FrameItUp for an entire Haussmannian apartment gallery. The flawless oak joinery and reflection-free glass are exceptional.',
      frame: 'Chêne de France Massif',
      rating: 5,
    },
    {
      name: 'Marcus Vance',
      role: isFr ? 'Photographe d’Art, New York' : 'Fine Art Photographer, NYC',
      text: isFr
        ? "En tant que photographe professionnel, la fidélité des tirages papier 100% coton et la neutralité des passe-partout sans acide sont cruciales. FrameItUp est devenu mon atelier attitré."
        : 'As a fine art photographer, archival cotton paper fidelity and acid-free mats are paramount. FrameItUp is now my go-to atelier.',
      frame: 'Aluminium Noir Brossé',
      rating: 5,
    },
    {
      name: 'Elena Rostova',
      role: isFr ? 'Collectionneuse & Artiste, Milan' : 'Collector & Artist, Milan',
      text: isFr
        ? "Le cadre Doré Feuille d'Or a métamorphosé une lithographie ancienne. L'effet de profondeur et la caisse de transport renforcée m'ont impressionnée. Une perfection du début à la fin."
        : 'The Gilded Gold Leaf frame transformed an antique lithograph. The optical depth and armored delivery crate were deeply impressive.',
      frame: "Doré Musée à la Feuille d'Or",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 border-t border-[var(--border)] bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#c59b52]/10 px-3 py-1 text-xs font-semibold text-[#c59b52] border border-[#c59b52]/20">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{isFr ? 'Avis & Critiques' : 'Collector Reviews'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--text-primary)] tracking-tight">
            {isFr ? (
              <>
                Ce que nos collectionneurs <span className="italic text-[#c59b52]">adorent.</span>
              </>
            ) : (
              <>
                What our collectors <span className="italic text-[#c59b52]">cherish.</span>
              </>
            )}
          </h2>

          <p className="text-sm text-[var(--text-muted)] font-sans">
            {isFr
              ? 'Plus de 8 400 tirages et œuvres d’art encadrés pour des particuliers exigeants et des professionnels.'
              : 'Over 8,400 works framed for discerning collectors and design studios worldwide.'}
          </p>
        </div>

        {/* Reviews Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="rounded-3xl p-8 glass-card bg-[var(--bg-card)] border border-[var(--border)] hover:border-[#c59b52]/40 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-[#c59b52]/30" />
                </div>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] italic leading-relaxed font-serif">
                  "{rev.text}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[var(--text-primary)]">{rev.name}</div>
                  <div className="text-[11px] text-[var(--text-muted)]">{rev.role}</div>
                </div>
                <span className="text-[10px] font-semibold text-[#c59b52] bg-[#c59b52]/10 px-2 py-0.5 rounded border border-[#c59b52]/20">
                  {rev.frame}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
