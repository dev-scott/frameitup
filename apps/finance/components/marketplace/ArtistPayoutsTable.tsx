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
import { ArtistPayout, PayoutStatus } from '@frameitup/types';
import { Palette, CheckCircle2, Clock, Send, ShieldCheck, DollarSign } from 'lucide-react';

interface ArtistPayoutsTableProps {
  payouts: ArtistPayout[];
  currency: 'USD' | 'EUR';
}

export function ArtistPayoutsTable({
  payouts: initialPayouts,
  currency,
}: ArtistPayoutsTableProps) {
  const [payouts, setPayouts] = useState<ArtistPayout[]>(initialPayouts);
  const symbol = currency === 'USD' ? '$' : '€';
  const rate = currency === 'USD' ? 1 : 0.92;

  const handleTriggerPayout = (id: string) => {
    setPayouts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status: PayoutStatus.PAID,
              stripeTransferId: `tr_1LIVE_${Date.now()}`,
              processedAt: new Date(),
            }
          : p
      )
    );
  };

  return (
    <Card className="border-gray-800/80 bg-gradient-to-b from-gray-900/90 to-gray-900/40 backdrop-blur-md">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-800/60">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20">
              <Palette className="h-4 w-4" />
            </div>
            <CardTitle className="text-base font-bold text-white">
              Reversements Marketplace Artistes (Stripe Connect)
            </CardTitle>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Partage de valeur : 70% pour l'artiste créateur / 30% commission FrameItUp
          </p>
        </div>

        <div className="rounded-xl bg-pink-500/10 border border-pink-500/20 px-3.5 py-1.5 text-right">
          <div className="text-[10px] text-gray-400 uppercase">Partage Moyen Artiste</div>
          <div className="text-sm font-bold text-pink-400 font-mono">70.0% des ventes</div>
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        <div className="rounded-xl border border-gray-800/80 overflow-hidden bg-gray-950/40">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-900/60 border-b border-gray-800">
                <TableHead className="text-gray-400 text-xs">Artiste Créateur</TableHead>
                <TableHead className="text-gray-400 text-xs">Pays & Compte Stripe</TableHead>
                <TableHead className="text-center text-gray-400 text-xs">Œuvres Vendues</TableHead>
                <TableHead className="text-gray-400 text-xs">Période</TableHead>
                <TableHead className="text-right text-gray-400 text-xs">Montant Royalties</TableHead>
                <TableHead className="text-center text-gray-400 text-xs">Statut Règlement</TableHead>
                <TableHead className="text-right text-gray-400 text-xs">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payouts.map((p) => {
                const isPaid = p.status === PayoutStatus.PAID;
                return (
                  <TableRow key={p.id} className="hover:bg-gray-800/30">
                    <TableCell>
                      <div className="text-xs font-bold text-white">
                        {p.artistId === 'art-elena' ? 'Elena Rostova' : 'Lucas Vance'}
                      </div>
                      <div className="text-[10px] text-gray-400">
                        {p.artist?.bio || 'Artiste peintre & plasticienne'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-gray-300">
                        {p.artist?.country || 'France'}
                      </span>
                      <div className="text-[10px] font-mono text-gray-500">
                        {p.artist?.stripeConnectId || 'acct_1NXY892ELENA'}
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-xs font-mono font-bold text-white">
                      {p.artworksCount} tirages
                    </TableCell>
                    <TableCell className="text-xs text-gray-300 font-mono">{p.period}</TableCell>
                    <TableCell className="text-right text-xs font-mono font-bold text-emerald-400">
                      {symbol}
                      {(p.amountUsd * rate).toLocaleString('fr-FR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell className="text-center">
                      {isPaid ? (
                        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="h-3 w-3" /> Virement Effectué
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-400 border border-amber-500/20">
                          <Clock className="h-3 w-3" /> En attente de validation
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {!isPaid && (
                        <Button
                          size="sm"
                          onClick={() => handleTriggerPayout(p.id)}
                          className="h-7 px-2.5 text-xs bg-pink-600 hover:bg-pink-500 text-white font-semibold gap-1"
                        >
                          <Send className="h-3 w-3" /> Déclencher Virement
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
