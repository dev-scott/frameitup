'use client';

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@frameitup/ui';
import { MonthlyFinancialTrend } from '@frameitup/types';
import { TrendingUp } from 'lucide-react';

interface RevenueExpensesChartProps {
  data: MonthlyFinancialTrend[];
  currency: 'USD' | 'EUR';
}

export function RevenueExpensesChart({ data, currency }: RevenueExpensesChartProps) {
  const [viewMode, setViewMode] = useState<'all' | 'margin' | 'cashflow'>('all');
  const symbol = currency === 'USD' ? '$' : '€';
  const rate = currency === 'USD' ? 1 : 0.92;

  const chartData = data.map((d) => ({
    period: d.period,
    revenue: Math.round(d.revenue * rate),
    cogs: Math.round(d.cogs * rate),
    opex: Math.round(d.opex * rate),
    grossProfit: Math.round(d.grossProfit * rate),
    netProfit: Math.round(d.netProfit * rate),
    cashFlow: Math.round(d.cashFlow * rate),
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-2xl border border-[var(--border-gold)] bg-[var(--bg-card)]/95 p-4 shadow-2xl backdrop-blur-xl space-y-2 text-xs">
          <div className="font-serif font-bold text-[var(--text-primary)] border-b border-[var(--border)] pb-2 flex items-center justify-between">
            <span>{label}</span>
            <span className="text-[10px] text-[#c59b52] font-mono">FrameItUp Analytics</span>
          </div>
          <div className="space-y-1.5">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center justify-between gap-6">
                <span className="flex items-center gap-2 text-[var(--text-muted)]">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  {entry.name} :
                </span>
                <span className="font-bold text-[var(--text-primary)] font-mono">
                  {symbol}
                  {entry.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border border-[var(--border-gold)] glass-card rounded-2xl shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-[var(--border)]">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#c59b52]/10 text-[#c59b52] border border-[#c59b52]/20">
              <TrendingUp className="h-4 w-4" />
            </div>
            <CardTitle className="text-base font-bold font-serif text-[var(--text-primary)]">
              Dynamique de Croissance & Rentabilité
            </CardTitle>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Évolution historique : Chiffre d'Affaires vs Achats Matières vs Résultat Net
          </p>
        </div>

        <div className="flex items-center gap-1 bg-[var(--bg-primary)] p-1 rounded-xl border border-[var(--border)] text-xs">
          <button
            onClick={() => setViewMode('all')}
            className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all ${
              viewMode === 'all'
                ? 'bg-[#c59b52] text-black font-bold shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            Vue Globale
          </button>
          <button
            onClick={() => setViewMode('margin')}
            className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all ${
              viewMode === 'margin'
                ? 'bg-[#c59b52] text-black font-bold shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            Marges & Profits
          </button>
          <button
            onClick={() => setViewMode('cashflow')}
            className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all ${
              viewMode === 'cashflow'
                ? 'bg-[#c59b52] text-black font-bold shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            Flux de Trésorerie
          </button>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d4af37" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#d4af37" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorNetProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorCogs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(250, 248, 245, 0.06)" vertical={false} />
              <XAxis
                dataKey="period"
                stroke="#9E9689"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: 'rgba(250, 248, 245, 0.1)' }}
              />
              <YAxis
                stroke="#9E9689"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${symbol}${v >= 1000 ? `${v / 1000}k` : v}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{ paddingBottom: '12px', fontSize: '11px' }}
              />

              {viewMode === 'all' && (
                <>
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    name="Chiffre d'Affaires"
                    stroke="#d4af37"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                  <Area
                    type="monotone"
                    dataKey="cogs"
                    name="Coûts Matières (COGS)"
                    stroke="#f43f5e"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorCogs)"
                  />
                  <Area
                    type="monotone"
                    dataKey="netProfit"
                    name="Résultat Net"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorNetProfit)"
                  />
                </>
              )}

              {viewMode === 'margin' && (
                <>
                  <Area
                    type="monotone"
                    dataKey="grossProfit"
                    name="Marge Brute"
                    stroke="#c59b52"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                  <Area
                    type="monotone"
                    dataKey="netProfit"
                    name="Résultat Net"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorNetProfit)"
                  />
                </>
              )}

              {viewMode === 'cashflow' && (
                <Area
                  type="monotone"
                  dataKey="cashFlow"
                  name="Flux Net de Trésorerie"
                  stroke="#c59b52"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
