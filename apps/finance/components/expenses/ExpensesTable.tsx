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
import { Expense, ExpenseCategory, ExpenseStatus } from '@frameitup/types';
import {
  Receipt,
  Search,
  Plus,
  CheckCircle2,
  Clock,
  Building2,
  Download,
} from 'lucide-react';

interface ExpensesTableProps {
  expenses: Expense[];
  currency: 'USD' | 'EUR';
  onAddExpense: () => void;
  onApproveExpense?: (id: string) => void;
}

export function ExpensesTable({
  expenses,
  currency,
  onAddExpense,
  onApproveExpense,
}: ExpensesTableProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  const symbol = currency === 'USD' ? '$' : '€';
  const rate = currency === 'USD' ? 1 : 0.92;

  const categoryLabels: Record<string, string> = {
    RAW_MATERIALS_WOOD: 'Baguettes Bois / Moulures',
    RAW_MATERIALS_GLASS: 'Verre Optique & Musée',
    PACKAGING: 'Cartons & Emballages',
    SHIPPING_LOGISTICS: 'Transport & DHL Express',
    MARKETING_ADS: 'Publicité Meta & Google',
    SOFTWARE_SERVERS: 'Serveurs & Logiciels',
    PAYROLL_SALARIES: 'Salaires & Équipe',
    WORKSHOP_RENT: 'Loyer Atelier & Charges',
    PAYMENT_FEES: 'Frais Bancaires & Stripe',
    LEGAL_ACCOUNTING: 'Expert-Comptable & Juridique',
    OTHER_OPEX: 'Autres Frais Généraux',
  };

  const filtered = expenses.filter((e) => {
    const matchSearch =
      e.description.toLowerCase().includes(search.toLowerCase()) ||
      (e.supplierName && e.supplierName.toLowerCase().includes(search.toLowerCase()));
    const matchCat = selectedCategory === 'ALL' || e.category === selectedCategory;
    const matchStatus = selectedStatus === 'ALL' || e.status === selectedStatus;
    return matchSearch && matchCat && matchStatus;
  });

  const totalHT = filtered.reduce((sum, e) => sum + e.amountUsd, 0);
  const totalTVA = filtered.reduce((sum, e) => sum + e.taxAmountUsd, 0);
  const totalTTC = filtered.reduce((sum, e) => sum + e.totalWithTaxUsd, 0);

  const getStatusBadge = (status: ExpenseStatus) => {
    switch (status) {
      case ExpenseStatus.PAID:
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-[#c59b52]/10 px-2 py-0.5 text-xs font-semibold text-[#c59b52] border border-[#c59b52]/20">
            <CheckCircle2 className="h-3 w-3" /> Payée
          </span>
        );
      case ExpenseStatus.APPROVED:
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-400 border border-amber-500/20">
            <Clock className="h-3 w-3" /> À Décaisser
          </span>
        );
      case ExpenseStatus.PENDING:
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-semibold text-blue-400 border border-blue-500/20">
            <Clock className="h-3 w-3" /> En Attente
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
    <div className="space-y-6">
      {/* Top Totals Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-[var(--border-gold)] glass-card p-4">
          <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Total Dépenses HT</span>
          <div className="text-xl font-serif font-bold text-[var(--text-primary)] mt-1">
            {symbol}{(totalHT * rate).toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div className="rounded-2xl border border-[var(--border-gold)] glass-card p-4">
          <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">TVA Déductible Récupérable</span>
          <div className="text-xl font-serif font-bold text-[#c59b52] mt-1">
            {symbol}{(totalTVA * rate).toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div className="rounded-2xl border border-[var(--border-gold)] glass-card p-4">
          <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] tracking-wider">Total TTC Décaissements</span>
          <div className="text-xl font-serif font-bold text-[var(--text-primary)] mt-1">
            {symbol}{(totalTTC * rate).toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <Card className="border border-[var(--border-gold)] glass-card rounded-2xl shadow-xl">
        <CardHeader className="pb-4 border-b border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c59b52]/10 text-[#c59b52] border border-[#c59b52]/20">
              <Receipt className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-base font-bold font-serif text-[var(--text-primary)]">
                Journal des Dépenses & Achats Matières
              </CardTitle>
              <p className="text-xs text-[var(--text-muted)]">
                {filtered.length} écriture(s) enregistrée(s)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={onAddExpense}
              className="gap-1.5 bg-gradient-to-r from-[#d4af37] to-[#b08140] text-black font-bold text-xs h-9 rounded-xl shadow-md"
            >
              <Plus className="h-4 w-4" />
              Nouvelle Dépense
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-4 space-y-4">
          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[var(--text-subtle)]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filtrer par intitulé, fournisseur..."
                className="w-full h-8.5 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] pl-9 pr-3 text-xs text-[var(--text-primary)] focus:border-[#c59b52] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-8.5 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] px-3 text-xs text-[var(--text-primary)] focus:border-[#c59b52] focus:outline-none"
              >
                <option value="ALL">Toutes Catégories</option>
                {Object.entries(categoryLabels).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="h-8.5 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] px-3 text-xs text-[var(--text-primary)] focus:border-[#c59b52] focus:outline-none"
              >
                <option value="ALL">Tous Statuts</option>
                <option value="PAID">Payée</option>
                <option value="APPROVED">À Décaisser</option>
                <option value="PENDING">En Attente</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-xl border border-[var(--border)] overflow-hidden">
            <Table>
              <TableHeader className="bg-[var(--bg-secondary)] text-[var(--text-muted)] text-[11px] uppercase tracking-wider font-semibold">
                <TableRow>
                  <TableHead className="py-3 px-4">Date</TableHead>
                  <TableHead className="py-3 px-4">Fournisseur & Intitulé</TableHead>
                  <TableHead className="py-3 px-4">Catégorie</TableHead>
                  <TableHead className="py-3 px-4 text-right">Montant HT</TableHead>
                  <TableHead className="py-3 px-4 text-right">TVA ({symbol})</TableHead>
                  <TableHead className="py-3 px-4 text-right">Total TTC</TableHead>
                  <TableHead className="py-3 px-4 text-center">Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-[var(--border)] text-xs font-mono">
                {filtered.map((e) => (
                  <TableRow key={e.id} className="hover:bg-[var(--bg-tertiary)]/40 transition-colors">
                    <TableCell className="py-3 px-4 text-[var(--text-muted)]">
                      {new Date(e.expenseDate).toLocaleDateString('fr-FR')}
                    </TableCell>
                    <TableCell className="py-3 px-4 font-sans font-medium text-[var(--text-primary)]">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5 text-[#c59b52]" />
                        <span>{e.supplierName ?? 'Fournisseur Général'}</span>
                      </div>
                      <div className="text-[11px] text-[var(--text-muted)] font-normal">{e.description}</div>
                    </TableCell>
                    <TableCell className="py-3 px-4 font-sans text-[var(--text-secondary)]">
                      {categoryLabels[e.category] ?? e.category}
                    </TableCell>
                    <TableCell className="py-3 px-4 text-right text-[var(--text-primary)]">
                      {symbol}{(e.amountUsd * rate).toFixed(2)}
                    </TableCell>
                    <TableCell className="py-3 px-4 text-right text-[#c59b52]">
                      {symbol}{(e.taxAmountUsd * rate).toFixed(2)}
                    </TableCell>
                    <TableCell className="py-3 px-4 text-right font-bold text-[var(--text-primary)]">
                      {symbol}{(e.totalWithTaxUsd * rate).toFixed(2)}
                    </TableCell>
                    <TableCell className="py-3 px-4 text-center">
                      {getStatusBadge(e.status)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
