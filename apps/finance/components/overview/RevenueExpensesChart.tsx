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
import { TrendingUp, Layers, Filter } from 'lucide-react';

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
        <div className="rounded-xl border border-gray-700/80 bg-gray-900/95 p-3.5 shadow-2xl backdrop-blur-xl space-y-2 text-xs">
          <div className="font-bold text-white border-b border-gray-800 pb-1.5 flex items-center justify-between">
            <span>{label}</span>
            <span className="text-[10px] text-emerald-400 font-mono">FrameItUp Analytics</span>
          </div>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5 text-gray-400">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  {entry.name} :
                </span>
                <span className="font-bold text-white font-mono">
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
    <Card className="border-gray-800/80 bg-gradient-to-b from-gray-900/90 to-gray-900/40 backdrop-blur-md">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-gray-800/60">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <TrendingUp className="h-3.5 w-3.5" />
            </div>
            <CardTitle className="text-sm font-bold text-white">
              Dynamique de Croissance & Rentabilité
            </CardTitle>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Évolution historique : Chiffre d'Affaires vs Achats Matières vs Résultat Net
          </p>
        </div>

        <div className="flex items-center gap-1 bg-gray-950/80 p-1 rounded-lg border border-gray-800 text-xs">
          <button
            onClick={() => setViewMode('all')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all ${
              viewMode === 'all'
                ? 'bg-gray-800 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Vue Globale
          </button>
          <button
            onClick={() => setViewMode('margin')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all ${
              viewMode === 'margin'
                ? 'bg-gray-800 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Marges & Profits
          </button>
          <button
            onClick={() => setViewMode('cashflow')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all ${
              viewMode === 'cashflow'
                ? 'bg-gray-800 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-200'
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
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorNetProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorCogs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis
                dataKey="period"
                stroke="#6b7280"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#374151' }}
              />
              <YAxis
                stroke="#6b7280"
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
                    stroke="#10b981"
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
                    stroke="#3b82f6"
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
                    stroke="#14b8a6"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                  <Area
                    type="monotone"
                    dataKey="netProfit"
                    name="Résultat Net"
                    stroke="#3b82f6"
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
                  stroke="#8b5cf6"
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
