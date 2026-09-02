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
import { FileText, Download, CheckCircle2, Clock, AlertTriangle, Building, Eye } from 'lucide-react';

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
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
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
          <span className="inline-flex items-center gap-1 rounded-md bg-gray-800 px-2 py-0.5 text-xs font-semibold text-gray-300">
            {status}
          </span>
        );
    }
  };

  return (
    <Card className="border-gray-800/80 bg-gradient-to-b from-gray-900/90 to-gray-900/40 backdrop-blur-md">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-800/60">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <FileText className="h-4 w-4" />
            </div>
            <CardTitle className="text-base font-bold text-white">
              Factures Clients & Commandes B2B / Proforma
            </CardTitle>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Émission, suivi des encaissements clients et téléchargement des justificatifs comptables
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={onExportModalOpen}
            variant="outline"
            className="border-gray-700 bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs h-9 gap-1.5"
          >
            <Download className="h-3.5 w-3.5" />
            Exporter Écritures (FEC / CSV)
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        {/* Filter bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {['ALL', 'PAID', 'ISSUED', 'OVERDUE'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  statusFilter === st
                    ? 'bg-gray-800 text-white border border-gray-700 shadow-sm'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {st === 'ALL' && 'Toutes les factures'}
                {st === 'PAID' && 'Encaissées'}
                {st === 'ISSUED' && 'En attente'}
                {st === 'OVERDUE' && 'En retard'}
              </button>
            ))}
          </div>

          <div className="text-xs text-gray-400">
            Total facturé :{' '}
            <span className="font-bold text-white font-mono">
              {symbol}
              {(
                filtered.reduce((sum, i) => sum + i.totalUsd, 0) * rate
              ).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-gray-800/80 overflow-hidden bg-gray-950/40">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-900/60 border-b border-gray-800">
                <TableHead className="text-gray-400 text-xs">N° Facture</TableHead>
                <TableHead className="text-gray-400 text-xs">Client & Contact</TableHead>
                <TableHead className="text-gray-400 text-xs">Date d'Émission</TableHead>
                <TableHead className="text-gray-400 text-xs">Date d'Échéance</TableHead>
                <TableHead className="text-right text-gray-400 text-xs">Total HT</TableHead>
                <TableHead className="text-right text-gray-400 text-xs">TVA (20%)</TableHead>
                <TableHead className="text-right text-gray-400 text-xs">Total TTC</TableHead>
                <TableHead className="text-center text-gray-400 text-xs">Statut</TableHead>
                <TableHead className="text-right text-gray-400 text-xs">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((inv) => (
                <TableRow key={inv.id} className="hover:bg-gray-800/30">
                  <TableCell className="text-xs font-mono font-bold text-blue-400">
                    {inv.invoiceNumber}
                  </TableCell>
                  <TableCell>
                    <div className="text-xs font-semibold text-white">{inv.clientName}</div>
                    <div className="text-[11px] text-gray-400">{inv.clientEmail}</div>
                  </TableCell>
                  <TableCell className="text-xs text-gray-300 font-mono">
                    {new Date(inv.issueDate).toLocaleDateString('fr-FR')}
                  </TableCell>
                  <TableCell className="text-xs text-gray-300 font-mono">
                    {new Date(inv.dueDate).toLocaleDateString('fr-FR')}
                  </TableCell>
                  <TableCell className="text-right text-xs font-mono text-gray-300">
                    {symbol}
                    {(inv.subtotalUsd * rate).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right text-xs font-mono text-gray-400">
                    {symbol}
                    {(inv.taxAmountUsd * rate).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right text-xs font-mono font-bold text-white">
                    {symbol}
                    {(inv.totalUsd * rate).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center">{getStatusBadge(inv.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      className="h-8 px-2 text-xs text-gray-400 hover:text-white hover:bg-gray-800"
                      onClick={() => alert(`Aperçu de la facture ${inv.invoiceNumber}`)}
                    >
                      <Eye className="h-3.5 w-3.5 mr-1" /> PDF
                    </Button>
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
