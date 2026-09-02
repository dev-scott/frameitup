'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs';
import { useLanguageStore } from '@/store/use-language-store';
import {
  Sparkles,
  Sun,
  Moon,
  Menu,
  X,
  Globe,
  ArrowRight,
  Package,
  Layers,
  Palette,
  ShieldCheck,
  ShoppingBag,
  Compass,
} from 'lucide-react';

export function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { t, language, setLanguage } = useLanguageStore();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const navLinks = [
    {
      href: '/configure',
      label: language === 'fr' ? 'Studio Sur-Mesure' : 'Custom Studio',
      icon: Layers,
      highlight: true,
    },
    {
      href: '/frames',
      label: language === 'fr' ? 'Collections' : 'Collections',
      icon: Compass,
    },
    {
      href: '/orders',
      label: language === 'fr' ? 'Mes Commandes' : 'My Orders',
      icon: Package,
      authRequired: true,
    },
    {
      href: 'http://localhost:3001',
      label: language === 'fr' ? 'Galerie Artistes' : 'Marketplace',
      icon: Palette,
      external: true,
      badge: 'Art',
    },
  ];

  const isDark = resolvedTheme === 'dark';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4">
      <div
        className={`mx-auto max-w-7xl rounded-2xl transition-all duration-300 ${
          scrolled
            ? 'glass-card bg-[var(--bg-primary)]/90 shadow-xl border border-[var(--border-gold)] backdrop-blur-2xl py-2.5 sm:py-3 px-4 sm:px-6'
            : 'bg-[var(--bg-primary)]/60 border border-[var(--border)]/70 backdrop-blur-md py-3 sm:py-4 px-4 sm:px-6'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo & Brand Hallmark */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group select-none">
            <div className="relative flex h-8 sm:h-9 w-8 sm:w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#d4af37] via-[#c59b52] to-[#844819] text-black font-black text-xs sm:text-sm shadow-md shadow-[#c59b52]/30 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[#c59b52]/50">
              <span>F</span>
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-tr from-[#d4af37] to-transparent opacity-0 group-hover:opacity-40 transition-opacity -z-10 blur-[2px]" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-bold tracking-[0.18em] font-serif text-[var(--text-primary)] uppercase transition-colors group-hover:text-[#c59b52]">
                FrameItUp
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[var(--text-subtle)] font-sans -mt-1 font-semibold">
                Atelier Paris
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className={`relative text-[11px] xl:text-xs uppercase tracking-[0.14em] font-semibold transition-all duration-200 py-1.5 flex items-center gap-1.5 group ${
                    active
                      ? 'text-[#c59b52]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 transition-transform group-hover:scale-110 ${active ? 'text-[#c59b52]' : 'text-[var(--text-subtle)]'}`} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="rounded-full bg-[#c59b52]/15 px-1.5 py-0.2 text-[8px] font-bold text-[#c59b52] border border-[#c59b52]/30">
                      {link.badge}
                    </span>
                  )}
                  {active && (
                    <motion.div
                      layoutId="navActiveIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#d4af37] to-[#c59b52] rounded-full shadow-sm shadow-[#c59b52]/50"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher (FR / EN toggle) */}
            <div className="hidden sm:flex items-center rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] p-0.5 text-[10px] font-bold font-mono">
              <button
                onClick={() => setLanguage('fr')}
                className={`px-2 py-1 rounded-lg transition-all ${
                  language === 'fr'
                    ? 'bg-[#c59b52] text-black shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                FR
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded-lg transition-all ${
                  language === 'en'
                    ? 'bg-[#c59b52] text-black shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                EN
              </button>
            </div>

            {/* Dark / Light Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="flex h-8 sm:h-9 w-8 sm:w-9 items-center justify-center rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-all border border-[var(--border)]/60"
                aria-label="Basculer le thème"
              >
                {isDark ? (
                  <Sun className="h-4 w-4 text-[#c59b52] transition-transform hover:rotate-45" />
                ) : (
                  <Moon className="h-4 w-4 text-[#c59b52] transition-transform hover:-rotate-12" />
                )}
              </button>
            )}

            {/* User Account / Auth */}
            <div className="hidden sm:flex items-center">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-3 py-1.5 rounded-lg transition-colors">
                    {language === 'fr' ? 'Connexion' : 'Sign In'}
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: 'h-8 w-8 border border-[#c59b52]/50 shadow-sm',
                    },
                  }}
                />
              </SignedIn>
            </div>

            {/* Main Primary Action CTA */}
            <Link
              href="/configure"
              className="group relative inline-flex items-center gap-1.5 sm:gap-2 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#c59b52] to-[#b08140] px-3.5 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-black shadow-md shadow-[#c59b52]/25 hover:shadow-lg hover:shadow-[#c59b52]/40 transition-all duration-200 active:scale-95"
            >
              <span>{language === 'fr' ? 'Créer mon Cadre' : 'Custom Frame'}</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:border-[#c59b52]/50 transition-colors"
              aria-label="Menu principal"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Backdrop & Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative z-50 mt-2 mx-auto max-w-7xl rounded-3xl glass-card bg-[var(--bg-primary)]/98 p-6 border border-[var(--border-gold)] shadow-2xl backdrop-blur-2xl space-y-6 lg:hidden"
            >
              {/* Top Navigation Links */}
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => {
                  const active = pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between p-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                        active
                          ? 'bg-[#c59b52]/15 text-[#c59b52] border border-[#c59b52]/30'
                          : 'text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-[#c59b52]" />
                        <span>{link.label}</span>
                      </div>
                      {link.badge ? (
                        <span className="rounded-full bg-[#c59b52]/20 px-2 py-0.5 text-[9px] text-[#c59b52]">
                          {link.badge}
                        </span>
                      ) : (
                        <ArrowRight className="h-3.5 w-3.5 opacity-50" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Language & Theme in Mobile */}
              <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)]">
                  <Globe className="h-4 w-4 text-[#c59b52]" />
                  <span>{language === 'fr' ? 'Langue' : 'Language'}</span>
                </div>
                <div className="flex items-center rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] p-0.5 text-[10px] font-bold font-mono">
                  <button
                    onClick={() => setLanguage('fr')}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      language === 'fr'
                        ? 'bg-[#c59b52] text-black font-bold shadow-sm'
                        : 'text-[var(--text-muted)]'
                    }`}
                  >
                    FR
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      language === 'en'
                        ? 'bg-[#c59b52] text-black font-bold shadow-sm'
                        : 'text-[var(--text-muted)]'
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>

              {/* Auth in Mobile */}
              <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="w-full py-2.5 text-center text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]">
                      {language === 'fr' ? 'Se connecter / Créer un compte' : 'Sign In / Register'}
                    </button>
                  </SignInButton>
                </SignedOut>

                <SignedIn>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-semibold text-[var(--text-secondary)]">
                      {language === 'fr' ? 'Mon Compte' : 'My Account'}
                    </span>
                    <UserButton />
                  </div>
                </SignedIn>
              </div>

              {/* Big CTA in Mobile */}
              <Link
                href="/configure"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#d4af37] via-[#c59b52] to-[#b08140] py-3.5 text-xs font-bold uppercase tracking-widest text-black shadow-lg shadow-[#c59b52]/30"
              >
                <span>{language === 'fr' ? 'Créer mon Cadre Sur-Mesure' : 'Design Custom Frame'}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
