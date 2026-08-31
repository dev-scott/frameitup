'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@frameitup/ui';
import { ProfitAndLossStatement } from '@frameitup/types';
import { LineChart, Printer, Download, Sparkles, TrendingUp, CheckCircle } from 'lucide-react';

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
    <Card className="border-gray-800/80 bg-gradient-to-b from-gray-900/90 to-gray-900/40 backdrop-blur-md">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-800/60">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <LineChart className="h-4 w-4" />
            </div>
            <CardTitle className="text-base font-bold text-white">
              Compte de Résultat Officiel (P&L / Profit and Loss)
            </CardTitle>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {pnl.period} — Structure comptable normalisée et soldes intermédiaires de gestion
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handlePrint}
            className="border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs h-9 gap-1.5"
          >
            <Printer className="h-3.5 w-3.5" />
            Imprimer / Exporter PDF
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-6">
        {/* Top Summary Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-xl bg-gray-950/80 border border-gray-800">
          <div>
            <div className="text-[11px] text-gray-400">Chiffre d'Affaires HT</div>
            <div className="text-lg font-bold text-white font-mono">
              {fmt(pnl.revenue.totalRevenue)}
            </div>
            <div className="text-[10px] text-emerald-400">100% de l'activité</div>
          </div>
          <div>
            <div className="text-[11px] text-gray-400">Marge Brute d'Atelier</div>
            <div className="text-lg font-bold text-emerald-400 font-mono">
              {fmt(pnl.grossProfit)}
            </div>
            <div className="text-[10px] text-emerald-500">{pnl.grossMarginPercent}% de marge</div>
          </div>
          <div>
            <div className="text-[11px] text-gray-400">EBITDA (EBE)</div>
            <div className="text-lg font-bold text-blue-400 font-mono">
              {fmt(pnl.operatingIncomeEbitda)}
            </div>
            <div className="text-[10px] text-blue-400">
              {((pnl.operatingIncomeEbitda / pnl.revenue.totalRevenue) * 100).toFixed(1)}% du CA
            </div>
          </div>
          <div>
            <div className="text-[11px] text-gray-400">Résultat Net Comptable</div>
            <div className="text-xl font-black text-emerald-400 font-mono">
              {fmt(pnl.netIncome)}
            </div>
            <div className="text-[10px] text-emerald-400 font-bold">
              {pnl.netMarginPercent}% de rentabilité nette
            </div>
          </div>
        </div>

        {/* Structured Income Statement Rows */}
        <div className="rounded-xl border border-gray-800 overflow-hidden bg-gray-950/40 text-xs">
          {/* 1. PRODUITS D'EXPLOITATION */}
          <div className="bg-gray-900/80 px-4 py-2.5 font-bold text-gray-200 uppercase tracking-wider flex justify-between items-center border-b border-gray-800">
            <span>I. PRODUITS D'EXPLOITATION (CHIFFRE D'AFFAIRES)</span>
            <span className="font-mono text-emerald-400">{fmt(pnl.revenue.totalRevenue)}</span>
          </div>
          <div className="divide-y divide-gray-800/40 px-4 py-2 space-y-1">
            <div className="flex justify-between py-1.5 text-gray-300">
              <span className="pl-4">Ventes d'encadrements sur-mesure SaaS (Direct B2C)</span>
              <span className="font-mono font-medium">{fmt(pnl.revenue.saasCustomFrames)}</span>
            </div>
            <div className="flex justify-between py-1.5 text-gray-300">
              <span className="pl-4">Commissions Ventes Marketplace Artistes</span>
              <span className="font-mono font-medium">{fmt(pnl.revenue.marketplaceArt)}</span>
            </div>
            <div className="flex justify-between py-1.5 text-gray-300">
              <span className="pl-4">Contrats & Commandes Spéciales B2B Entreprises</span>
              <span className="font-mono font-medium">{fmt(pnl.revenue.corporateB2b)}</span>
            </div>
            <div className="flex justify-between py-1.5 text-gray-300">
              <span className="pl-4">Abonnements Club Collectionneur & Pro</span>
              <span className="font-mono font-medium">{fmt(pnl.revenue.subscriptions)}</span>
            </div>
          </div>

          {/* 2. COUTS DIRECTS (COGS) */}
          <div className="bg-gray-900/80 px-4 py-2.5 font-bold text-gray-200 uppercase tracking-wider flex justify-between items-center border-t border-b border-gray-800">
            <span>II. COÛTS DIRECTS MATIÈRES & FABRICATION (COGS)</span>
            <span className="font-mono text-rose-400">-{fmt(pnl.costOfGoodsSold.totalCogs)}</span>
          </div>
          <div className="divide-y divide-gray-800/40 px-4 py-2 space-y-1">
            <div className="flex justify-between py-1.5 text-gray-300">
              <span className="pl-4">Achats baguettes & moulures bois noble</span>
              <span className="font-mono font-medium text-rose-400">-{fmt(pnl.costOfGoodsSold.woodMouldings)}</span>
            </div>
            <div className="flex justify-between py-1.5 text-gray-300">
              <span className="pl-4">Verres optiques, verres musée & plexiglas UV</span>
              <span className="font-mono font-medium text-rose-400">-{fmt(pnl.costOfGoodsSold.museumGlassPlexi)}</span>
            </div>
            <div className="flex justify-between py-1.5 text-gray-300">
              <span className="pl-4">Cartons de fond & passe-partout sans acide</span>
              <span className="font-mono font-medium text-rose-400">-{fmt(pnl.costOfGoodsSold.matboardsBackings)}</span>
            </div>
            <div className="flex justify-between py-1.5 text-gray-300">
              <span className="pl-4">Emballages renforcés & caisses d'expédition</span>
              <span className="font-mono font-medium text-rose-400">-{fmt(pnl.costOfGoodsSold.packagingSupplies)}</span>
            </div>
            <div className="flex justify-between py-1.5 text-gray-300">
              <span className="pl-4">Transport direct DHL Express & messagerie</span>
              <span className="font-mono font-medium text-rose-400">-{fmt(pnl.costOfGoodsSold.directShipping)}</span>
            </div>
          </div>

          {/* MARGE BRUTE BANNER */}
          <div className="bg-emerald-950/40 px-4 py-2.5 font-bold text-emerald-400 uppercase tracking-wider flex justify-between items-center border-t border-b border-emerald-500/30">
            <span>= MARGE BRUTE D'EXPLOITATION</span>
            <span className="font-mono text-sm">{fmt(pnl.grossProfit)} ({pnl.grossMarginPercent}%)</span>
          </div>

          {/* 3. CHARGES D'EXPLOITATION (OPEX) */}
          <div className="bg-gray-900/80 px-4 py-2.5 font-bold text-gray-200 uppercase tracking-wider flex justify-between items-center border-b border-gray-800">
            <span>III. CHARGES DE FONCTIONNEMENT (OPEX)</span>
            <span className="font-mono text-rose-400">-{fmt(pnl.operatingExpenses.totalOpex)}</span>
          </div>
          <div className="divide-y divide-gray-800/40 px-4 py-2 space-y-1">
            <div className="flex justify-between py-1.5 text-gray-300">
              <span className="pl-4">Salaires, traitements & charges sociales</span>
              <span className="font-mono font-medium text-rose-400">-{fmt(pnl.operatingExpenses.salariesAndWages)}</span>
            </div>
            <div className="flex justify-between py-1.5 text-gray-300">
              <span className="pl-4">Marketing, acquisition client & annonces</span>
              <span className="font-mono font-medium text-rose-400">-{fmt(pnl.operatingExpenses.marketingAndAds)}</span>
            </div>
            <div className="flex justify-between py-1.5 text-gray-300">
              <span className="pl-4">Loyer de l'atelier de fabrication & charges</span>
              <span className="font-mono font-medium text-rose-400">-{fmt(pnl.operatingExpenses.workshopRentAndUtilities)}</span>
            </div>
            <div className="flex justify-between py-1.5 text-gray-300">
              <span className="pl-4">Commissions de paiement en ligne (Stripe 2.9%)</span>
              <span className="font-mono font-medium text-rose-400">-{fmt(pnl.operatingExpenses.paymentProcessingFees)}</span>
            </div>
            <div className="flex justify-between py-1.5 text-gray-300">
              <span className="pl-4">Honoraires comptables & conseils juridiques</span>
              <span className="font-mono font-medium text-rose-400">-{fmt(pnl.operatingExpenses.legalAndAccounting)}</span>
            </div>
            <div className="flex justify-between py-1.5 text-gray-300">
              <span className="pl-4">Serveurs cloud, SaaS & abonnements tech</span>
              <span className="font-mono font-medium text-rose-400">-{fmt(pnl.operatingExpenses.softwareAndHosting)}</span>
            </div>
          </div>

          {/* EBITDA & NET RESULT */}
          <div className="bg-blue-950/40 px-4 py-2.5 font-bold text-blue-400 uppercase tracking-wider flex justify-between items-center border-t border-b border-blue-500/30">
            <span>= EXCÉDENT BRUT D'EXPLOITATION (EBITDA)</span>
            <span className="font-mono text-sm">{fmt(pnl.operatingIncomeEbitda)}</span>
          </div>

          <div className="px-4 py-2 space-y-1">
            <div className="flex justify-between py-1.5 text-gray-400">
              <span className="pl-4">Impôts sur les bénéfices & taxes diverses</span>
              <span className="font-mono text-rose-400">-{fmt(pnl.taxesAndDuties)}</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-gray-900 px-4 py-3.5 font-black text-white uppercase tracking-wider flex justify-between items-center border-t border-emerald-500/50">
            <span className="text-sm text-emerald-400">RÉSULTAT NET COMPTABLE (BÉNÉFICE NET)</span>
            <span className="font-mono text-base text-emerald-400">{fmt(pnl.netIncome)} ({pnl.netMarginPercent}%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
