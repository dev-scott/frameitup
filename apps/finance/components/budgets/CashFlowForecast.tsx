'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@frameitup/ui';
import { Target, Sparkles, TrendingUp } from 'lucide-react';

interface CashFlowForecastProps {
  currency: 'USD' | 'EUR';
}

export function CashFlowForecast({ currency }: CashFlowForecastProps) {
  const symbol = currency === 'USD' ? '$' : '€';
  const rate = currency === 'USD' ? 1 : 0.92;

  const forecastData = [
    { month: 'Mar 2026', cashIn: Math.round(79000 * rate), cashOut: Math.round(44500 * rate), net: Math.round(34500 * rate), reserve: Math.round(183000 * rate) },
    { month: 'Avr 2026', cashIn: Math.round(84000 * rate), cashOut: Math.round(46000 * rate), net: Math.round(38000 * rate), reserve: Math.round(221000 * rate) },
    { month: 'Mai 2026', cashIn: Math.round(89500 * rate), cashOut: Math.round(48200 * rate), net: Math.round(41300 * rate), reserve: Math.round(262300 * rate) },
    { month: 'Juin 2026', cashIn: Math.round(96000 * rate), cashOut: Math.round(51000 * rate), net: Math.round(45000 * rate), reserve: Math.round(307300 * rate) },
    { month: 'Juil 2026', cashIn: Math.round(104000 * rate), cashOut: Math.round(53500 * rate), net: Math.round(50500 * rate), reserve: Math.round(357800 * rate) },
    { month: 'Août 2026', cashIn: Math.round(112000 * rate), cashOut: Math.round(56000 * rate), net: Math.round(56000 * rate), reserve: Math.round(413800 * rate) },
  ];

  return (
    <Card className="border-gray-800/80 bg-gradient-to-b from-gray-900/90 to-gray-900/40 backdrop-blur-md">
      <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-gray-800/60">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Sparkles className="h-4 w-4" />
            </div>
            <CardTitle className="text-sm font-bold text-white">
              Prévisions Prédictives de Trésorerie (Horizon 6 Mois)
            </CardTitle>
          </div>
          <p className="text-xs text-gray-400">
            Modèle de projection basé sur +7.5% de croissance mensuelle et structure de coûts actuelle
          </p>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={forecastData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis
                dataKey="month"
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
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111827',
                  borderColor: '#374151',
                  borderRadius: '12px',
                  fontSize: '11px',
                  color: '#fff',
                }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{ paddingBottom: '10px', fontSize: '11px' }}
              />
              <Bar dataKey="cashIn" name="Encaissements Prévus" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="cashOut" name="Décaissements Prévus" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="net" name="Génération Nette de Cash" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
