'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguageStore } from '@/store/use-language-store';
import { UploadCloud, ArrowRight, ShieldCheck, Truck, Sparkles, CheckCircle2 } from 'lucide-react';

export function CtaSection() {
  const { language } = useLanguageStore();
  const isFr = language === 'fr';

  return (
    <section className="py-24 border-t border-[var(--border)] bg-[var(--bg-secondary)]/50 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-r from-[#c59b52]/15 via-[#dfc397]/10 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative">
        <div className="rounded-3xl p-10 sm:p-16 text-center glass-card bg-[var(--bg-card)]/90 border border-[var(--border-gold)] shadow-2xl backdrop-blur-2xl space-y-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#c59b52]/10 px-3.5 py-1 text-xs font-semibold text-[#c59b52] border border-[#c59b52]/25">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{isFr ? 'Prêt à sublimer vos murs ?' : 'Ready to elevate your walls?'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[var(--text-primary)] tracking-tight max-w-2xl mx-auto leading-tight">
            {isFr ? (
              <>
                Donnez à vos images la place <br />
                <span className="italic text-[#c59b52]">qu’elles méritent.</span>
              </>
            ) : (
              <>
                Give your finest memories <br />
                <span className="italic text-[#c59b52]">the home they deserve.</span>
              </>
            )}
          </h2>

          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-lg mx-auto font-sans leading-relaxed">
            {isFr
              ? 'Importez votre photo aujourd’hui et visualisez instantanément votre futur encadrement d’art dans notre studio 3D.'
              : 'Upload your photo today and preview your bespoke museum frame in real-time within our 3D studio.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/configure"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#c59b52] via-[#d4af37] to-[#b08140] px-8 py-4 text-xs font-bold uppercase tracking-widest text-black shadow-lg shadow-[#c59b52]/30 hover:shadow-xl hover:shadow-[#c59b52]/50 transition-all hover:scale-105 active:scale-95"
            >
              <UploadCloud className="h-4 w-4" />
              <span>{isFr ? 'Créer mon encadrement sur-mesure' : 'Design your custom frame'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="pt-6 border-t border-[var(--border)]/70 flex flex-wrap items-center justify-center gap-6 text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#c59b52]" />
              <span>{isFr ? 'Fait main à Paris' : 'Handmade in Paris'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#c59b52]" />
              <span>{isFr ? 'Verre Anti-Reflet 99% UV' : '99% UV Anti-Reflective Glass'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#c59b52]" />
              <span>{isFr ? 'Expédition blindée sous 3–5 jours' : 'Armored shipping in 3–5 days'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
