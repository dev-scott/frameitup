'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguageStore } from '@/store/use-language-store';
import { Sparkles, ArrowRight, Check, Eye } from 'lucide-react';

const COLLECTIONS = [
  {
    id: 'chene-massif',
    name: 'Chêne Massif de France',
    material: 'Bois Noble FSC',
    description: 'Baguette en chêne brut aux veines chaleureuses et authentiques. Idéal pour tirages d’art et photographies contemporaines.',
    colorHex: '#C8A261',
    price: 'dès 69€',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=700&q=80',
    depth: '35 mm',
    finish: 'Naturel Satiné',
    badge: 'Coup de Cœur Atelier',
  },
  {
    id: 'noyer-fume',
    name: 'Noyer Américain Fumé',
    material: 'Bois Précieux',
    description: 'Teinte chocolatée profonde et grain soyeux. Apporte un contraste spectaculaire et une élégance intemporelle.',
    colorHex: '#4A2E18',
    price: 'dès 89€',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=700&q=80',
    depth: '45 mm',
    finish: 'Huilé Fumé',
    badge: 'Best-Seller',
  },
  {
    id: 'dore-feuille',
    name: "Doré Musée à la Feuille d'Or",
    material: 'Composite & Feuille d’Or',
    description: 'Patiné à la main selon la tradition des maîtres doreurs. Crée un éclat majestueux digne des plus grands musées.',
    colorHex: '#D4AF37',
    price: 'dès 119€',
    image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=700&q=80',
    depth: '60 mm',
    finish: 'Or Antique Patiné',
    badge: 'Prestige Musée',
  },
  {
    id: 'alu-noir',
    name: 'Aluminium Brossé Noir Minuit',
    material: 'Aluminium Aéronautique',
    description: 'Profil ultrafin et rigide avec finition anodisée noir mat. L’excellence pour les galeries d’art et intérieurs épurés.',
    colorHex: '#1A1A1A',
    price: 'dès 59€',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=700&q=80',
    depth: '30 mm',
    finish: 'Anodisé Noir Mat',
    badge: 'Design Minimaliste',
  },
  {
    id: 'caisse-americaine',
    name: 'Caisse Américaine Flottante',
    material: 'Chêne Noir Flottant',
    description: 'L’œuvre semble flotter en lévitation sans toucher la bordure. L’encadrement de référence pour toiles et tirages rigides.',
    colorHex: '#2C2016',
    price: 'dès 99€',
    image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=700&q=80',
    depth: '50 mm',
    finish: 'Effet Flottant 15mm',
    badge: 'Art Moderne',
  },
  {
    id: 'pin-blanc',
    name: 'Pin Scandinave Blanchi',
    material: 'Bois Clair FSC',
    description: 'Douceur nordique et clarté lumineuse. Met en valeur les aquarelles, pastels et photographies minimalistes.',
    colorHex: '#EAE4DC',
    price: 'dès 49€',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=700&q=80',
    depth: '30 mm',
    finish: 'Cérusé Blanc',
    badge: 'Nordic Light',
  },
];

export function FrameShowcaseSection() {
  const { language } = useLanguageStore();
  const isFr = language === 'fr';

  return (
    <section className="py-24 border-t border-[var(--border)] bg-[var(--bg-primary)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[var(--border)]">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#c59b52]/10 px-3 py-1 text-xs font-semibold text-[#c59b52] border border-[#c59b52]/20">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{isFr ? 'Collections de Moulures' : 'Moulding Collections'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--text-primary)] tracking-tight">
              {isFr ? (
                <>
                  Matières nobles & <span className="italic text-[#c59b52]">finitions d’atelier.</span>
                </>
              ) : (
                <>
                  Noble materials & <span className="italic text-[#c59b52]">artisan finishes.</span>
                </>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              {isFr
                ? 'Tous nos cadres sont taillés, assemblés et contrôlés individuellement à Paris.'
                : 'Every single frame is milled, joined, and inspected by hand in our Parisian atelier.'}
            </p>
          </div>

          <Link
            href="/configure"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#c59b52] hover:underline"
          >
            <span>{isFr ? 'Voir toutes les options' : 'Explore all frames'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Frames Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COLLECTIONS.map((frame, idx) => (
            <motion.div
              key={frame.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group rounded-3xl p-6 glass-card bg-[var(--bg-card)] border border-[var(--border)] hover:border-[#c59b52]/50 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Showcase */}
                <div className="relative h-64 w-full rounded-2xl overflow-hidden bg-[var(--bg-secondary)] flex items-center justify-center p-4">
                  <div
                    style={{
                      borderWidth: '12px',
                      borderColor: frame.colorHex,
                    }}
                    className="relative w-44 h-52 rounded shadow-lg overflow-hidden transition-transform duration-500 group-hover:scale-105"
                  >
                    <Image
                      src={frame.image}
                      alt={frame.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Badge */}
                  <span className="absolute top-4 left-4 rounded-full bg-[var(--bg-primary)]/90 px-2.5 py-1 text-[10px] font-bold text-[#c59b52] border border-[var(--border)] backdrop-blur-md shadow-sm">
                    {frame.badge}
                  </span>
                </div>

                {/* Details */}
                <div className="mt-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[var(--text-subtle)] uppercase tracking-wider">
                      {frame.material}
                    </span>
                    <span className="font-mono font-bold text-sm text-[#c59b52]">
                      {frame.price}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[var(--text-primary)] font-serif">
                    {frame.name}
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                    {frame.description}
                  </p>
                </div>
              </div>

              {/* Specs and Configure Action */}
              <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between">
                <div className="text-[11px] text-[var(--text-muted)] flex items-center gap-3">
                  <span>Profondeur : <strong className="text-[var(--text-primary)]">{frame.depth}</strong></span>
                </div>

                <Link
                  href="/configure"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#c59b52]/10 hover:bg-[#c59b52] text-[#c59b52] hover:text-black px-3 py-1.5 text-xs font-bold transition-colors"
                >
                  <span>{isFr ? 'Choisir' : 'Select'}</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
