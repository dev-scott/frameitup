'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@frameitup/ui';
import { Supplier, ExpenseCategory } from '@frameitup/types';
import { Building2, Mail, Phone, Clock, FileText, CheckCircle2 } from 'lucide-react';

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
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Building2 className="h-4 w-4 text-emerald-400" />
            Répertoire des Fournisseurs Stratégiques & Encours
          </h3>
          <p className="text-xs text-gray-400">
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
              className="border-gray-800/80 bg-gradient-to-b from-gray-900/90 to-gray-900/40 backdrop-blur-md hover:border-gray-700/80 transition-all"
            >
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">{supp.name}</h4>
                    <span className="inline-block text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20 mt-1">
                      {supp.category.replace('RAW_MATERIALS_', '').replace('_', ' ')}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-gray-400 bg-gray-800 px-2 py-0.5 rounded border border-gray-700">
                    {supp.paymentTerms.replace('_', ' ')}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-gray-400 pt-1">
                  {supp.contactEmail && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-gray-500 flex-shrink-0" />
                      <span className="truncate text-gray-300">{supp.contactEmail}</span>
                    </div>
                  )}
                  {supp.taxId && (
                    <div className="flex items-center gap-2">
                      <FileText className="h-3.5 w-3.5 text-gray-500 flex-shrink-0" />
                      <span className="text-gray-400 text-[11px]">N° TVA : {supp.taxId}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-gray-800 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">Solde à payer :</span>
                  <span
                    className={`font-mono font-bold text-xs ${
                      hasBalance ? 'text-amber-400' : 'text-emerald-400'
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
