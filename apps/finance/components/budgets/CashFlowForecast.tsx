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
import { Sparkles } from 'lucide-react';

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
    <Card className="border border-[var(--border-gold)] glass-card rounded-2xl shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-[var(--border)]">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#c59b52]/10 text-[#c59b52] border border-[#c59b52]/20">
              <Sparkles className="h-4 w-4" />
            </div>
            <CardTitle className="text-base font-bold font-serif text-[var(--text-primary)]">
              Prévisions Prédictives de Trésorerie (Horizon 6 Mois)
            </CardTitle>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Modèle de projection basé sur +7.5% de croissance mensuelle et structure de coûts actuelle
          </p>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={forecastData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(250, 248, 245, 0.06)" vertical={false} />
              <XAxis
                dataKey="month"
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
              <Tooltip
                contentStyle={{
                  backgroundColor: '#151311',
                  borderColor: 'rgba(197, 155, 82, 0.3)',
                  borderRadius: '16px',
                  fontSize: '11px',
                  color: '#FAF8F5',
                }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{ paddingBottom: '10px', fontSize: '11px' }}
              />
              <Bar dataKey="cashIn" name="Encaissements Prévus" fill="#d4af37" radius={[4, 4, 0, 0]} />
              <Bar dataKey="cashOut" name="Décaissements Prévus" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="net" name="Génération Nette de Cash" fill="#c59b52" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
