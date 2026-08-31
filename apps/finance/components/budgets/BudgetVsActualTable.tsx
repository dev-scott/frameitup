'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@frameitup/ui';
import { FinancialBudget } from '@frameitup/types';
import { Target, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

interface BudgetVsActualTableProps {
  budgets: FinancialBudget[];
  currency: 'USD' | 'EUR';
}

export function BudgetVsActualTable({ budgets, currency }: BudgetVsActualTableProps) {
  const symbol = currency === 'USD' ? '$' : '€';
  const rate = currency === 'USD' ? 1 : 0.92;

  return (
    <Card className="border-gray-800/80 bg-gradient-to-b from-gray-900/90 to-gray-900/40 backdrop-blur-md">
      <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-gray-800/60">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Target className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm font-bold text-white">
              Suivi Budgétaire : Objectifs Fixés vs Réalisé
            </CardTitle>
          </div>
          <p className="text-xs text-gray-400">Analyse des écarts de trésorerie et maîtrise des coûts</p>
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        <div className="space-y-3">
          {budgets.map((b) => {
            const isRevenue = b.category.includes('Chiffre') || b.category.includes('REVENUE');
            const percent = b.targetAmountUsd > 0 ? (b.actualAmountUsd / b.targetAmountUsd) * 100 : 0;
            const isGood = isRevenue ? percent >= 100 : percent <= 100;
            const variance = b.actualAmountUsd - b.targetAmountUsd;

            return (
              <div
                key={b.id}
                className="p-3.5 rounded-xl bg-gray-950/60 border border-gray-800/80 space-y-2 hover:border-gray-700/80 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{b.category}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-gray-400">
                      Cible : {symbol}
                      {(b.targetAmountUsd * rate).toLocaleString('fr-FR')}
                    </span>
                    <span className="text-xs font-mono font-bold text-white">
                      Réel : {symbol}
                      {(b.actualAmountUsd * rate).toLocaleString('fr-FR')}
                    </span>
                    <span
                      className={`text-xs font-bold font-mono px-2 py-0.5 rounded-md ${
                        isGood
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {percent.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                  <div
                    style={{ width: `${Math.min(100, percent)}%` }}
                    className={`h-full rounded-full transition-all duration-500 ${
                      isGood ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-amber-500 to-rose-500'
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
