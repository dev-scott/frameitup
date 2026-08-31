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
import { ShoppingBag, Search, Sparkles, TrendingUp, Filter } from 'lucide-react';

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

  const totalSales = filtered.reduce((sum, o) => sum + o.sellingPrice, 0);
  const totalNetMargin = filtered.reduce((sum, o) => sum + o.netMargin, 0);

  return (
    <Card className="border-gray-800/80 bg-gradient-to-b from-gray-900/90 to-gray-900/40 backdrop-blur-md">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-800/60">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <CardTitle className="text-base font-bold text-white">
              Analyse Unitaire de Rentabilité par Commande (Unit Economics)
            </CardTitle>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Décomposition du prix de vente, coût matière, vitrage musée, transport et commission Stripe
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-right">
            <div className="text-[10px] text-gray-400 uppercase">Marge Nette Moyenne</div>
            <div className="text-sm font-bold text-emerald-400 font-mono">{avgMargin}%</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par n° de commande, client, produit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-lg border border-gray-800 bg-gray-950/70 pl-9 pr-3 text-xs text-gray-200 placeholder:text-gray-500 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        {/* Table */}
        <div className="rounded-xl border border-gray-800/80 overflow-hidden bg-gray-950/40">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-900/60 border-b border-gray-800">
                <TableHead className="text-gray-400 text-xs">Commande</TableHead>
                <TableHead className="text-gray-400 text-xs">Client & Spécifications</TableHead>
                <TableHead className="text-right text-gray-400 text-xs">Prix Vente</TableHead>
                <TableHead className="text-right text-gray-400 text-xs">Bois / Cadre</TableHead>
                <TableHead className="text-right text-gray-400 text-xs">Verre / Vitrage</TableHead>
                <TableHead className="text-right text-gray-400 text-xs">Port & Emballage</TableHead>
                <TableHead className="text-right text-gray-400 text-xs">Frais Stripe</TableHead>
                <TableHead className="text-right text-gray-400 text-xs">Coût Total</TableHead>
                <TableHead className="text-right text-gray-400 text-xs">Marge Nette ($)</TableHead>
                <TableHead className="text-right text-gray-400 text-xs">Marge (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((o) => (
                <TableRow key={o.orderId} className="hover:bg-gray-800/30">
                  <TableCell className="text-xs font-mono font-bold text-emerald-400">
                    {o.orderNumber}
                    <div className="text-[10px] text-gray-500 font-normal">
                      {new Date(o.date).toLocaleDateString('fr-FR')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs font-semibold text-white">{o.clientName}</div>
                    <div className="text-[11px] text-gray-400 line-clamp-1">{o.productName}</div>
                  </TableCell>
                  <TableCell className="text-right text-xs font-mono font-bold text-white">
                    {symbol}
                    {(o.sellingPrice * rate).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right text-xs font-mono text-rose-400">
                    -{symbol}
                    {(o.costMaterial * rate).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right text-xs font-mono text-rose-400">
                    -{symbol}
                    {(o.costGlass * rate).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right text-xs font-mono text-rose-400">
                    -{symbol}
                    {((o.costPackaging + o.costShipping) * rate).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right text-xs font-mono text-rose-400">
                    -{symbol}
                    {(o.stripeFee * rate).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right text-xs font-mono text-gray-400 font-medium">
                    {symbol}
                    {(o.totalCost * rate).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right text-xs font-mono font-bold text-emerald-400">
                    +{symbol}
                    {(o.netMargin * rate).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="inline-block px-2 py-0.5 rounded-md text-xs font-bold font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {o.netMarginPercent}%
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Footer Summary */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-gray-950/80 border border-gray-800/80">
          <div className="text-xs text-gray-400">
            Total échantillon : <span className="font-bold text-white">{filtered.length} commandes</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-[10px] uppercase text-gray-400">Chiffre d'Affaires Ventes</div>
              <div className="text-xs font-bold text-white font-mono">
                {symbol}
                {(totalSales * rate).toLocaleString('fr-FR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>

            <div className="text-right border-l border-gray-800 pl-6">
              <div className="text-[10px] uppercase text-emerald-400 font-bold">Marge Nette Dégagée</div>
              <div className="text-base font-black text-emerald-400 font-mono">
                {symbol}
                {(totalNetMargin * rate).toLocaleString('fr-FR', {
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
