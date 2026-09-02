'use client';

import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Euro,
  Percent,
  Wallet,
  ShoppingBag,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Scale,
} from 'lucide-react';
import { Card, CardContent } from '@frameitup/ui';
import { FinancialKpiSummary } from '@frameitup/types';

interface KpiGridProps {
  kpis: FinancialKpiSummary;
  currency: 'USD' | 'EUR';
}

export function KpiGrid({ kpis, currency }: KpiGridProps) {
  const symbol = currency === 'USD' ? '$' : '€';
  const rate = currency === 'USD' ? 1 : 0.92;

  const formatMoney = (val: number) => {
    return `${symbol}${(val * rate).toLocaleString('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  const cards = [
    {
      title: "Chiffre d'Affaires Brut",
      value: formatMoney(kpis.totalRevenue),
      subValue: `+${kpis.revenueGrowthPercent}% vs m-1`,
      isPositive: true,
      icon: DollarSign,
      color: 'emerald',
      sparkline: [40, 48, 55, 62, 59, 74.5],
    },
    {
      title: 'Marge Brute (Gross Profit)',
      value: formatMoney(kpis.grossProfit),
      subValue: `${kpis.grossMarginPercent}% du CA`,
      isPositive: true,
      icon: Percent,
      color: 'teal',
      sparkline: [30, 36, 42, 58, 46, 56],
    },
    {
      title: 'EBITDA / Résultat Net',
      value: formatMoney(kpis.netProfit),
      subValue: `${kpis.netMarginPercent}% marge nette`,
      isPositive: true,
      icon: Scale,
      color: 'blue',
      sparkline: [9, 12, 16, 26, 17, 23.9],
    },
    {
      title: 'Trésorerie Disponible',
      value: formatMoney(kpis.currentCashReserve),
      subValue: `${kpis.cashRunwayMonths} mois de runway`,
      isPositive: true,
      icon: Wallet,
      color: 'indigo',
      sparkline: [110, 118, 125, 140, 138, 148.5],
    },
    {
      title: 'Panier Moyen (AOV)',
      value: `${symbol}${(kpis.averageOrderValue * rate).toFixed(1)}`,
      subValue: `${kpis.totalOrdersCount} commandes traitées`,
      isPositive: true,
      icon: ShoppingBag,
      color: 'amber',
      sparkline: [180, 195, 205, 220, 210, 217.8],
    },
    {
      title: 'Créances Clients & En-cours',
      value: formatMoney(kpis.unpaidInvoicesAmount),
      subValue: `${formatMoney(kpis.pendingExpensesAmount)} factures dues`,
      isPositive: false,
      icon: Clock,
      color: 'rose',
      sparkline: [12, 9, 15, 8, 11, 7.4],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <Card
            key={idx}
            className="border-gray-800/80 bg-gradient-to-b from-gray-900/90 to-gray-900/50 backdrop-blur-md hover:border-gray-700/80 transition-all duration-200 group"
          >
            <CardContent className="p-4 flex flex-col justify-between h-full space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider line-clamp-1">
                  {card.title}
                </span>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-800/80 text-gray-400 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">
                  <Icon className="h-3.5 w-3.5" />
                </div>
              </div>

              <div>
                <div className="text-xl font-bold text-white tracking-tight">
                  {card.value}
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-[11px]">
                  {card.isPositive ? (
                    <span className="inline-flex items-center text-emerald-400 font-medium">
                      <ArrowUpRight className="h-3 w-3 mr-0.5" />
                      {card.subValue}
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-amber-400 font-medium">
                      <ArrowDownRight className="h-3 w-3 mr-0.5" />
                      {card.subValue}
                    </span>
                  )}
                </div>
              </div>

              {/* Sparkline Visual */}
              <div className="flex items-end gap-1 h-6 pt-1">
                {card.sparkline.map((val, sIdx) => {
                  const max = Math.max(...card.sparkline);
                  const min = Math.min(...card.sparkline);
                  const heightPercent = Math.max(
                    15,
                    Math.round(((val - min) / (max - min || 1)) * 85 + 15)
                  );
                  const isLast = sIdx === card.sparkline.length - 1;
                  return (
                    <div
                      key={sIdx}
                      className="flex-1 bg-gray-800 rounded-sm overflow-hidden h-full flex items-end"
                    >
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-sm transition-all duration-500 ${
                          isLast
                            ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50'
                            : 'bg-gray-700 group-hover:bg-gray-600'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
