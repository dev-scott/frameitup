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
import { Palette, CheckCircle2, Clock, Send } from 'lucide-react';

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
    <Card className="border border-[var(--border-gold)] glass-card rounded-2xl shadow-xl">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#c59b52]/10 text-[#c59b52] border border-[#c59b52]/20">
              <Palette className="h-4 w-4" />
            </div>
            <CardTitle className="text-base font-bold font-serif text-[var(--text-primary)]">
              Reversements Marketplace Artistes (Stripe Connect)
            </CardTitle>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Partage de valeur : 70% pour l'artiste créateur / 30% commission FrameItUp
          </p>
        </div>

        <div className="rounded-xl bg-[#c59b52]/10 border border-[#c59b52]/30 px-3.5 py-1.5 text-right">
          <div className="text-[10px] text-[var(--text-muted)] uppercase font-semibold">Partage Moyen Artiste</div>
          <div className="text-sm font-bold text-[#c59b52] font-mono">70.0% des ventes</div>
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        <div className="rounded-xl border border-[var(--border)] overflow-hidden">
          <Table>
            <TableHeader className="bg-[var(--bg-secondary)] text-[var(--text-muted)] text-[11px] uppercase tracking-wider font-semibold">
              <TableRow className="border-b border-[var(--border)]">
                <TableHead className="py-3 px-4">Artiste Créateur</TableHead>
                <TableHead className="py-3 px-4">Pays & Compte Stripe</TableHead>
                <TableHead className="py-3 px-4 text-center">Œuvres Vendues</TableHead>
                <TableHead className="py-3 px-4">Période</TableHead>
                <TableHead className="py-3 px-4 text-right">Montant Royalties</TableHead>
                <TableHead className="py-3 px-4 text-center">Statut Règlement</TableHead>
                <TableHead className="py-3 px-4 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-[var(--border)] text-xs font-mono">
              {payouts.map((p) => {
                const isPaid = p.status === PayoutStatus.PAID;
                return (
                  <TableRow key={p.id} className="hover:bg-[var(--bg-tertiary)]/40 transition-colors">
                    <TableCell className="py-3 px-4 font-sans">
                      <div className="font-bold text-[var(--text-primary)]">
                        {p.artistId === 'art-elena' ? 'Elena Rostova' : 'Lucas Vance'}
                      </div>
                      <div className="text-[11px] text-[var(--text-muted)]">
                        {p.artist?.bio || 'Artiste peintre & plasticienne'}
                      </div>
                    </TableCell>
                    <TableCell className="py-3 px-4 font-sans text-[var(--text-secondary)]">
                      <span>{p.artist?.country || 'France'}</span>
                      <div className="text-[10px] text-[var(--text-subtle)] font-mono">
                        {p.stripeTransferId ?? 'acct_1StripeConnect'}
                      </div>
                    </TableCell>
                    <TableCell className="py-3 px-4 text-center font-bold text-[var(--text-primary)]">
                      {p.totalOrdersCount} ventes
                    </TableCell>
                    <TableCell className="py-3 px-4 text-[var(--text-muted)]">
                      {p.period}
                    </TableCell>
                    <TableCell className="py-3 px-4 text-right font-bold text-[#c59b52]">
                      {symbol}{(p.amountUsd * rate).toFixed(2)}
                    </TableCell>
                    <TableCell className="py-3 px-4 text-center">
                      {isPaid ? (
                        <span className="inline-flex items-center gap-1 rounded-md bg-[#c59b52]/10 px-2 py-0.5 text-xs font-bold text-[#c59b52] border border-[#c59b52]/20">
                          <CheckCircle2 className="h-3 w-3" /> Transféré
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-bold text-amber-400 border border-amber-500/20">
                          <Clock className="h-3 w-3" /> En attente
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="py-3 px-4 text-right">
                      {!isPaid ? (
                        <Button
                          onClick={() => handleTriggerPayout(p.id)}
                          className="gap-1 bg-gradient-to-r from-[#d4af37] to-[#b08140] text-black font-bold text-xs h-8 px-3 rounded-xl shadow-sm"
                        >
                          <Send className="h-3 w-3" />
                          Virer Stripe
                        </Button>
                      ) : (
                        <span className="text-[11px] text-[#c59b52] font-semibold">
                          Virement Confirmé
                        </span>
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
