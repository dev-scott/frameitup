'use client';

import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Sidebar, FinanceTab } from '../components/layout/Sidebar';
import { KpiGrid } from '../components/overview/KpiGrid';
import { RevenueExpensesChart } from '../components/overview/RevenueExpensesChart';
import { MarginSimulator } from '../components/overview/MarginSimulator';
import { RecentTransactionsFeed } from '../components/overview/RecentTransactionsFeed';
import { ExpensesTable } from '../components/expenses/ExpensesTable';
import { AddExpenseModal } from '../components/expenses/AddExpenseModal';
import { SuppliersDirectory } from '../components/expenses/SuppliersDirectory';
import { OrderUnitEconomicsTable } from '../components/orders/OrderUnitEconomicsTable';
import { InvoicesList } from '../components/invoices/InvoicesList';
import { VatReportCard } from '../components/invoices/VatReportCard';
import { AccountingExportModal } from '../components/invoices/AccountingExportModal';
import { ProfitLossStatementView } from '../components/reports/ProfitLossStatement';
import { BudgetVsActualTable } from '../components/budgets/BudgetVsActualTable';
import { CashFlowForecast } from '../components/budgets/CashFlowForecast';
import { ArtistPayoutsTable } from '../components/marketplace/ArtistPayoutsTable';

import {
  INITIAL_KPIS,
  MONTHLY_TRENDS,
  INITIAL_EXPENSES,
  INITIAL_SUPPLIERS,
  INITIAL_INVOICES,
  UNIT_ECONOMICS_DATA,
  VAT_REPORT_DATA,
  ARTIST_PAYOUTS_DATA,
  BUDGET_TARGETS,
  PROFIT_LOSS_STATEMENT,
} from '../lib/finance-data';
import { Expense } from '@frameitup/types';

export default function FinanceDashboard() {
  // Global States
  const [activeTab, setActiveTab] = useState<FinanceTab>('cockpit');
  const [currency, setCurrency] = useState<'USD' | 'EUR'>('USD');
  const [period, setPeriod] = useState<string>('Fév 2026');

  // Interactive Data States
  const [kpis, setKpis] = useState(INITIAL_KPIS);
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [suppliers, setSuppliers] = useState(INITIAL_SUPPLIERS);
  const [invoices, setInvoices] = useState(INITIAL_INVOICES);
  const [vatReport, setVatReport] = useState(VAT_REPORT_DATA);
  const [pnl, setPnl] = useState(PROFIT_LOSS_STATEMENT);

  // Modals
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Handle adding new expense (instant reactive calculation!)
  const handleAddExpense = (newExp: Expense) => {
    setExpenses((prev) => [newExp, ...prev]);

    // Recalculate KPIs
    const isCogs =
      newExp.category === 'RAW_MATERIALS_WOOD' ||
      newExp.category === 'RAW_MATERIALS_GLASS' ||
      newExp.category === 'PACKAGING' ||
      newExp.category === 'SHIPPING_LOGISTICS';

    setKpis((prev) => {
      const addedCogs = isCogs ? newExp.amountUsd : 0;
      const addedOpex = !isCogs ? newExp.amountUsd : 0;
      const newCogs = prev.totalCogs + addedCogs;
      const newOpex = prev.totalOpex + addedOpex;
      const newGrossProfit = prev.totalRevenue - newCogs;
      const newEbitda = newGrossProfit - newOpex;
      const newNet = newEbitda * 0.75;

      return {
        ...prev,
        totalCogs: newCogs,
        totalOpex: newOpex,
        grossProfit: newGrossProfit,
        grossMarginPercent: Number(((newGrossProfit / prev.totalRevenue) * 100).toFixed(1)),
        ebitda: newEbitda,
        netProfit: newNet,
        netMarginPercent: Number(((newNet / prev.totalRevenue) * 100).toFixed(1)),
        currentCashReserve: prev.currentCashReserve - newExp.totalWithTaxUsd,
      };
    });

    // Recalculate VAT
    setVatReport((prev) => {
      const newDeductible = prev.deductibleVat + newExp.taxAmountUsd;
      return {
        ...prev,
        deductibleVat: newDeductible,
        netVatPayable: prev.collectedVat - newDeductible,
        totalTaxablePurchases: prev.totalTaxablePurchases + newExp.amountUsd,
      };
    });
  };

  const pendingExpensesCount = expenses.filter((e) => e.status !== 'PAID').length;
  const unpaidInvoicesCount = invoices.filter((i) => i.status !== 'PAID').length;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased relative">
      {/* Subtle luxury ambient gold blur */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-gradient-to-b from-[#c59b52]/10 via-transparent to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingExpensesCount={pendingExpensesCount}
        unpaidInvoicesCount={unpaidInvoicesCount}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          currency={currency}
          setCurrency={setCurrency}
          period={period}
          setPeriod={setPeriod}
          onOpenAddExpense={() => setIsAddExpenseOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          {/* TAB 1: COCKPIT & OVERVIEW */}
          {activeTab === 'cockpit' && (
            <div className="space-y-8 animate-in fade-in-50 duration-300">
              {/* Top KPI Metrics Grid */}
              <KpiGrid kpis={kpis} currency={currency} />

              {/* Main Charts & Analytics Row */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                  <RevenueExpensesChart data={MONTHLY_TRENDS} currency={currency} />
                </div>
                <div className="xl:col-span-1">
                  <RecentTransactionsFeed currency={currency} />
                </div>
              </div>

              {/* Margin Simulator */}
              <MarginSimulator currency={currency} />
            </div>
          )}

          {/* TAB 2: DÉPENSES & FOURNISSEURS */}
          {activeTab === 'expenses' && (
            <div className="space-y-8 animate-in fade-in-50 duration-300">
              <ExpensesTable
                expenses={expenses}
                currency={currency}
                onAddExpense={() => setIsAddExpenseOpen(true)}
              />
              <SuppliersDirectory suppliers={suppliers} currency={currency} />
            </div>
          )}

          {/* TAB 3: COMMANDES & UNIT ECONOMICS */}
          {activeTab === 'orders' && (
            <div className="space-y-8 animate-in fade-in-50 duration-300">
              <OrderUnitEconomicsTable orders={UNIT_ECONOMICS_DATA} currency={currency} />
              <MarginSimulator currency={currency} />
            </div>
          )}

          {/* TAB 4: FACTURATION & TVA */}
          {activeTab === 'invoices' && (
            <div className="space-y-8 animate-in fade-in-50 duration-300">
              <VatReportCard vatReport={vatReport} currency={currency} />
              <InvoicesList
                invoices={invoices}
                currency={currency}
                onExportModalOpen={() => setIsExportModalOpen(true)}
              />
            </div>
          )}

          {/* TAB 5: COMPTE DE RÉSULTAT (P&L) */}
          {activeTab === 'pnl' && (
            <div className="space-y-8 animate-in fade-in-50 duration-300">
              <ProfitLossStatementView pnl={pnl} currency={currency} />
            </div>
          )}

          {/* TAB 6: ARTISTES MARKETPLACE */}
          {activeTab === 'artists' && (
            <div className="space-y-8 animate-in fade-in-50 duration-300">
              <ArtistPayoutsTable payouts={ARTIST_PAYOUTS_DATA} currency={currency} />
            </div>
          )}

          {/* TAB 7: BUDGETS & TRÉSORERIE */}
          {activeTab === 'budgets' && (
            <div className="space-y-8 animate-in fade-in-50 duration-300">
              <CashFlowForecast currency={currency} />
              <BudgetVsActualTable budgets={BUDGET_TARGETS} currency={currency} />
            </div>
          )}
        </main>
      </div>

      {/* Interactive Modals */}
      <AddExpenseModal
        isOpen={isAddExpenseOpen}
        onClose={() => setIsAddExpenseOpen(false)}
        onAdd={handleAddExpense}
        currency={currency}
      />

      <AccountingExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}
