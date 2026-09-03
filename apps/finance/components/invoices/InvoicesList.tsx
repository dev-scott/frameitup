'use client';

import React, { useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
} from '@frameitup/ui';
import { Invoice, InvoiceStatus } from '@frameitup/types';
import { FileText, Download, CheckCircle2, Clock, AlertTriangle, Building } from 'lucide-react';

interface InvoicesListProps {
  invoices: Invoice[];
  currency: 'USD' | 'EUR';
  onExportModalOpen: () => void;
  onToggleStatus?: (id: string) => void;
}

export function InvoicesList({
  invoices,
  currency,
  onExportModalOpen,
  onToggleStatus,
}: InvoicesListProps) {
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const symbol = currency === 'USD' ? '$' : '€';
  const rate = currency === 'USD' ? 1 : 0.92;

  const filtered = invoices.filter(
    (inv) => statusFilter === 'ALL' || inv.status === statusFilter
  );

  const getStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case InvoiceStatus.PAID:
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-[#c59b52]/10 px-2 py-0.5 text-xs font-semibold text-[#c59b52] border border-[#c59b52]/20">
            <CheckCircle2 className="h-3 w-3" /> Encaissée
          </span>
        );
      case InvoiceStatus.ISSUED:
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-semibold text-blue-400 border border-blue-500/20">
            <Clock className="h-3 w-3" /> Émise (En attente)
          </span>
        );
      case InvoiceStatus.OVERDUE:
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-rose-500/10 px-2 py-0.5 text-xs font-semibold text-rose-400 border border-rose-500/20">
            <AlertTriangle className="h-3 w-3" /> En Retard
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-[var(--bg-tertiary)] px-2 py-0.5 text-xs font-semibold text-[var(--text-muted)]">
            {status}
          </span>
        );
    }
  };

  return (
    <Card className="border border-[var(--border-gold)] glass-card rounded-2xl shadow-xl">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#c59b52]/10 text-[#c59b52] border border-[#c59b52]/20">
              <FileText className="h-4 w-4" />
            </div>
            <CardTitle className="text-base font-bold font-serif text-[var(--text-primary)]">
              Factures Clients & Commandes B2B / Proforma
            </CardTitle>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Émission, suivi des encaissements clients et téléchargement des justificatifs comptables
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={onExportModalOpen}
            variant="outline"
            className="border-[var(--border)] bg-[var(--bg-primary)] hover:bg-[var(--bg-tertiary)] text-[var(--text-primary)] text-xs h-9 gap-1.5 rounded-xl"
          >
            <Download className="h-3.5 w-3.5 text-[#c59b52]" />
            Exporter Écritures (FEC / CSV)
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        {/* Filter bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1 bg-[var(--bg-primary)] p-1 rounded-xl border border-[var(--border)] text-xs">
            {['ALL', 'PAID', 'ISSUED', 'OVERDUE'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  statusFilter === s
                    ? 'bg-[#c59b52] text-black font-bold shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                {s === 'ALL'
                  ? 'Toutes'
                  : s === 'PAID'
                  ? 'Encaissées'
                  : s === 'ISSUED'
                  ? 'En attente'
                  : 'En retard'}
              </button>
            ))}
          </div>

          <span className="text-xs text-[var(--text-muted)] font-mono">
            {filtered.length} facture(s)
          </span>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-[var(--border)] overflow-hidden">
          <Table>
            <TableHeader className="bg-[var(--bg-secondary)] text-[var(--text-muted)] text-[11px] uppercase tracking-wider font-semibold">
              <TableRow className="border-b border-[var(--border)]">
                <TableHead className="py-3 px-4">N° Facture</TableHead>
                <TableHead className="py-3 px-4">Client / Entreprise</TableHead>
                <TableHead className="py-3 px-4">Date d'Émission</TableHead>
                <TableHead className="py-3 px-4">Échéance</TableHead>
                <TableHead className="py-3 px-4 text-right">Montant HT</TableHead>
                <TableHead className="py-3 px-4 text-right">TVA 20%</TableHead>
                <TableHead className="py-3 px-4 text-right">Total TTC</TableHead>
                <TableHead className="py-3 px-4 text-center">Statut</TableHead>
                <TableHead className="py-3 px-4 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-[var(--border)] text-xs font-mono">
              {filtered.map((inv) => (
                <TableRow key={inv.id} className="hover:bg-[var(--bg-tertiary)]/40 transition-colors">
                  <TableCell className="py-3 px-4 font-bold text-[#c59b52]">
                    {inv.invoiceNumber}
                  </TableCell>
                  <TableCell className="py-3 px-4 font-sans font-medium text-[var(--text-primary)]">
                    <div className="flex items-center gap-1.5">
                      <Building className="h-3.5 w-3.5 text-[var(--text-subtle)]" />
                      <span>{inv.clientName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 px-4 text-[var(--text-muted)]">
                    {new Date(inv.issueDate).toLocaleDateString('fr-FR')}
                  </TableCell>
                  <TableCell className="py-3 px-4 text-[var(--text-muted)]">
                    {new Date(inv.dueDate).toLocaleDateString('fr-FR')}
                  </TableCell>
                  <TableCell className="py-3 px-4 text-right text-[var(--text-primary)]">
                    {symbol}{(inv.subtotalUsd * rate).toFixed(2)}
                  </TableCell>
                  <TableCell className="py-3 px-4 text-right text-[#c59b52]">
                    {symbol}{(inv.taxAmountUsd * rate).toFixed(2)}
                  </TableCell>
                  <TableCell className="py-3 px-4 text-right font-bold text-[var(--text-primary)]">
                    {symbol}{(inv.totalUsd * rate).toFixed(2)}
                  </TableCell>
                  <TableCell className="py-3 px-4 text-center">
                    {getStatusBadge(inv.status)}
                  </TableCell>
                  <TableCell className="py-3 px-4 text-right">
                    <button
                      onClick={() => alert(`Téléchargement de la facture ${inv.invoiceNumber} (PDF)`)}
                      className="inline-flex items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-2.5 py-1 text-[11px] text-[var(--text-secondary)] hover:text-[#c59b52] hover:border-[#c59b52]/50 transition-colors"
                    >
                      <Download className="h-3 w-3" /> PDF
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
