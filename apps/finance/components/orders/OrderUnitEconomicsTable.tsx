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
} from '@frameitup/ui';
import { UnitEconomics } from '@frameitup/types';
import { ShoppingBag, Search } from 'lucide-react';

interface OrderUnitEconomicsTableProps {
  orders: UnitEconomics[];
  currency: 'USD' | 'EUR';
}

export function OrderUnitEconomicsTable({ orders, currency }: OrderUnitEconomicsTableProps) {
  const [search, setSearch] = useState('');
  const symbol = currency === 'USD' ? '$' : '€';
  const rate = currency === 'USD' ? 1 : 0.92;

  const filtered = orders.filter(
    (o) =>
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.clientName.toLowerCase().includes(search.toLowerCase()) ||
      o.productName.toLowerCase().includes(search.toLowerCase())
  );

  const avgMargin =
    filtered.length > 0
      ? (filtered.reduce((sum, o) => sum + o.netMarginPercent, 0) / filtered.length).toFixed(1)
      : '0';

  return (
    <Card className="border border-[var(--border-gold)] glass-card rounded-2xl shadow-xl">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#c59b52]/10 text-[#c59b52] border border-[#c59b52]/20">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <CardTitle className="text-base font-bold font-serif text-[var(--text-primary)]">
              Analyse Unitaire de Rentabilité par Commande (Unit Economics)
            </CardTitle>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Décomposition du prix de vente, coût matière, vitrage musée, transport et commission Stripe
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-[#c59b52]/10 border border-[#c59b52]/30 px-3.5 py-1.5 text-right">
            <div className="text-[10px] text-[var(--text-muted)] uppercase font-semibold">Marge Nette Moyenne</div>
            <div className="text-sm font-bold text-[#c59b52] font-mono">{avgMargin}%</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[var(--text-subtle)]" />
          <input
            type="text"
            placeholder="Rechercher par n° de commande, client, produit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8.5 w-full rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] pl-9 pr-3 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-subtle)] focus:border-[#c59b52] focus:outline-none"
          />
        </div>

        {/* Table */}
        <div className="rounded-xl border border-[var(--border)] overflow-hidden">
          <Table>
            <TableHeader className="bg-[var(--bg-secondary)] text-[var(--text-muted)] text-[11px] uppercase tracking-wider font-semibold">
              <TableRow className="border-b border-[var(--border)]">
                <TableHead className="py-3 px-3">Commande</TableHead>
                <TableHead className="py-3 px-3">Client & Spécifications</TableHead>
                <TableHead className="py-3 px-3 text-right">Prix Vente</TableHead>
                <TableHead className="py-3 px-3 text-right">Bois</TableHead>
                <TableHead className="py-3 px-3 text-right">Vitrage</TableHead>
                <TableHead className="py-3 px-3 text-right">Port/Pack</TableHead>
                <TableHead className="py-3 px-3 text-right">Stripe</TableHead>
                <TableHead className="py-3 px-3 text-right">Coût Total</TableHead>
                <TableHead className="py-3 px-3 text-right text-[#c59b52]">Marge Nette</TableHead>
                <TableHead className="py-3 px-3 text-right">Marge (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-[var(--border)] text-xs font-mono">
              {filtered.map((o) => (
                <TableRow key={o.orderId} className="hover:bg-[var(--bg-tertiary)]/40 transition-colors">
                  <TableCell className="py-3 px-3 font-sans font-medium text-[var(--text-primary)]">
                    {o.orderNumber}
                  </TableCell>
                  <TableCell className="py-3 px-3 font-sans text-[var(--text-secondary)]">
                    <div className="font-semibold text-[var(--text-primary)]">{o.clientName}</div>
                    <div className="text-[11px] text-[var(--text-muted)]">{o.productName}</div>
                  </TableCell>
                  <TableCell className="py-3 px-3 text-right font-bold text-[var(--text-primary)]">
                    {symbol}{(o.sellingPrice * rate).toFixed(2)}
                  </TableCell>
                  <TableCell className="py-3 px-3 text-right text-rose-400">
                    {symbol}{(o.costMaterial * rate).toFixed(2)}
                  </TableCell>
                  <TableCell className="py-3 px-3 text-right text-rose-400">
                    {symbol}{(o.costGlass * rate).toFixed(2)}
                  </TableCell>
                  <TableCell className="py-3 px-3 text-right text-rose-400">
                    {symbol}{((o.costPackaging + o.costShipping) * rate).toFixed(2)}
                  </TableCell>
                  <TableCell className="py-3 px-3 text-right text-[var(--text-muted)]">
                    {symbol}{(o.stripeFee * rate).toFixed(2)}
                  </TableCell>
                  <TableCell className="py-3 px-3 text-right font-semibold text-rose-400">
                    {symbol}{(o.totalCost * rate).toFixed(2)}
                  </TableCell>
                  <TableCell className="py-3 px-3 text-right font-bold text-[#c59b52]">
                    {symbol}{(o.netMargin * rate).toFixed(2)}
                  </TableCell>
                  <TableCell className="py-3 px-3 text-right">
                    <span className="inline-flex items-center rounded-md bg-[#c59b52]/10 px-2 py-0.5 text-xs font-bold text-[#c59b52] border border-[#c59b52]/20">
                      {o.netMarginPercent}%
                    </span>
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
