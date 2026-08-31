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
  Badge,
  Button,
} from '@frameitup/ui';
import { Expense, ExpenseCategory, ExpenseStatus } from '@frameitup/types';
import {
  Receipt,
  Search,
  Filter,
  Download,
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building2,
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
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
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
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Receipt className="h-4 w-4" />
            </div>
            <CardTitle className="text-base font-bold text-white">
              Gestion des Dépenses & Achats Fournisseurs
            </CardTitle>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Enregistrement des factures d'achats, déductibilité de la TVA et suivi des règlements
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={onAddExpense}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs h-9 gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" />
            Nouvelle Dépense
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Filtrer par libellé ou fournisseur..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-full rounded-lg border border-gray-800 bg-gray-950/70 pl-9 pr-3 text-xs text-gray-200 placeholder:text-gray-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-9 rounded-lg border border-gray-800 bg-gray-950/70 px-3 text-xs text-gray-300 focus:border-emerald-500 focus:outline-none"
            >
              <option value="ALL">Toutes les catégories</option>
              {Object.entries(categoryLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-9 rounded-lg border border-gray-800 bg-gray-950/70 px-3 text-xs text-gray-300 focus:border-emerald-500 focus:outline-none"
            >
              <option value="ALL">Tous les statuts</option>
              <option value="PAID">Payée</option>
              <option value="APPROVED">À Décaisser</option>
              <option value="PENDING">En attente</option>
            </select>
          </div>
        </div>

        {/* Expenses Table */}
        <div className="rounded-xl border border-gray-800/80 overflow-hidden bg-gray-950/40">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-900/60 border-b border-gray-800">
                <TableHead className="text-gray-400 text-xs">Date / Échéance</TableHead>
                <TableHead className="text-gray-400 text-xs">Fournisseur & Libellé</TableHead>
                <TableHead className="text-gray-400 text-xs">Catégorie</TableHead>
                <TableHead className="text-gray-400 text-xs">Paiement</TableHead>
                <TableHead className="text-right text-gray-400 text-xs">Montant HT</TableHead>
                <TableHead className="text-right text-gray-400 text-xs">TVA (20%)</TableHead>
                <TableHead className="text-right text-gray-400 text-xs">Total TTC</TableHead>
                <TableHead className="text-center text-gray-400 text-xs">Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500 text-xs">
                    Aucune dépense ne correspond aux critères de recherche.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((exp) => (
                  <TableRow key={exp.id} className="hover:bg-gray-800/30">
                    <TableCell className="text-xs text-gray-300 font-mono">
                      {new Date(exp.date).toLocaleDateString('fr-FR')}
                    </TableCell>
                    <TableCell>
                      <div className="text-xs font-semibold text-white">{exp.description}</div>
                      <div className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                        <Building2 className="h-3 w-3 text-gray-500" />
                        {exp.supplierName || 'Frais direct interne'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-[11px] font-medium text-gray-300 bg-gray-800/80 px-2 py-0.5 rounded-md border border-gray-700/50">
                        {categoryLabels[exp.category] || exp.category}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-gray-400">
                      {exp.paymentMethod.replace('_', ' ')}
                    </TableCell>
                    <TableCell className="text-right text-xs font-mono font-medium text-gray-300">
                      {symbol}
                      {(exp.amountUsd * rate).toLocaleString('fr-FR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell className="text-right text-xs font-mono text-gray-400">
                      {symbol}
                      {(exp.taxAmountUsd * rate).toLocaleString('fr-FR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell className="text-right text-xs font-mono font-bold text-white">
                      {symbol}
                      {(exp.totalWithTaxUsd * rate).toLocaleString('fr-FR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell className="text-center">{getStatusBadge(exp.status)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Totals Summary Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-gray-950/80 border border-gray-800/80">
          <div className="text-xs text-gray-400">
            Affichage de <span className="font-bold text-white">{filtered.length}</span> dépenses
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-[10px] uppercase text-gray-400">Total HT</div>
              <div className="text-xs font-bold text-gray-200 font-mono">
                {symbol}
                {(totalHT * rate).toLocaleString('fr-FR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] uppercase text-gray-400">TVA Déductible</div>
              <div className="text-xs font-bold text-emerald-400 font-mono">
                {symbol}
                {(totalTVA * rate).toLocaleString('fr-FR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>

            <div className="text-right border-l border-gray-800 pl-6">
              <div className="text-[10px] uppercase text-emerald-400 font-bold">Total Décaissements TTC</div>
              <div className="text-base font-black text-white font-mono">
                {symbol}
                {(totalTTC * rate).toLocaleString('fr-FR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
