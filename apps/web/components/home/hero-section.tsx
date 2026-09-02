'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguageStore } from '@/store/use-language-store';
import {
  ArrowRight,
  Star,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  CheckCircle2,
  Layers,
  Award,
} from 'lucide-react';

interface FrameFeaturedItem {
  id: string;
  name: string;
  color: string;
  borderStyle: string;
  mat: string;
  matColor: string;
  price: string;
  image: string;
  title: string;
}

const FEATURED_FRAMES: FrameFeaturedItem[] = [
  {
    id: 'chene',
    name: 'Chêne de France',
    color: '#C8A261',
    borderStyle: 'border-[#C8A261]',
    mat: 'Blanc Galerie',
    matColor: '#FAFAF9',
    price: 'dès 69€',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    title: 'Harmonie Végétale',
  },
  {
    id: 'noyer',
    name: 'Noyer Américain',
    color: '#4A2E18',
    borderStyle: 'border-[#4A2E18]',
    mat: 'Crème Chaleureux',
    matColor: '#F5EFEB',
    price: 'dès 89€',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    title: 'Abstraction Contemporaine',
  },
  {
    id: 'dore',
    name: "Doré Feuille d'Or",
    color: '#D4AF37',
    borderStyle: 'border-[#D4AF37]',
    mat: 'Noir Charbon',
    matColor: '#24211E',
    price: 'dès 119€',
    image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=800&q=80',
    title: 'Architecture & Ombres',
  },
  {
    id: 'alu',
    name: 'Aluminium Brossé',
    color: '#1A1A1A',
    borderStyle: 'border-[#1A1A1A]',
    mat: 'Blanc Coton',
    matColor: '#FFFFFF',
    price: 'dès 59€',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
    title: 'Minimalisme Urbain',
  },
];

export function HeroSection() {
  const { language } = useLanguageStore();
  const isFr = language === 'fr';
  const [selectedFrame, setSelectedFrame] = useState<FrameFeaturedItem>(FEATURED_FRAMES[0]!);

  const activeFrame = selectedFrame ?? FEATURED_FRAMES[0]!;

  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle Luxury Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] h-[300px] sm:h-[500px] bg-gradient-to-tr from-[#c59b52]/15 via-[#dfc397]/5 to-transparent rounded-full blur-[90px] sm:blur-[120px] pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Atelier Label Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#c59b52]/30 bg-[#c59b52]/10 px-3.5 py-1 text-xs font-semibold text-[#c59b52]"
            >
              <Award className="h-3.5 w-3.5" />
              <span>{isFr ? "Atelier d'Encadrement Sur-Mesure • Paris" : 'Bespoke Custom Framing Atelier • Paris'}</span>
            </motion.div>

            {/* Main Editorial Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[var(--text-primary)] leading-[1.15]">
                {isFr ? (
                  <>
                    Vos plus beaux tirages, <br />
                    <span className="italic font-normal text-[#c59b52]">sublimés à la main.</span>
                  </>
                ) : (
                  <>
                    Your cherished art, <br />
                    <span className="italic font-normal text-[#c59b52]">framed to perfection.</span>
                  </>
                )}
              </h1>
              <p className="text-xs sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-xl mx-auto lg:mx-0 font-sans">
                {isFr
                  ? "Importez votre photo ou œuvre. Choisissez vos moulures en bois noble et votre vitrage musée anti-reflet. Fabrication artisanale et expédition sous 3 à 5 jours."
                  : 'Upload your photo. Customise with sustainable European solid woods and invisible 99% UV museum glass. Handcrafted and delivered ready to hang.'}
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 sm:gap-4 pt-2"
            >
              <Link
                href="/configure"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#c59b52] to-[#b08140] px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-black shadow-lg shadow-[#c59b52]/25 hover:shadow-xl hover:shadow-[#c59b52]/40 transition-all hover:scale-[1.02] active:scale-95"
              >
                <UploadCloud className="h-4 w-4" />
                <span>{isFr ? 'Créer mon cadre sur-mesure' : 'Design my frame'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              <Link
                href="/frames"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-card)] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] hover:border-[#c59b52] hover:text-[#c59b52] transition-all"
              >
                <span>{isFr ? 'Voir les moulures' : 'Explore frames'}</span>
              </Link>
            </motion.div>

            {/* Trust & Social Proof Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5 sm:gap-6 text-xs text-[var(--text-muted)] border-t border-[var(--border)]/70"
            >
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-[var(--text-primary)]">4.9 / 5</span>
                <span>(2,400+ avis)</span>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#c59b52]" />
                <span>{isFr ? 'Garantie à vie & Verre 99% UV' : 'Lifetime Guarantee & 99% UV'}</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Live Luxury Frame Preview */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Studio Frame Card */}
              <div className="relative rounded-3xl p-5 sm:p-8 glass-card bg-[var(--bg-card)]/90 border border-[var(--border-gold)] shadow-2xl backdrop-blur-xl">
                {/* Visual Art in Frame with Dynamic Border */}
                <div className="relative mx-auto flex items-center justify-center p-3 sm:p-6 rounded-2xl bg-[var(--bg-secondary)] shadow-inner">
                  <div
                    style={{
                      borderWidth: '14px',
                      borderColor: activeFrame.color,
                      backgroundColor: activeFrame.matColor,
                    }}
                    className="relative p-4 sm:p-7 rounded-lg shadow-2xl transition-all duration-500 overflow-hidden"
                  >
                    {/* The artwork */}
                    <div className="relative w-44 h-56 sm:w-60 sm:h-76 md:w-64 md:h-80 overflow-hidden rounded shadow-sm">
                      <Image
                        src={activeFrame.image}
                        alt={activeFrame.title}
                        fill
                        sizes="(max-width: 640px) 200px, 300px"
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        priority
                      />
                      {/* Glass light reflection simulation */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Frame Selector Pills */}
                <div className="mt-5 sm:mt-6 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[var(--text-secondary)]">
                      {isFr ? 'Moulure sélectionnée :' : 'Selected moulding :'}
                    </span>
                    <span className="font-serif font-bold text-[#c59b52]">
                      {activeFrame.name} • {activeFrame.price}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {FEATURED_FRAMES.map((f) => {
                      const isActive = activeFrame.id === f.id;
                      return (
                        <button
                          key={f.id}
                          onClick={() => setSelectedFrame(f)}
                          className={`group flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all ${
                            isActive
                              ? 'border-[#c59b52] bg-[#c59b52]/10 shadow-sm'
                              : 'border-[var(--border)] hover:border-[var(--border-strong)] bg-[var(--bg-primary)]'
                          }`}
                        >
                          <div
                            style={{ backgroundColor: f.color }}
                            className="h-3.5 sm:h-4 w-full rounded-md shadow-sm transition-transform group-hover:scale-105"
                          />
                          <span className="text-[10px] font-medium text-[var(--text-secondary)] truncate w-full text-center">
                            {f.name.split(' ')[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Live Customizer Link */}
                <div className="mt-4 sm:mt-5 pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs">
                  <span className="text-[var(--text-muted)] text-[11px] sm:text-xs">
                    {isFr ? 'Format A3 • Verre Anti-Reflet' : 'A3 Format • Anti-Reflective'}
                  </span>
                  <Link
                    href="/configure"
                    className="font-bold text-[#c59b52] hover:underline flex items-center gap-1 text-[11px] sm:text-xs"
                  >
                    <span>{isFr ? 'Personnaliser ce cadre' : 'Customize this frame'}</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
