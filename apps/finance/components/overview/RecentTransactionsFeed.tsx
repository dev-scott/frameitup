'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@frameitup/ui';
import { ArrowDownLeft, ArrowUpRight, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface RecentTransactionsFeedProps {
  currency: 'USD' | 'EUR';
}

export function RecentTransactionsFeed({ currency }: RecentTransactionsFeedProps) {
  const symbol = currency === 'USD' ? '$' : '€';
  const rate = currency === 'USD' ? 1 : 0.92;

  const transactions = [
    {
      id: 'tx-1',
      title: 'Commande SaaS #CMD-2026-0412',
      subtitle: 'Sophie Martin — Cadre Chêne 50x70',
      amount: 189.0,
      type: 'INCOME',
      status: 'CONFIRMED',
      time: 'Il y a 14 min',
    },
    {
      id: 'tx-2',
      title: 'Facture Fournisseur Bois des Vosges',
      subtitle: 'Achat baguettes Chêne massif (500m)',
      amount: -4850.0,
      type: 'EXPENSE',
      status: 'APPROVED',
      time: 'Il y a 2h',
    },
    {
      id: 'tx-3',
      title: 'Virement Stripe Marketplace Artiste',
      subtitle: 'Elena Rostova — Vente tirage 1/1',
      amount: -355.0,
      type: 'PAYOUT',
      status: 'PROCESSED',
      time: 'Il y a 5h',
    },
    {
      id: 'tx-4',
      title: 'Règlement B2B Client Cabinet Dupont',
      subtitle: 'Facture #INV-2026-0089 encaissée',
      amount: 4608.0,
      type: 'INCOME',
      status: 'CONFIRMED',
      time: 'Hier, 16:40',
    },
    {
      id: 'tx-5',
      title: 'Prélèvement DHL Express Logistics',
      subtitle: 'Frais de transport & packaging',
      amount: -2150.0,
      type: 'EXPENSE',
      status: 'PAID',
      time: 'Hier, 11:20',
    },
  ];

  return (
    <Card className="border-gray-800/80 bg-gradient-to-b from-gray-900/90 to-gray-900/40 backdrop-blur-md">
      <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-gray-800/60">
        <div>
          <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="h-4 w-4 text-emerald-400" />
            Flux des Écritures & Transactions Récentes
          </CardTitle>
          <p className="text-xs text-gray-400">Dernières entrées de trésorerie et règlements</p>
        </div>
        <span className="text-[10px] text-emerald-400 font-mono">Temps Réel</span>
      </CardHeader>

      <CardContent className="pt-4 divide-y divide-gray-800/60">
        {transactions.map((tx) => {
          const isIncome = tx.amount > 0;
          return (
            <div
              key={tx.id}
              className="py-3 first:pt-0 last:pb-0 flex items-center justify-between hover:bg-gray-800/20 px-2 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                    isIncome
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}
                >
                  {isIncome ? (
                    <ArrowDownLeft className="h-4 w-4" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4" />
                  )}
                </div>

                <div>
                  <div className="text-xs font-semibold text-white">{tx.title}</div>
                  <div className="text-[10px] text-gray-400">{tx.subtitle}</div>
                </div>
              </div>

              <div className="text-right">
                <div
                  className={`text-xs font-bold font-mono ${
                    isIncome ? 'text-emerald-400' : 'text-gray-200'
                  }`}
                >
                  {isIncome ? '+' : ''}
                  {symbol}
                  {Math.abs(tx.amount * rate).toLocaleString('fr-FR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div className="text-[10px] text-gray-400">{tx.time}</div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
