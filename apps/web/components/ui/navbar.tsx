'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs';
import { useLanguageStore, Language } from '@/store/use-language-store';
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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/configure', label: language === 'fr' ? 'Studio Sur-Mesure' : 'Custom Studio' },
    { href: '/frames', label: language === 'fr' ? 'Collections de Cadres' : 'Frame Collections' },
    { href: '/orders', label: language === 'fr' ? 'Mes Commandes' : 'My Orders', authRequired: true },
    {
      href: 'http://localhost:3001',
      label: language === 'fr' ? 'Galerie Artistes' : 'Art Marketplace',
      external: true,
      badge: 'Art',
    },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const isDark = resolvedTheme === 'dark';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 pt-4">
      <div
        className={`mx-auto max-w-7xl rounded-2xl transition-all duration-300 ${
          scrolled
            ? 'glass-card bg-[var(--bg-primary)]/85 shadow-lg border border-[var(--border)] backdrop-blur-xl py-3 px-6'
            : 'bg-[var(--bg-primary)]/40 border border-[var(--border)]/60 backdrop-blur-md py-4 px-6'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo & Brand Hallmark */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#c59b52] via-[#dfc397] to-[#926435] text-black font-black text-sm shadow-md shadow-[#c59b52]/20 transition-transform group-hover:scale-105">
              <span>F</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-[0.18em] font-serif text-[var(--text-primary)] uppercase transition-colors group-hover:text-[#c59b52]">
                FrameItUp
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[var(--text-subtle)] font-sans -mt-1 font-semibold">
                Atelier Paris
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className={`relative text-xs uppercase tracking-[0.14em] font-semibold transition-all duration-200 py-1 flex items-center gap-1.5 ${
                    active
                      ? 'text-[#c59b52]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="rounded-full bg-[#c59b52]/15 px-1.5 py-0.2 text-[9px] font-bold text-[#c59b52] border border-[#c59b52]/30">
                      {link.badge}
                    </span>
                  )}
                  {active && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#c59b52] to-[#dfc397] rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center gap-3.5">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]/50 transition-all border border-transparent hover:border-[var(--border)]"
              title="Changer de langue / Switch language"
            >
              <Globe className="h-3.5 w-3.5 text-[#c59b52]" />
              <span className="uppercase font-mono text-[11px]">{language}</span>
            </button>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]/50 transition-all border border-transparent hover:border-[var(--border)]"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="h-4 w-4 text-[#c59b52]" />
                ) : (
                  <Moon className="h-4 w-4 text-[#c59b52]" />
                )}
              </button>
            )}

            {/* Auth Buttons */}
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
                    avatarBox: 'h-8 w-8 border border-[#c59b52]/40',
                  },
                }}
              />
            </SignedIn>

            {/* Main CTA Button */}
            <Link
              href="/configure"
              className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#c59b52] via-[#d4af37] to-[#b08140] px-4 py-2 text-xs font-bold uppercase tracking-wider text-black shadow-md shadow-[#c59b52]/25 hover:shadow-lg hover:shadow-[#c59b52]/40 transition-all duration-200 active:scale-95"
            >
              <span>{language === 'fr' ? 'Créer mon Cadre' : 'Custom Frame'}</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            {mounted && (
              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="p-2 text-[var(--text-secondary)]"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-[var(--text-primary)] rounded-lg hover:bg-[var(--bg-tertiary)]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 mx-auto max-w-7xl rounded-2xl glass-card bg-[var(--bg-primary)]/95 p-6 border border-[var(--border)] shadow-2xl backdrop-blur-2xl space-y-5"
          >
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-2 text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)] border-b border-[var(--border)]/50"
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="rounded-full bg-[#c59b52]/20 px-2 py-0.5 text-xs text-[#c59b52]">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            <div className="pt-2 flex items-center justify-between border-t border-[var(--border)]">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-xs font-semibold uppercase text-[var(--text-secondary)]"
              >
                <Globe className="h-4 w-4 text-[#c59b52]" />
                <span>Langue : {language.toUpperCase()}</span>
              </button>
            </div>

            <Link
              href="/configure"
              onClick={() => setMobileOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#c59b52] to-[#b08140] py-3 text-xs font-bold uppercase tracking-wider text-black shadow-md shadow-[#c59b52]/20"
            >
              <span>{language === 'fr' ? 'Créer mon Cadre' : 'Custom Frame'}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
