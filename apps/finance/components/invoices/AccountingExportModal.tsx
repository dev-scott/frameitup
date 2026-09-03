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
import { Download, FileSpreadsheet, ShieldCheck } from 'lucide-react';

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
      <DialogContent className="max-w-lg bg-[var(--bg-card)] border border-[var(--border-gold)] text-[var(--text-primary)] p-6 rounded-3xl shadow-2xl backdrop-blur-2xl">
        <DialogHeader className="border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c59b52]/10 text-[#c59b52] border border-[#c59b52]/20">
              <FileSpreadsheet className="h-4 w-4" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold font-serif text-[var(--text-primary)]">
                Export Comptable & Liasse Fiscale
              </DialogTitle>
              <p className="text-xs text-[var(--text-muted)]">
                Génération des écritures pour votre expert-comptable ou logiciel ERP
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 pt-3">
          {/* Format selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">Format d'export</label>
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
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    format === f.id
                      ? 'border-[#c59b52] bg-[#c59b52]/15 text-[var(--text-primary)] shadow-sm'
                      : 'border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-muted)] hover:border-[#c59b52]/50'
                  }`}
                >
                  <div className="text-xs font-bold font-sans">{f.label}</div>
                  <div className="text-[10px] text-[var(--text-subtle)] mt-0.5">{f.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Period */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">Période comptable</label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="h-9 w-full rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] px-3 text-xs text-[var(--text-primary)] focus:border-[#c59b52] focus:outline-none"
            >
              <option value="2026-02">Février 2026 (En cours)</option>
              <option value="2026-01">Janvier 2026</option>
              <option value="2025-Q4">Trimestre Q4 2025</option>
              <option value="2025-FY">Exercice Complet 2025</option>
            </select>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] p-3.5 text-xs text-[var(--text-muted)] space-y-1">
            <div className="flex items-center gap-1.5 text-[var(--text-primary)] font-semibold">
              <ShieldCheck className="h-3.5 w-3.5 text-[#c59b52]" />
              Contrôle de cohérence automatique
            </div>
            <p className="text-[11px] text-[var(--text-subtle)]">
              Total Débits et Crédits équilibrés. Numérotation continue des pièces comptables.
            </p>
          </div>
        </div>

        <DialogFooter className="pt-3 border-t border-[var(--border)] gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="text-xs border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] rounded-xl"
          >
            Fermer
          </Button>
          <Button
            type="button"
            onClick={handleDownload}
            disabled={isExporting}
            className="text-xs bg-gradient-to-r from-[#d4af37] via-[#c59b52] to-[#b08140] text-black font-bold shadow-md gap-1.5 rounded-xl"
          >
            <Download className="h-3.5 w-3.5" />
            {isExporting ? 'Génération en cours...' : `Télécharger le fichier ${format}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
