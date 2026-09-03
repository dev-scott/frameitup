'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@frameitup/ui';
import { ProfitAndLossStatement } from '@frameitup/types';
import { LineChart, Printer } from 'lucide-react';

interface ProfitLossStatementProps {
  pnl: ProfitAndLossStatement;
  currency: 'USD' | 'EUR';
}

export function ProfitLossStatementView({ pnl, currency }: ProfitLossStatementProps) {
  const symbol = currency === 'USD' ? '$' : '€';
  const rate = currency === 'USD' ? 1 : 0.92;

  const fmt = (v: number) => {
    return `${symbol}${(v * rate).toLocaleString('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Card className="border border-[var(--border-gold)] glass-card rounded-2xl shadow-xl">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#c59b52]/10 text-[#c59b52] border border-[#c59b52]/20">
              <LineChart className="h-4 w-4" />
            </div>
            <CardTitle className="text-base font-bold font-serif text-[var(--text-primary)]">
              Compte de Résultat Officiel (P&L / Profit and Loss)
            </CardTitle>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            {pnl.period} — Structure comptable normalisée et soldes intermédiaires de gestion
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handlePrint}
            className="border-[var(--border)] bg-[var(--bg-primary)] hover:bg-[var(--bg-tertiary)] text-[var(--text-primary)] text-xs h-9 gap-1.5 rounded-xl"
          >
            <Printer className="h-3.5 w-3.5 text-[#c59b52]" />
            Imprimer / Exporter PDF
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        {/* Top Summary Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border)] shadow-md">
          <div>
            <div className="text-[11px] text-[var(--text-muted)]">Chiffre d'Affaires HT</div>
            <div className="text-xl font-serif font-bold text-[var(--text-primary)] mt-1">
              {fmt(pnl.revenue.totalRevenue)}
            </div>
            <div className="text-[10px] text-[#c59b52] font-semibold">100% de l'activité</div>
          </div>
          <div>
            <div className="text-[11px] text-[var(--text-muted)]">Marge Brute d'Atelier</div>
            <div className="text-xl font-serif font-bold text-[#c59b52] mt-1">
              {fmt(pnl.grossProfit)}
            </div>
            <div className="text-[10px] text-[#c59b52]">{pnl.grossMarginPercent}% de marge</div>
          </div>
          <div>
            <div className="text-[11px] text-[var(--text-muted)]">EBITDA (EBE)</div>
            <div className="text-xl font-serif font-bold text-[var(--text-primary)] mt-1">
              {fmt(pnl.operatingIncomeEbitda)}
            </div>
            <div className="text-[10px] text-[var(--text-muted)]">
              {((pnl.operatingIncomeEbitda / pnl.revenue.totalRevenue) * 100).toFixed(1)}% du CA
            </div>
          </div>
          <div>
            <div className="text-[11px] text-[var(--text-muted)]">Résultat Net Comptable</div>
            <div className="text-2xl font-serif font-bold text-[#c59b52] mt-1">
              {fmt(pnl.netIncome)}
            </div>
            <div className="text-[10px] text-[#c59b52] font-bold">
              {pnl.netMarginPercent}% de rentabilité nette
            </div>
          </div>
        </div>

        {/* Structured Income Statement Rows */}
        <div className="rounded-xl border border-[var(--border)] overflow-hidden bg-[var(--bg-primary)] text-xs">
          {/* 1. PRODUITS D'EXPLOITATION */}
          <div className="bg-[var(--bg-secondary)] px-4 py-2.5 font-bold text-[var(--text-primary)] uppercase tracking-wider flex justify-between items-center border-b border-[var(--border)] font-serif">
            <span>I. PRODUITS D'EXPLOITATION (CHIFFRE D'AFFAIRES)</span>
            <span className="font-mono text-[#c59b52]">{fmt(pnl.revenue.totalRevenue)}</span>
          </div>
          <div className="divide-y divide-[var(--border)] px-4 font-mono">
            <div className="py-2 flex justify-between">
              <span className="text-[var(--text-secondary)] font-sans">Ventes de cadres sur-mesure (SaaS Direct)</span>
              <span>{fmt(pnl.revenue.customFramesSales)}</span>
            </div>
            <div className="py-2 flex justify-between">
              <span className="text-[var(--text-secondary)] font-sans">Commissions Marketplace Artistes</span>
              <span>{fmt(pnl.revenue.marketplaceCommissions)}</span>
            </div>
            <div className="py-2 flex justify-between">
              <span className="text-[var(--text-secondary)] font-sans">Commandes Entreprises & B2B</span>
              <span>{fmt(pnl.revenue.b2bCorporateSales)}</span>
            </div>
            <div className="py-2 flex justify-between">
              <span className="text-[var(--text-secondary)] font-sans">Frais de port refacturés clients</span>
              <span>{fmt(pnl.revenue.shippingFeesCollected)}</span>
            </div>
          </div>

          {/* 2. COÛTS DIRECTS */}
          <div className="bg-[var(--bg-secondary)] px-4 py-2.5 font-bold text-[var(--text-primary)] uppercase tracking-wider flex justify-between items-center border-y border-[var(--border)] mt-2 font-serif">
            <span>II. ACHATS CONSOMMÉS & COÛTS DIRECTS (COGS)</span>
            <span className="font-mono text-rose-400">-{fmt(pnl.cogs.totalCogs)}</span>
          </div>
          <div className="divide-y divide-[var(--border)] px-4 font-mono">
            <div className="py-2 flex justify-between">
              <span className="text-[var(--text-secondary)] font-sans">Baguettes en bois noble (Chêne, Noyer, Doré)</span>
              <span className="text-rose-400">-{fmt(pnl.cogs.woodMouldings)}</span>
            </div>
            <div className="py-2 flex justify-between">
              <span className="text-[var(--text-secondary)] font-sans">Vitrage optique musée & anti-reflet UV</span>
              <span className="text-rose-400">-{fmt(pnl.cogs.glassAndPlexiglass)}</span>
            </div>
            <div className="py-2 flex justify-between">
              <span className="text-[var(--text-secondary)] font-sans">Passe-partout 100% coton sans acide</span>
              <span className="text-rose-400">-{fmt(pnl.cogs.matboards)}</span>
            </div>
            <div className="py-2 flex justify-between">
              <span className="text-[var(--text-secondary)] font-sans">Emballages renforcés & caisses de transport</span>
              <span className="text-rose-400">-{fmt(pnl.cogs.packaging)}</span>
            </div>
            <div className="py-2 flex justify-between">
              <span className="text-[var(--text-secondary)] font-sans">Expéditions DHL Express & transporteurs</span>
              <span className="text-rose-400">-{fmt(pnl.cogs.shippingCosts)}</span>
            </div>
          </div>

          {/* 3. CHARGES D'EXPLOITATION */}
          <div className="bg-[var(--bg-secondary)] px-4 py-2.5 font-bold text-[var(--text-primary)] uppercase tracking-wider flex justify-between items-center border-y border-[var(--border)] mt-2 font-serif">
            <span>III. CHARGES D'EXPLOITATION & FRAIS GÉNÉRAUX (OPEX)</span>
            <span className="font-mono text-rose-400">-{fmt(pnl.opex.totalOpex)}</span>
          </div>
          <div className="divide-y divide-[var(--border)] px-4 font-mono">
            <div className="py-2 flex justify-between">
              <span className="text-[var(--text-secondary)] font-sans">Salaires atelier & équipe</span>
              <span className="text-rose-400">-{fmt(pnl.opex.salariesAndWages)}</span>
            </div>
            <div className="py-2 flex justify-between">
              <span className="text-[var(--text-secondary)] font-sans">Loyer atelier Paris 11e & énergie</span>
              <span className="text-rose-400">-{fmt(pnl.opex.workshopRentAndUtilities)}</span>
            </div>
            <div className="py-2 flex justify-between">
              <span className="text-[var(--text-secondary)] font-sans">Marketing digital & acquisition</span>
              <span className="text-rose-400">-{fmt(pnl.opex.marketingAndAds)}</span>
            </div>
            <div className="py-2 flex justify-between">
              <span className="text-[var(--text-secondary)] font-sans">Commissions bancaires & passerelle Stripe</span>
              <span className="text-rose-400">-{fmt(pnl.opex.paymentProcessingFees)}</span>
            </div>
          </div>

          {/* TOTAL FINAL */}
          <div className="bg-[#c59b52]/10 border-t-2 border-[#c59b52] px-4 py-3 font-bold text-[var(--text-primary)] flex justify-between items-center font-serif text-sm">
            <span>RÉSULTAT NET DE L'EXERCICE</span>
            <span className="font-mono text-[#c59b52] text-base">{fmt(pnl.netIncome)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
