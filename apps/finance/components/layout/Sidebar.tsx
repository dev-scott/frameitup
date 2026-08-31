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
  Calculator,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { Badge } from '@frameitup/ui';

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
      badgeVariant: 'warning' as const,
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
      badgeVariant: 'default' as const,
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
    <aside className="w-72 flex-shrink-0 border-r border-gray-800/80 bg-gray-950 flex flex-col justify-between p-4">
      {/* Brand & Nav */}
      <div className="space-y-6">
        {/* Brand */}
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 font-black text-gray-950 shadow-md shadow-emerald-500/20">
            F
          </div>
          <div>
            <div className="text-sm font-bold text-white tracking-wide flex items-center gap-1.5">
              FrameItUp <span className="text-emerald-400 font-mono text-xs">FIN</span>
            </div>
            <p className="text-[11px] text-gray-400">ERP & Trésorerie d'Atelier</p>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
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
                    ? 'bg-gradient-to-r from-emerald-500/15 to-teal-500/5 text-white border border-emerald-500/30 shadow-sm'
                    : 'text-gray-400 hover:bg-gray-900/80 hover:text-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                      isActive
                        ? 'bg-emerald-500 text-gray-950 shadow-sm shadow-emerald-500/30'
                        : 'bg-gray-900 text-gray-400 group-hover:text-gray-200 group-hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div
                      className={`text-xs font-semibold ${
                        isActive ? 'text-emerald-400' : 'text-gray-200'
                      }`}
                    >
                      {item.label}
                    </div>
                    <div className="text-[10px] text-gray-400">{item.subtitle}</div>
                  </div>
                </div>

                {item.badge && (
                  <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[9px] font-bold text-amber-400 border border-amber-500/20">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Health Box */}
      <div className="rounded-2xl border border-gray-800/80 bg-gradient-to-b from-gray-900/90 to-gray-900/40 p-3.5 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-semibold text-white">Santé Financière</span>
          </div>
          <span className="text-xs font-bold text-emerald-400">96 / 100</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-1.5 rounded-full w-[96%]" />
        </div>
        <div className="text-[11px] text-gray-400 flex justify-between">
          <span>Runway estimé</span>
          <span className="font-semibold text-gray-200">18.4 mois</span>
        </div>
      </div>
    </aside>
  );
}
