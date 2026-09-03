'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@frameitup/ui';
import { FinancialBudget } from '@frameitup/types';
import { Target } from 'lucide-react';

interface BudgetVsActualTableProps {
  budgets: FinancialBudget[];
  currency: 'USD' | 'EUR';
}

export function BudgetVsActualTable({ budgets, currency }: BudgetVsActualTableProps) {
  const symbol = currency === 'USD' ? '$' : '€';
  const rate = currency === 'USD' ? 1 : 0.92;

  return (
    <Card className="border border-[var(--border-gold)] glass-card rounded-2xl shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-[var(--border)]">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#c59b52]/10 text-[#c59b52] border border-[#c59b52]/20">
              <Target className="h-4 w-4" />
            </div>
            <CardTitle className="text-base font-bold font-serif text-[var(--text-primary)]">
              Suivi Budgétaire : Objectifs Fixés vs Réalisé
            </CardTitle>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">Analyse des écarts de trésorerie et maîtrise des coûts</p>
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        <div className="space-y-3">
          {budgets.map((b) => {
            const isRevenue = b.category.includes('Chiffre') || b.category.includes('REVENUE');
            const percent = b.targetAmountUsd > 0 ? (b.actualAmountUsd / b.targetAmountUsd) * 100 : 0;
            const isGood = isRevenue ? percent >= 100 : percent <= 100;

            return (
              <div
                key={b.id}
                className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)] space-y-2 hover:border-[#c59b52]/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-sans text-[var(--text-primary)]">{b.category}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[var(--text-muted)]">
                      Cible : {symbol}
                      {(b.targetAmountUsd * rate).toLocaleString('fr-FR')}
                    </span>
                    <span className="text-xs font-mono font-bold text-[var(--text-primary)]">
                      Réel : {symbol}
                      {(b.actualAmountUsd * rate).toLocaleString('fr-FR')}
                    </span>
                    <span
                      className={`text-xs font-bold font-mono px-2 py-0.5 rounded-md ${
                        isGood
                          ? 'bg-[#c59b52]/10 text-[#c59b52] border border-[#c59b52]/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {percent.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[var(--bg-tertiary)] rounded-full h-2 overflow-hidden border border-[var(--border)]">
                  <div
                    style={{ width: `${Math.min(100, percent)}%` }}
                    className={`h-full rounded-full transition-all duration-500 ${
                      isGood ? 'bg-gradient-to-r from-[#c59b52] to-[#d4af37]' : 'bg-gradient-to-r from-amber-500 to-rose-500'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
