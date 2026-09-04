'use client';

import React from 'react';
import {
  Search,
  Calendar,
  DollarSign,
  Euro,
  PlusCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Button } from '@frameitup/ui';
import { UserButton, useUser } from '@clerk/nextjs';

interface HeaderProps {
  currency: 'USD' | 'EUR';
  setCurrency: (c: 'USD' | 'EUR') => void;
  period: string;
  setPeriod: (p: string) => void;
  onOpenAddExpense: () => void;
}

export function Header({
  currency,
  setCurrency,
  period,
  setPeriod,
  onOpenAddExpense,
}: HeaderProps) {
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[var(--border)] bg-[var(--bg-primary)]/85 px-8 backdrop-blur-xl">
      {/* Search & Breadcrumb */}
      <div className="flex items-center gap-6">
        <div className="hidden lg:flex relative items-center">
          <Search className="absolute left-3 h-4 w-4 text-[var(--text-subtle)]" />
          <input
            type="text"
            placeholder="Rechercher une écriture, facture, fournisseur..."
            className="h-9 w-72 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] pl-9 pr-4 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-subtle)] focus:border-[#c59b52] focus:outline-none transition-all"
          />
        </div>

        {/* Live Admin Security Status Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#c59b52]/10 border border-[#c59b52]/25 text-[#c59b52] text-[11px] font-medium font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c59b52] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c59b52]"></span>
          </span>
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Session Admin Sécurisée</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Period Selector */}
        <div className="flex items-center rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-1 text-xs text-[var(--text-secondary)]">
          <Calendar className="ml-2 mr-1.5 h-3.5 w-3.5 text-[#c59b52]" />
          {['Fév 2026', 'Q1 2026', 'Année 2026'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
                period === p
                  ? 'bg-[#c59b52] text-black font-bold shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-1 text-xs">
          <button
            onClick={() => setCurrency('USD')}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold font-mono transition-all ${
              currency === 'USD'
                ? 'bg-[#c59b52]/20 text-[#c59b52] border border-[#c59b52]/30'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <DollarSign className="h-3 w-3" /> USD
          </button>
          <button
            onClick={() => setCurrency('EUR')}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold font-mono transition-all ${
              currency === 'EUR'
                ? 'bg-[#c59b52]/20 text-[#c59b52] border border-[#c59b52]/30'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Euro className="h-3 w-3" /> EUR
          </button>
        </div>

        {/* Quick Add Expense Action */}
        <Button
          onClick={onOpenAddExpense}
          className="gap-2 bg-gradient-to-r from-[#d4af37] via-[#c59b52] to-[#b08140] hover:shadow-lg hover:shadow-[#c59b52]/30 text-black font-bold text-xs px-4 h-9 rounded-xl transition-all active:scale-95"
        >
          <PlusCircle className="h-4 w-4" />
          <span className="hidden md:inline">+ Saisie Dépense</span>
        </Button>

        {/* Clerk User Button & Admin Profile */}
        <div className="flex items-center pl-2 border-l border-[var(--border)] gap-2.5">
          <UserButton
            afterSignOutUrl="/sign-in"
            appearance={{
              elements: {
                avatarBox: 'h-9 w-9 ring-2 ring-[#c59b52]/50 hover:ring-[#c59b52] transition-all',
                userButtonPopoverCard:
                  'border border-[#c59b52]/30 bg-[#0f1118] shadow-2xl backdrop-blur-2xl rounded-2xl text-white',
                userPreviewMainIdentifier: 'text-white font-bold text-xs font-serif',
                userPreviewSecondaryIdentifier: 'text-zinc-400 text-[11px]',
                userButtonPopoverActionButton:
                  'hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs transition-all',
                userButtonPopoverActionButtonIcon: 'text-[#c59b52]',
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}

