'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@frameitup/ui';
import { Calculator } from 'lucide-react';

interface MarginSimulatorProps {
  currency: 'USD' | 'EUR';
}

export function MarginSimulator({ currency }: MarginSimulatorProps) {
  const symbol = currency === 'USD' ? '$' : '€';
  const rate = currency === 'USD' ? 1 : 0.92;

  // Simulator state
  const [sellingPrice, setSellingPrice] = useState(195);
  const [woodCost, setWoodCost] = useState(32);
  const [glassCost, setGlassCost] = useState(28);
  const [packagingShipping, setPackagingShipping] = useState(20);
  const [stripeFeePercent, setStripeFeePercent] = useState(2.9);

  // Calculations
  const stripeFee = Number(((sellingPrice * stripeFeePercent) / 100 + 0.3).toFixed(2));
  const totalDirectCosts = woodCost + glassCost + packagingShipping + stripeFee;
  const unitNetProfit = Math.max(0, Number((sellingPrice - totalDirectCosts).toFixed(2)));
  const marginPercent = sellingPrice > 0 ? ((unitNetProfit / sellingPrice) * 100).toFixed(1) : '0';

  // Break-even fixed monthly costs (approx 20k)
  const monthlyFixedCosts = 22000;
  const breakEvenUnits = unitNetProfit > 0 ? Math.ceil(monthlyFixedCosts / unitNetProfit) : 0;

  return (
    <Card className="border border-[var(--border-gold)] glass-card rounded-2xl shadow-xl">
      <CardHeader className="pb-4 border-b border-[var(--border)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#c59b52]/10 text-[#c59b52] border border-[#c59b52]/20">
              <Calculator className="h-4 w-4" />
            </div>
            <CardTitle className="text-base font-bold font-serif text-[var(--text-primary)]">
              Simulateur de Marge & Prix Unitaire
            </CardTitle>
          </div>
          <span className="text-[10px] font-bold text-[#c59b52] bg-[#c59b52]/10 px-2.5 py-0.5 rounded-full border border-[#c59b52]/30">
            Calculateur Temps Réel
          </span>
        </div>
        <p className="text-xs text-[var(--text-muted)] mt-1">
          Ajustez les prix de vente et les coûts d'approvisionnement pour simuler la rentabilité nette
        </p>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Selling Price */}
          <div className="space-y-2 bg-[var(--bg-primary)] p-4 rounded-xl border border-[var(--border)]">
            <div className="flex justify-between text-xs">
              <span className="text-[var(--text-secondary)] font-medium">Prix de Vente Cadre</span>
              <span className="font-bold text-[#c59b52] font-mono text-sm">
                {symbol}
                {sellingPrice}
              </span>
            </div>
            <input
              type="range"
              min={50}
              max={500}
              step={5}
              value={sellingPrice}
              onChange={(e) => setSellingPrice(Number(e.target.value))}
              className="w-full h-1.5 bg-[var(--bg-tertiary)] rounded-lg appearance-none cursor-pointer accent-[#c59b52]"
            />
          </div>

          {/* Wood Moulding Cost */}
          <div className="space-y-2 bg-[var(--bg-primary)] p-4 rounded-xl border border-[var(--border)]">
            <div className="flex justify-between text-xs">
              <span className="text-[var(--text-secondary)] font-medium">Coût Baguette Bois (Moulure)</span>
              <span className="font-bold text-rose-400 font-mono text-sm">
                {symbol}
                {woodCost}
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={120}
              step={2}
              value={woodCost}
              onChange={(e) => setWoodCost(Number(e.target.value))}
              className="w-full h-1.5 bg-[var(--bg-tertiary)] rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
          </div>

          {/* Glass / Plexi */}
          <div className="space-y-2 bg-[var(--bg-primary)] p-4 rounded-xl border border-[var(--border)]">
            <div className="flex justify-between text-xs">
              <span className="text-[var(--text-secondary)] font-medium">Vitrage Optique / Musée UV</span>
              <span className="font-bold text-rose-400 font-mono text-sm">
                {symbol}
                {glassCost}
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={100}
              step={2}
              value={glassCost}
              onChange={(e) => setGlassCost(Number(e.target.value))}
              className="w-full h-1.5 bg-[var(--bg-tertiary)] rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
          </div>

          {/* Packaging & Shipping */}
          <div className="space-y-2 bg-[var(--bg-primary)] p-4 rounded-xl border border-[var(--border)]">
            <div className="flex justify-between text-xs">
              <span className="text-[var(--text-secondary)] font-medium">Packaging + Port DHL Express</span>
              <span className="font-bold text-rose-400 font-mono text-sm">
                {symbol}
                {packagingShipping}
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={60}
              step={1}
              value={packagingShipping}
              onChange={(e) => setPackagingShipping(Number(e.target.value))}
              className="w-full h-1.5 bg-[var(--bg-tertiary)] rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
          </div>
        </div>

        {/* Results Banner */}
        <div className="rounded-2xl border border-[var(--border-gold)] bg-gradient-to-r from-[#c59b52]/10 via-[var(--bg-card)] to-[var(--bg-primary)] p-5 grid grid-cols-2 md:grid-cols-4 gap-4 items-center shadow-lg">
          <div>
            <div className="text-[11px] text-[var(--text-muted)]">Total Coûts Directs</div>
            <div className="text-base font-bold text-rose-400 font-mono">
              {symbol}
              {totalDirectCosts.toFixed(2)}
            </div>
            <div className="text-[10px] text-[var(--text-subtle)]">incl. Stripe {symbol}{stripeFee}</div>
          </div>

          <div>
            <div className="text-[11px] text-[var(--text-muted)]">Bénéfice Net Unitaire</div>
            <div className="text-xl font-bold text-[#c59b52] font-mono">
              {symbol}
              {unitNetProfit.toFixed(2)}
            </div>
            <div className="text-[10px] text-[#c59b52]/80">Marge brute par cadre</div>
          </div>

          <div>
            <div className="text-[11px] text-[var(--text-muted)]">Taux de Marge Nette</div>
            <div className="text-xl font-bold text-[var(--text-primary)] font-mono">
              {marginPercent}%
            </div>
            <div className="text-[10px] text-[#c59b52]">Objectif &gt; 50% atteint</div>
          </div>

          <div>
            <div className="text-[11px] text-[var(--text-muted)]">Point Mort (Break-Even)</div>
            <div className="text-base font-bold text-[var(--text-primary)] font-mono">
              {breakEvenUnits} cadres
            </div>
            <div className="text-[10px] text-[var(--text-subtle)]">pour couvrir {symbol}22k charges fixes</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
