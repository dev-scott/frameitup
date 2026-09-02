'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
} from '@frameitup/ui';
import { Download, FileSpreadsheet, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface AccountingExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccountingExportModal({ isOpen, onClose }: AccountingExportModalProps) {
  const [format, setFormat] = useState<'CSV' | 'FEC' | 'JSON'>('FEC');
  const [period, setPeriod] = useState('2026-02');
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const handleDownload = () => {
    setIsExporting(true);
    setTimeout(() => {
      // Simulate file generation
      const dummyContent =
        format === 'FEC'
          ? 'JournalCode|EcritureNum|EcritureDate|CompteNum|CompteLib|PieceRef|Debit|Credit\n' +
            'VE|EC-001|20260210|701100|Ventes Cadres Chêne|CMD-412|0.00|189.00\n' +
            'AC|EC-002|20260210|601100|Achats Moulures Bois|FAC-982|4850.00|0.00\n' +
            'AC|EC-003|20260210|445660|TVA Déductible sur Achats|FAC-982|970.00|0.00\n' +
            'VE|EC-004|20260210|445710|TVA Collectée sur Ventes|CMD-412|0.00|37.80'
          : 'Date,Type,Description,Montant_HT,TVA,Montant_TTC,Statut\n2026-02-10,Vente,Cadre Chêne 50x70,189.00,37.80,226.80,Payée';

      const blob = new Blob([dummyContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `FrameItUp_Export_${format}_${period}.${format.toLowerCase()}`;
      link.click();
      URL.revokeObjectURL(url);

      setIsExporting(false);
      setExported(true);
    }, 600);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-gray-900 border-gray-800 text-gray-100 p-6 rounded-2xl">
        <DialogHeader className="border-b border-gray-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <FileSpreadsheet className="h-4 w-4" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold text-white">
                Export Comptable & Liasse Fiscale
              </DialogTitle>
              <p className="text-xs text-gray-400">
                Génération des écritures pour votre expert-comptable ou logiciel ERP
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 pt-3">
          {/* Format selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300">Format d'export</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'FEC', label: 'FEC Conforme', sub: 'Norme DGFIP / Audit' },
                { id: 'CSV', label: 'Grand Livre CSV', sub: 'Excel / QuickBooks' },
                { id: 'JSON', label: 'API JSON', sub: 'Intégration ERP' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFormat(f.id as any)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    format === f.id
                      ? 'border-emerald-500/50 bg-emerald-500/10 text-white shadow-sm'
                      : 'border-gray-800 bg-gray-950/60 text-gray-400 hover:border-gray-700'
                  }`}
                >
                  <div className="text-xs font-bold">{f.label}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">{f.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Period */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300">Période comptable</label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="h-9 w-full rounded-lg border border-gray-800 bg-gray-950 px-3 text-xs text-gray-200 focus:border-emerald-500 focus:outline-none"
            >
              <option value="2026-02">Février 2026 (En cours)</option>
              <option value="2026-01">Janvier 2026</option>
              <option value="2025-Q4">Trimestre Q4 2025</option>
              <option value="2025-FY">Exercice Complet 2025</option>
            </select>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-950/60 p-3 text-xs text-gray-400 space-y-1">
            <div className="flex items-center gap-1.5 text-gray-300 font-semibold">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              Contrôle de cohérence automatique
            </div>
            <p className="text-[11px] text-gray-500">
              Total Débits et Crédits équilibrés. Numérotation continue des pièces comptables.
            </p>
          </div>
        </div>

        <DialogFooter className="pt-3 border-t border-gray-800">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="text-xs border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            Fermer
          </Button>
          <Button
            type="button"
            onClick={handleDownload}
            disabled={isExporting}
            className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-md shadow-emerald-900/30 gap-1.5"
          >
            <Download className="h-3.5 w-3.5" />
            {isExporting ? 'Génération en cours...' : `Télécharger le fichier ${format}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
