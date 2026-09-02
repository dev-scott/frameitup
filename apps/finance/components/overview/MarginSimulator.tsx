'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@frameitup/ui';
import { Calculator, Sparkles, Sliders, DollarSign, Euro, ShieldCheck } from 'lucide-react';

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
    <Card className="border-gray-800/80 bg-gradient-to-b from-gray-900/90 to-gray-900/40 backdrop-blur-md">
      <CardHeader className="pb-4 border-b border-gray-800/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Calculator className="h-3.5 w-3.5" />
            </div>
            <CardTitle className="text-sm font-bold text-white">
              Simulateur de Marge & Prix Unitaire
            </CardTitle>
          </div>
          <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            Calculateur Temps Réel
          </span>
        </div>
        <p className="text-xs text-gray-400">
          Ajustez les prix de vente et les coûts d'approvisionnement pour simuler la rentabilité nette
        </p>
      </CardHeader>

      <CardContent className="pt-5 space-y-5">
        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Selling Price */}
          <div className="space-y-1.5 bg-gray-950/60 p-3 rounded-xl border border-gray-800/80">
            <div className="flex justify-between text-xs">
              <span className="text-gray-300 font-medium">Prix de Vente Cadre</span>
              <span className="font-bold text-white font-mono">
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
              className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Wood Moulding Cost */}
          <div className="space-y-1.5 bg-gray-950/60 p-3 rounded-xl border border-gray-800/80">
            <div className="flex justify-between text-xs">
              <span className="text-gray-300 font-medium">Coût Baguette Bois (Moulure)</span>
              <span className="font-bold text-rose-400 font-mono">
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
              className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
          </div>

          {/* Glass / Plexi */}
          <div className="space-y-1.5 bg-gray-950/60 p-3 rounded-xl border border-gray-800/80">
            <div className="flex justify-between text-xs">
              <span className="text-gray-300 font-medium">Vitrage Optique / Musée UV</span>
              <span className="font-bold text-rose-400 font-mono">
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
              className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
          </div>

          {/* Packaging & Shipping */}
          <div className="space-y-1.5 bg-gray-950/60 p-3 rounded-xl border border-gray-800/80">
            <div className="flex justify-between text-xs">
              <span className="text-gray-300 font-medium">Packaging + Port DHL Express</span>
              <span className="font-bold text-rose-400 font-mono">
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
              className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
          </div>
        </div>

        {/* Results Banner */}
        <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-gray-950/60 p-4 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
          <div>
            <div className="text-[11px] text-gray-400">Total Coûts Directs</div>
            <div className="text-base font-bold text-rose-400 font-mono">
              {symbol}
              {totalDirectCosts.toFixed(2)}
            </div>
            <div className="text-[10px] text-gray-400">incl. Stripe {symbol}{stripeFee}</div>
          </div>

          <div>
            <div className="text-[11px] text-gray-400">Bénéfice Net Unitaire</div>
            <div className="text-lg font-black text-emerald-400 font-mono">
              {symbol}
              {unitNetProfit.toFixed(2)}
            </div>
            <div className="text-[10px] text-emerald-500">Marge brute par cadre</div>
          </div>

          <div>
            <div className="text-[11px] text-gray-400">Taux de Marge Nette</div>
            <div className="text-lg font-black text-white font-mono">
              {marginPercent}%
            </div>
            <div className="text-[10px] text-gray-400">Excellent &gt; 50%</div>
          </div>

          <div>
            <div className="text-[11px] text-gray-400">Seuil de Rentabilité (Point Mort)</div>
            <div className="text-base font-bold text-amber-400 font-mono">
              {breakEvenUnits} cadres
            </div>
            <div className="text-[10px] text-gray-400">pour couvrir {symbol}22k charges fixes</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
