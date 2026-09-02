'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguageStore } from '@/store/use-language-store';
import { ShieldCheck, Award, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export function StatsSection() {
  const { language } = useLanguageStore();
  const isFr = language === 'fr';

  const stats = [
    {
      value: '50 000+',
      label: isFr ? 'Cadres d’Art Façonnés' : 'Frames Handcrafted',
      desc: isFr ? 'Dans notre atelier d’ébénisterie d’art.' : 'In our master joinery workshop.',
    },
    {
      value: '99%',
      label: isFr ? 'Protection UV Musée' : 'UV Museum Protection',
      desc: isFr ? 'Verre optique Claryl ultra-pur sans reflet.' : 'Invisible reflection-free optical glass.',
    },
    {
      value: '100%',
      label: isFr ? 'Coton & Sans Acide' : '100% Acid-Free Cotton',
      desc: isFr ? 'Passe-partout de conservation séculaire.' : 'Centennial archival conservation mats.',
    },
    {
      value: '4.9 / 5',
      label: isFr ? 'Note de Satisfaction' : 'Customer Satisfaction',
      desc: isFr ? 'Recommandé par 8 400+ amateurs d’art.' : 'Recommended by 8,400+ art lovers.',
    },
  ];

  return (
    <section className="py-20 border-t border-[var(--border)] bg-[var(--bg-secondary)]/30 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 glass-card bg-[var(--bg-card)]/80 border border-[var(--border-gold)] shadow-xl backdrop-blur-xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border)]">
            {stats.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`space-y-2 text-center ${idx > 0 ? 'pt-6 lg:pt-0 lg:pl-8' : ''}`}
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#c59b52] tracking-tight">
                  {item.value}
                </div>
                <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  {item.label}
                </div>
                <p className="text-xs text-[var(--text-muted)] max-w-[200px] mx-auto">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
