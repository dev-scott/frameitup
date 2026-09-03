'use client';

import React from 'react';
import { Card, CardContent } from '@frameitup/ui';
import { Supplier } from '@frameitup/types';
import { Building2, Mail, FileText } from 'lucide-react';

interface SuppliersDirectoryProps {
  suppliers: Supplier[];
  currency: 'USD' | 'EUR';
}

export function SuppliersDirectory({ suppliers, currency }: SuppliersDirectoryProps) {
  const symbol = currency === 'USD' ? '$' : '€';
  const rate = currency === 'USD' ? 1 : 0.92;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold font-serif text-[var(--text-primary)] flex items-center gap-2">
            <Building2 className="h-4 w-4 text-[#c59b52]" />
            Répertoire des Fournisseurs Stratégiques & Encours
          </h3>
          <p className="text-xs text-[var(--text-muted)]">
            Conditions de règlement (Net 30/60) et soldes en attente de paiement
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {suppliers.map((supp) => {
          const hasBalance = supp.balanceDueUsd > 0;
          return (
            <Card
              key={supp.id}
              className="border border-[var(--border-gold)] glass-card rounded-2xl hover:border-[#c59b52]/50 transition-all shadow-md"
            >
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-bold font-sans text-[var(--text-primary)] line-clamp-1">{supp.name}</h4>
                    <span className="inline-block text-[10px] font-medium text-[#c59b52] bg-[#c59b52]/10 px-2 py-0.5 rounded-md border border-[#c59b52]/20 mt-1">
                      {supp.category.replace('RAW_MATERIALS_', '').replace('_', ' ')}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-[var(--text-muted)] bg-[var(--bg-tertiary)] px-2 py-0.5 rounded border border-[var(--border)]">
                    {supp.paymentTerms.replace('_', ' ')}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-[var(--text-secondary)] pt-1">
                  {supp.contactEmail && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-[#c59b52] flex-shrink-0" />
                      <span className="truncate">{supp.contactEmail}</span>
                    </div>
                  )}
                  {supp.taxId && (
                    <div className="flex items-center gap-2">
                      <FileText className="h-3.5 w-3.5 text-[var(--text-subtle)] flex-shrink-0" />
                      <span className="text-[11px] text-[var(--text-muted)]">N° TVA : {supp.taxId}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between">
                  <span className="text-[11px] text-[var(--text-muted)]">Solde à payer :</span>
                  <span
                    className={`font-mono font-bold text-xs ${
                      hasBalance ? 'text-rose-400' : 'text-[#c59b52]'
                    }`}
                  >
                    {symbol}
                    {(supp.balanceDueUsd * rate).toLocaleString('fr-FR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
