'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguageStore } from '@/store/use-language-store';
import {
  ShieldCheck,
  Award,
  Sparkles,
  TreePine,
  Truck,
  ArrowRight,
  Heart,
  Instagram,
  Facebook,
  Linkedin,
  MapPin,
  Mail,
  Phone,
} from 'lucide-react';

export function Footer() {
  const { language } = useLanguageStore();
  const isFr = language === 'fr';

  const commitments = [
    {
      icon: TreePine,
      title: isFr ? 'Bois Nobles Certifiés FSC' : 'FSC Certified Solid Wood',
      desc: isFr
        ? 'Chêne, noyer et pin issus de forêts éco-gérées en France & Europe.'
        : 'Sustainably sourced oak and walnut from European managed forests.',
    },
    {
      icon: Award,
      title: isFr ? 'Verre Musée Anti-Reflet 99% UV' : '99% UV Museum Glass',
      desc: isFr
        ? 'Protection optique invisible contre la décoloration et le vieillissement.'
        : 'Invisible optical glass protecting your art from light degradation.',
    },
    {
      icon: ShieldCheck,
      title: isFr ? 'Passe-Partout 100% Coton Sans Acide' : '100% Acid-Free Cotton Mats',
      desc: isFr
        ? 'Qualité de conservation muséale garantissant une longévité séculaire.'
        : 'Archival grade conservation matboards built to last generations.',
    },
    {
      icon: Truck,
      title: isFr ? 'Livraison Blindée & Garantie' : 'Armored Delivery & Guarantee',
      desc: isFr
        ? 'Emballage caisse renforcée haute protection. Prêt à être posé.'
        : 'Delivered in shock-absorbent custom crates, ready to hang.',
    },
  ];

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)]/70 text-[var(--text-primary)] transition-colors duration-300">
      {/* Top Value Commitments Row */}
      <div className="border-b border-[var(--border)] py-12 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {commitments.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-start gap-4 group">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#c59b52]/10 text-[#c59b52] border border-[#c59b52]/20 transition-transform group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-xs text-[var(--text-muted)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Col 1 & 2: Brand & Atelier */}
        <div className="lg:col-span-2 space-y-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#c59b52] to-[#926435] text-black font-black text-sm shadow-md">
              <span>F</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-[0.2em] font-serif uppercase">
                FrameItUp
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#c59b52] font-sans -mt-1 font-semibold">
                Haute Encadrement
              </span>
            </div>
          </Link>

          <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-sm">
            {isFr
              ? "Atelier d'encadrement sur-mesure d'exception. Nous sublimons vos photographies, tirages d'art et souvenirs précieux avec des matériaux nobles et des techniques de conservation muséale."
              : 'Premier bespoke framing atelier. Preserving and showcasing your finest photographs, prints, and memories with museum-grade craftsmanship.'}
          </p>

          <div className="space-y-2 text-xs text-[var(--text-secondary)] pt-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-[#c59b52]" />
              <span>Atelier & Showroom : 14 Rue de Charonne, 75011 Paris</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-[#c59b52]" />
              <span>concierge@frameitup.com</span>
            </div>
          </div>
        </div>

        {/* Col 3: Collections */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] font-serif">
            {isFr ? 'Collections' : 'Collections'}
          </h4>
          <ul className="space-y-2 text-xs text-[var(--text-muted)]">
            <li>
              <Link href="/configure" className="hover:text-[#c59b52] transition-colors">
                {isFr ? 'Chêne de France Massif' : 'French Solid Oak'}
              </Link>
            </li>
            <li>
              <Link href="/configure" className="hover:text-[#c59b52] transition-colors">
                {isFr ? 'Noyer Américain Fumé' : 'American Smoked Walnut'}
              </Link>
            </li>
            <li>
              <Link href="/configure" className="hover:text-[#c59b52] transition-colors">
                {isFr ? "Doré Musée à la Feuille d'Or" : 'Gold Leaf Museum Gilt'}
              </Link>
            </li>
            <li>
              <Link href="/configure" className="hover:text-[#c59b52] transition-colors">
                {isFr ? 'Aluminium Brossé Noir Minuit' : 'Brushed Midnight Aluminium'}
              </Link>
            </li>
            <li>
              <Link href="/configure" className="hover:text-[#c59b52] transition-colors">
                {isFr ? 'Caisse Américaine Flottante' : 'Floating Shadowbox'}
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Services */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] font-serif">
            {isFr ? 'Services & Savoir-Faire' : 'Services & Craft'}
          </h4>
          <ul className="space-y-2 text-xs text-[var(--text-muted)]">
            <li>
              <Link href="/configure" className="hover:text-[#c59b52] transition-colors">
                {isFr ? 'Studio de Configuration 3D' : '3D Customizer Studio'}
              </Link>
            </li>
            <li>
              <Link href="/frames" className="hover:text-[#c59b52] transition-colors">
                {isFr ? 'Tirages Papier Fine Art' : 'Fine Art Printing'}
              </Link>
            </li>
            <li>
              <Link href="/orders" className="hover:text-[#c59b52] transition-colors">
                {isFr ? 'Suivi de Commande en Direct' : 'Live Order Tracking'}
              </Link>
            </li>
            <li>
              <Link href="http://localhost:3001" className="hover:text-[#c59b52] transition-colors">
                {isFr ? 'Marketplace Artistes & Tirages 1/1' : 'Art Marketplace Prints'}
              </Link>
            </li>
            <li>
              <Link href="/configure" className="hover:text-[#c59b52] transition-colors">
                {isFr ? 'Service Architectes & B2B' : 'Trade & Interior Architects'}
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 5: Newsletter */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] font-serif">
            {isFr ? 'Le Cercle Privé' : 'Private Circle'}
          </h4>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            {isFr
              ? 'Recevez nos invitations aux ventes privées de tirages d’art et actualités de l’atelier.'
              : 'Receive exclusive invitations to fine art print releases and atelier updates.'}
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert(isFr ? 'Merci pour votre inscription au Cercle Privé.' : 'Thank you for subscribing.');
            }}
            className="flex items-center gap-1.5 pt-1"
          >
            <input
              type="email"
              required
              placeholder={isFr ? 'Votre adresse email' : 'Your email address'}
              className="h-9 w-full rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-3 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-subtle)] focus:border-[#c59b52] focus:outline-none"
            />
            <button
              type="submit"
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#c59b52] text-black hover:bg-[#d4af37] transition-colors"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-[var(--border)] py-6 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-subtle)]">
          <p>© {new Date().getFullYear()} FrameItUp SAS — Atelier d'Encadrement de France. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#c59b52] cursor-pointer">Conditions Générales</span>
            <span className="hover:text-[#c59b52] cursor-pointer">Politique de Confidentialité</span>
            <span className="hover:text-[#c59b52] cursor-pointer">Garantie Musée</span>
          </div>
        </div>
      </div>
    </footer>
  );
}