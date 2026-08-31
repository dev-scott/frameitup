'use client';

import React from 'react';
import {
  Search,
  Bell,
  Calendar,
  DollarSign,
  Euro,
  PlusCircle,
  ShieldCheck,
  Sparkles,
  TrendingUp,
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
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-800/80 bg-gray-950/80 px-8 backdrop-blur-xl">
      {/* Search & Breadcrumb */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 text-emerald-400 shadow-lg shadow-emerald-950/40">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                FrameItUp Enterprise
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400 border border-emerald-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Sync
              </span>
            </div>
            <h1 className="text-lg font-bold text-white tracking-tight">
              Finance & Direction Financière
            </h1>
          </div>
        </div>

        <div className="hidden lg:flex relative items-center ml-4">
          <Search className="absolute left-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une écriture, facture, fournisseur (⌘K)..."
            className="h-9 w-72 rounded-lg border border-gray-800 bg-gray-900/60 pl-9 pr-4 text-xs text-gray-200 placeholder:text-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Period Selector */}
        <div className="flex items-center rounded-lg border border-gray-800 bg-gray-900/80 p-1 text-xs text-gray-300">
          <Calendar className="ml-2 mr-1.5 h-3.5 w-3.5 text-gray-400" />
          {['Fév 2026', 'Q1 2026', 'Année 2026'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`rounded-md px-2.5 py-1 font-medium transition-all ${
                period === p
                  ? 'bg-gray-800 text-white shadow-sm'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center rounded-lg border border-gray-800 bg-gray-900/80 p-1 text-xs">
          <button
            onClick={() => setCurrency('USD')}
            className={`flex items-center gap-1 rounded-md px-2 py-1 font-semibold transition-all ${
              currency === 'USD'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <DollarSign className="h-3.5 w-3.5" /> USD
          </button>
          <button
            onClick={() => setCurrency('EUR')}
            className={`flex items-center gap-1 rounded-md px-2 py-1 font-semibold transition-all ${
              currency === 'EUR'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Euro className="h-3.5 w-3.5" /> EUR
          </button>
        </div>

        {/* Quick Add Expense Action */}
        <Button
          onClick={onOpenAddExpense}
          className="gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-900/30 font-medium text-xs px-3.5 h-9"
        >
          <PlusCircle className="h-4 w-4" />
          + Saisie Dépense / Achat
        </Button>
      </div>
    </header>
  );
}
