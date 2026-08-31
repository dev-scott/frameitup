'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@frameitup/ui';
import { VatReport } from '@frameitup/types';
import { Landmark, ArrowDownLeft, ArrowUpRight, Scale, Download, ShieldCheck } from 'lucide-react';

interface VatReportCardProps {
  vatReport: VatReport;
  currency: 'USD' | 'EUR';
}

export function VatReportCard({ vatReport, currency }: VatReportCardProps) {
  const symbol = currency === 'USD' ? '$' : '€';
  const rate = currency === 'USD' ? 1 : 0.92;

  const collected = vatReport.collectedVat * rate;
  const deductible = vatReport.deductibleVat * rate;
  const netDue = vatReport.netVatPayable * rate;

  return (
    <Card className="border-gray-800/80 bg-gradient-to-b from-gray-900/90 to-gray-900/40 backdrop-blur-md">
      <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-gray-800/60">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Landmark className="h-4 w-4" />
          </div>
          <div>
            <CardTitle className="text-sm font-bold text-white">
              Déclaration & Balance de TVA (Taxe sur la Valeur Ajoutée)
            </CardTitle>
            <p className="text-xs text-gray-400">Période : {vatReport.period} (Régime normal)</p>
          </div>
        </div>

        <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
          Taux Normal 20.0%
        </span>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* TVA Collectée */}
          <div className="p-4 rounded-xl bg-gray-950/60 border border-gray-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-medium">TVA Collectée (Ventes)</span>
              <ArrowDownLeft className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-xl font-bold text-white font-mono">
              {symbol}
              {collected.toLocaleString('fr-FR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div className="text-[11px] text-gray-500">
              Sur base CA HT de {symbol}
              {(vatReport.totalTaxableSales * rate).toLocaleString('fr-FR')}
            </div>
          </div>

          {/* TVA Déductible */}
          <div className="p-4 rounded-xl bg-gray-950/60 border border-gray-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-medium">TVA Déductible (Achats)</span>
              <ArrowUpRight className="h-4 w-4 text-rose-400" />
            </div>
            <div className="text-xl font-bold text-rose-400 font-mono">
              -{symbol}
              {deductible.toLocaleString('fr-FR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div className="text-[11px] text-gray-500">
              Sur base achats HT de {symbol}
              {(vatReport.totalTaxablePurchases * rate).toLocaleString('fr-FR')}
            </div>
          </div>

          {/* TVA Nette Due */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/50 via-gray-900 to-gray-950 border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-emerald-400 font-bold">TVA Nette à Reverser</span>
              <Scale className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-400 font-mono">
              {symbol}
              {netDue.toLocaleString('fr-FR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div className="text-[11px] text-gray-300">
              Échéance télédéclaration : 24 du mois suivant
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
