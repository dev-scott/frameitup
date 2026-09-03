'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@frameitup/ui';
import { VatReport } from '@frameitup/types';
import { Landmark, ArrowDownLeft, ArrowUpRight, Scale } from 'lucide-react';

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
    <Card className="border border-[var(--border-gold)] glass-card rounded-2xl shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-[var(--border)]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#c59b52]/10 text-[#c59b52] border border-[#c59b52]/20">
            <Landmark className="h-4 w-4" />
          </div>
          <div>
            <CardTitle className="text-base font-bold font-serif text-[var(--text-primary)]">
              Déclaration & Balance de TVA (Taxe sur la Valeur Ajoutée)
            </CardTitle>
            <p className="text-xs text-[var(--text-muted)]">Période : {vatReport.period} (Régime normal)</p>
          </div>
        </div>

        <span className="text-[10px] font-bold text-[#c59b52] bg-[#c59b52]/10 px-2.5 py-0.5 rounded-full border border-[#c59b52]/20">
          Taux Normal 20.0%
        </span>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* TVA Collectée */}
          <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)] font-medium">TVA Collectée (Ventes)</span>
              <ArrowDownLeft className="h-4 w-4 text-[#c59b52]" />
            </div>
            <div className="text-xl font-serif font-bold text-[var(--text-primary)] font-mono">
              {symbol}
              {collected.toLocaleString('fr-FR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div className="text-[11px] text-[var(--text-subtle)]">
              Sur base CA HT de {symbol}
              {(vatReport.totalTaxableSales * rate).toLocaleString('fr-FR')}
            </div>
          </div>

          {/* TVA Déductible */}
          <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)] font-medium">TVA Déductible (Achats)</span>
              <ArrowUpRight className="h-4 w-4 text-rose-400" />
            </div>
            <div className="text-xl font-serif font-bold text-rose-400 font-mono">
              -{symbol}
              {deductible.toLocaleString('fr-FR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div className="text-[11px] text-[var(--text-subtle)]">
              Sur base achats HT de {symbol}
              {(vatReport.totalTaxablePurchases * rate).toLocaleString('fr-FR')}
            </div>
          </div>

          {/* TVA Nette Due */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#c59b52]/15 via-[var(--bg-card)] to-[var(--bg-primary)] border border-[var(--border-gold)] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#c59b52] font-bold font-serif">TVA Nette à Reverser</span>
              <Scale className="h-4 w-4 text-[#c59b52]" />
            </div>
            <div className="text-2xl font-serif font-bold text-[#c59b52] font-mono">
              {symbol}
              {netDue.toLocaleString('fr-FR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div className="text-[11px] text-[var(--text-muted)]">
              Échéance télédéclaration : 24 du mois suivant
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
