'use client';

import React from 'react';
import {
  Search,
  Calendar,
  DollarSign,
  Euro,
  PlusCircle,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { Button } from '@frameitup/ui';

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
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[var(--border)] bg-[var(--bg-primary)]/85 px-8 backdrop-blur-xl">
      {/* Search & Breadcrumb */}
      <div className="flex items-center gap-6">
        <div className="hidden lg:flex relative items-center ml-4">
          <Search className="absolute left-3 h-4 w-4 text-[var(--text-subtle)]" />
          <input
            type="text"
            placeholder="Rechercher une écriture, facture, fournisseur..."
            className="h-9 w-72 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] pl-9 pr-4 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-subtle)] focus:border-[#c59b52] focus:outline-none transition-all"
          />
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
          <span>+ Saisie Dépense / Achat</span>
        </Button>
      </div>
    </header>
  );
}
