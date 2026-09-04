'use client';

import React from 'react';
import {
  LayoutDashboard,
  Receipt,
  ShoppingCart,
  FileSpreadsheet,
  LineChart,
  Palette,
  Target,
  ShieldCheck,
  Award,
  LogOut,
} from 'lucide-react';
import { useUser, useClerk } from '@clerk/nextjs';

export type FinanceTab =
  | 'cockpit'
  | 'expenses'
  | 'orders'
  | 'invoices'
  | 'pnl'
  | 'artists'
  | 'budgets';

interface SidebarProps {
  activeTab: FinanceTab;
  setActiveTab: (tab: FinanceTab) => void;
  pendingExpensesCount: number;
  unpaidInvoicesCount: number;
}

export function Sidebar({
  activeTab,
  setActiveTab,
  pendingExpensesCount,
  unpaidInvoicesCount,
}: SidebarProps) {
  const { user } = useUser();
  const { signOut } = useClerk();

  const menuItems = [

    {
      id: 'cockpit' as FinanceTab,
      label: "Vue d'ensemble",
      subtitle: 'Cockpit & KPIs Exécutifs',
      icon: LayoutDashboard,
    },
    {
      id: 'expenses' as FinanceTab,
      label: 'Dépenses & Fournisseurs',
      subtitle: 'Achats bois, verre & opex',
      icon: Receipt,
      badge: pendingExpensesCount > 0 ? `${pendingExpensesCount} à payer` : undefined,
    },
    {
      id: 'orders' as FinanceTab,
      label: 'Ventes & Marge Unitaire',
      subtitle: 'Rentabilité par cadre',
      icon: ShoppingCart,
    },
    {
      id: 'invoices' as FinanceTab,
      label: 'Facturation & TVA',
      subtitle: 'Clients B2B & Déclaration',
      icon: FileSpreadsheet,
      badge: unpaidInvoicesCount > 0 ? `${unpaidInvoicesCount} impayée` : undefined,
    },
    {
      id: 'pnl' as FinanceTab,
      label: 'Compte de Résultat (P&L)',
      subtitle: 'États financiers & EBITDA',
      icon: LineChart,
    },
    {
      id: 'artists' as FinanceTab,
      label: 'Artistes & Marketplace',
      subtitle: 'Royalties & Stripe Connect',
      icon: Palette,
    },
    {
      id: 'budgets' as FinanceTab,
      label: 'Budgets & Trésorerie',
      subtitle: 'Prévisions & Cash Runway',
      icon: Target,
    },
  ];

  return (
    <aside className="w-72 flex-shrink-0 border-r border-[var(--border)] bg-[var(--bg-secondary)] flex flex-col justify-between p-4 transition-colors">
      {/* Brand & Nav */}
      <div className="space-y-6">
        {/* Brand Hallmark */}
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#d4af37] via-[#c59b52] to-[#844819] text-black font-black text-sm shadow-md shadow-[#c59b52]/20">
            <img src="/images/frameitup_full_logo_horizontal.png" alt="" />
          </div>
          <div>
            <div className="text-sm font-bold font-serif text-[var(--text-primary)] tracking-wider flex items-center gap-1.5 uppercase">
              FrameItUp
            </div>
            <p className="text-[10px] text-[var(--text-subtle)] uppercase tracking-widest font-sans font-semibold">Finance Dashboard</p>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1.5">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#c59b52]">
            Comptabilité & Analyse
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#c59b52]/20 via-[#c59b52]/10 to-transparent text-[var(--text-primary)] border border-[#c59b52]/40 shadow-sm'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]/70 hover:text-[var(--text-primary)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                      isActive
                        ? 'bg-gradient-to-br from-[#d4af37] to-[#926435] text-black shadow-sm shadow-[#c59b52]/30'
                        : 'bg-[var(--bg-primary)] text-[var(--text-subtle)] group-hover:text-[#c59b52] group-hover:bg-[var(--bg-tertiary)]'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div
                      className={`text-xs font-semibold ${
                        isActive ? 'text-[#c59b52]' : 'text-[var(--text-primary)]'
                      }`}
                    >
                      {item.label}
                    </div>
                    <div className="text-[10px] text-[var(--text-muted)]">{item.subtitle}</div>
                  </div>
                </div>

                {item.badge && (
                  <span className="rounded-full bg-[#c59b52]/15 px-2 py-0.5 text-[9px] font-bold text-[#c59b52] border border-[#c59b52]/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Health Indicator & Connected Admin Profile */}
      <div className="space-y-3 pt-4 border-t border-[var(--border)]">
        {/* Bottom Health Box */}
        <div className="rounded-2xl border border-[var(--border-gold)] glass-card p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-[#c59b52]" />
              <span className="text-[11px] font-bold font-serif text-[var(--text-primary)]">Santé Financière</span>
            </div>
            <span className="text-[11px] font-mono font-bold text-[#c59b52]">96 / 100</span>
          </div>
          <div className="w-full bg-[var(--bg-primary)] rounded-full h-1.5 overflow-hidden border border-[var(--border)]">
            <div className="bg-gradient-to-r from-[#d4af37] to-[#c59b52] h-1.5 rounded-full w-[96%]" />
          </div>
          <div className="text-[10px] text-[var(--text-muted)] flex justify-between font-mono">
            <span>Runway Trésorerie</span>
            <span className="font-bold text-[var(--text-primary)]">18.4 mois</span>
          </div>
        </div>

        {/* Admin Identity Card */}
        {user && (
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#c59b52] to-[#844819] text-black font-bold text-xs shadow-sm">
                {user.imageUrl ? (
                  <img src={user.imageUrl} alt={user.fullName || 'Admin'} className="h-8 w-8 rounded-xl object-cover" />
                ) : (
                  <span>{user.firstName?.charAt(0) || 'A'}</span>
                )}
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-[#0f1118]" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-white truncate">
                  {user.fullName || user.firstName || 'Administrateur'}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[9px] font-bold text-[#c59b52] uppercase font-mono tracking-wider">
                    {((user.publicMetadata?.role as string) || 'ADMIN').toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => signOut({ redirectUrl: '/sign-in' })}
              title="Se déconnecter"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-red-500/40 hover:bg-red-950/20 hover:text-red-400 transition-all"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

