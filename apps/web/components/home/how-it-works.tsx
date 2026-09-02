'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguageStore } from '@/store/use-language-store';
import { UploadCloud, Sliders, Truck, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export function HowItWorksSection() {
  const { language } = useLanguageStore();
  const isFr = language === 'fr';

  const steps = [
    {
      number: '01',
      icon: UploadCloud,
      title: isFr ? '1. Téléversez votre image' : '1. Upload your artwork',
      desc: isFr
        ? "Glissez votre photo, tirage d'art ou document. Nous vérifions la résolution et optimisons les couleurs pour une impression d'art sur papier Hahnemühle 310g."
        : 'Drag and drop your photograph or artwork. We inspect resolution and calibrate colors for gallery-grade Hahnemühle 310g fine art prints.',
      tag: isFr ? 'Haute Définition' : 'Ultra HD Print',
    },
    {
      number: '02',
      icon: Sliders,
      title: isFr ? '2. Composez votre encadrement' : '2. Craft your bespoke frame',
      desc: isFr
        ? 'Choisissez parmi nos moulures en chêne, noyer ou or vieilli. Ajustez les marges du passe-partout coton et optez pour notre verre optique Claryl 99% UV.'
        : 'Select solid oak, walnut, or gilded wood moulding. Adjust acid-free cotton mat margins and choose our signature 99% UV anti-reflective glass.',
      tag: isFr ? 'Bois FSC & Verre Musée' : 'FSC Wood & Museum Glass',
    },
    {
      number: '03',
      icon: Truck,
      title: isFr ? '3. Réceptionnez prêt à poser' : '3. Delivered ready to hang',
      desc: isFr
        ? "Votre œuvre est soigneusement assemblée à la main dans notre atelier parisien, puis expédiée dans une caisse antichoc avec fixations murales incluses."
        : 'Carefully hand-assembled in our Paris atelier and shipped in reinforced custom crates with all premium hanging hardware included.',
      tag: isFr ? 'Livraison Blindée 3–5j' : 'Crated Delivery 3–5d',
    },
  ];

  return (
    <section className="py-24 border-t border-[var(--border)] bg-[var(--bg-secondary)]/40 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#c59b52]/10 px-3 py-1 text-xs font-semibold text-[#c59b52] border border-[#c59b52]/20">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{isFr ? 'Le Savoir-Faire' : 'The Atelier Process'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--text-primary)] tracking-tight">
            {isFr ? (
              <>
                L'art de l'encadrement, <span className="italic text-[#c59b52]">rendu évident.</span>
              </>
            ) : (
              <>
                Framing made <span className="italic text-[#c59b52]">effortless.</span>
              </>
            )}
          </h2>

          <p className="text-sm text-[var(--text-muted)] font-sans">
            {isFr
              ? 'Trois étapes simples entre votre fichier numérique et une œuvre d’art digne d’une galerie sur votre mur.'
              : 'Three seamless steps from your digital file to a museum-worthy framed piece on your wall.'}
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative rounded-3xl p-8 glass-card bg-[var(--bg-card)] border border-[var(--border)] hover:border-[#c59b52]/50 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c59b52]/10 text-[#c59b52] border border-[#c59b52]/20 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-serif font-bold text-2xl text-[var(--text-subtle)]/40 group-hover:text-[#c59b52]/60 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[var(--text-primary)] font-serif">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--border)]/60 flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1 font-medium text-[#c59b52]">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {step.tag}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/configure"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#c59b52] to-[#b08140] px-7 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-md hover:shadow-lg transition-all"
          >
            <span>{isFr ? 'Commencer mon encadrement' : 'Start your custom frame'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
