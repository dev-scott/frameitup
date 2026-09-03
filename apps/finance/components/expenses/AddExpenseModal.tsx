'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  Input,
} from '@frameitup/ui';
import { ExpenseCategory, PaymentMethod, ExpenseStatus, Expense } from '@frameitup/types';
import { Receipt, DollarSign, Euro, Calculator } from 'lucide-react';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (expense: Expense) => void;
  currency: 'USD' | 'EUR';
}

export function AddExpenseModal({
  isOpen,
  onClose,
  onAdd,
  currency,
}: AddExpenseModalProps) {
  const symbol = currency === 'USD' ? '$' : '€';

  const [description, setDescription] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>(ExpenseCategory.RAW_MATERIALS_WOOD);
  const [amountHt, setAmountHt] = useState<string>('');
  const [taxRate, setTaxRate] = useState<number>(20);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.BANK_TRANSFER);
  const [isRecurring, setIsRecurring] = useState(false);
  const [notes, setNotes] = useState('');

  const numAmount = parseFloat(amountHt) || 0;
  const taxAmount = (numAmount * taxRate) / 100;
  const totalTtc = numAmount + taxAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || numAmount <= 0) return;

    const newExpense: Expense = {
      id: `exp-${Date.now()}`,
      supplierName: supplierName.trim() || undefined,
      category,
      description: description.trim(),
      amountUsd: numAmount,
      taxRatePercent: taxRate,
      taxAmountUsd: taxAmount,
      totalWithTaxUsd: totalTtc,
      status: ExpenseStatus.PAID,
      paymentMethod,
      expenseDate: new Date(),
      paidAt: new Date(),
      period: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`,
      isRecurring,
      notes: notes.trim() || undefined,
      createdAt: new Date(),
    };

    onAdd(newExpense);
    // Reset
    setDescription('');
    setSupplierName('');
    setAmountHt('');
    setNotes('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl bg-[var(--bg-card)] border border-[var(--border-gold)] text-[var(--text-primary)] p-6 rounded-3xl shadow-2xl backdrop-blur-2xl">
        <DialogHeader className="border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c59b52]/10 text-[#c59b52] border border-[#c59b52]/20">
              <Receipt className="h-4 w-4" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold font-serif text-[var(--text-primary)]">
                Saisie d'une Dépense ou Facture Fournisseur
              </DialogTitle>
              <p className="text-xs text-[var(--text-muted)]">
                Enregistrez un achat de matière première ou un frais de fonctionnement
              </p>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Libellé & Fournisseur */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--text-secondary)]">
                Libellé de la dépense *
              </label>
              <Input
                required
                placeholder="Ex: Baguettes Chêne 500m"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-[var(--bg-primary)] border-[var(--border)] text-xs h-9 focus:border-[#c59b52] rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--text-secondary)]">Fournisseur</label>
              <Input
                placeholder="Ex: Scierie Vosgienne"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                className="bg-[var(--bg-primary)] border-[var(--border)] text-xs h-9 focus:border-[#c59b52] rounded-xl"
              />
            </div>
          </div>

          {/* Catégorie & Moyen de Paiement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--text-secondary)]">Catégorie Comptable</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
                className="w-full h-9 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] px-3 text-xs text-[var(--text-primary)] focus:border-[#c59b52] focus:outline-none"
              >
                <option value={ExpenseCategory.RAW_MATERIALS_WOOD}>Baguettes Bois / Moulures</option>
                <option value={ExpenseCategory.RAW_MATERIALS_GLASS}>Verre Optique & Musée</option>
                <option value={ExpenseCategory.PACKAGING}>Cartons & Emballages</option>
                <option value={ExpenseCategory.SHIPPING_LOGISTICS}>Transport & Expéditions</option>
                <option value={ExpenseCategory.MARKETING_ADS}>Publicité Meta / Google</option>
                <option value={ExpenseCategory.SOFTWARE_SERVERS}>Serveurs & Logiciels</option>
                <option value={ExpenseCategory.WORKSHOP_RENT}>Loyer Atelier Paris</option>
                <option value={ExpenseCategory.PAYROLL_SALARIES}>Salaires & Rémunérations</option>
                <option value={ExpenseCategory.OTHER_OPEX}>Autres Frais Généraux</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--text-secondary)]">Mode de Paiement</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                className="w-full h-9 rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] px-3 text-xs text-[var(--text-primary)] focus:border-[#c59b52] focus:outline-none"
              >
                <option value={PaymentMethod.BANK_TRANSFER}>Virement Bancaire (SEPA)</option>
                <option value={PaymentMethod.CARD}>Carte Bancaire Société</option>
                <option value={PaymentMethod.DIRECT_DEBIT}>Prélèvement Automatique</option>
                <option value={PaymentMethod.STRIPE}>Passerelle Stripe</option>
              </select>
            </div>
          </div>

          {/* Montants HT, TVA et TTC */}
          <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border)] space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--text-secondary)]">Montant HT ({symbol}) *</label>
                <Input
                  required
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={amountHt}
                  onChange={(e) => setAmountHt(e.target.value)}
                  className="bg-[var(--bg-card)] border-[var(--border)] font-mono text-xs h-9 focus:border-[#c59b52] rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--text-secondary)]">Taux TVA (%)</label>
                <select
                  value={taxRate}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                  className="w-full h-9 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-3 text-xs text-[var(--text-primary)] focus:border-[#c59b52] focus:outline-none"
                >
                  <option value={20}>20.0% (Taux Normal)</option>
                  <option value={10}>10.0% (Intermédiaire)</option>
                  <option value={5.5}>5.5% (Taux Réduit)</option>
                  <option value={0}>0.0% (Exonéré / Intracom)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--text-secondary)]">TVA Calculée</label>
                <div className="h-9 flex items-center px-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-xs font-mono font-bold text-[#c59b52]">
                  {symbol}{taxAmount.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--text-secondary)] uppercase">Total TTC Décaissé :</span>
              <span className="text-base font-bold font-mono text-[var(--text-primary)]">
                {symbol}{totalTtc.toFixed(2)}
              </span>
            </div>
          </div>

          <DialogFooter className="border-t border-[var(--border)] pt-3 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] text-xs rounded-xl"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-[#d4af37] via-[#c59b52] to-[#b08140] text-black font-bold text-xs rounded-xl shadow-md"
            >
              Enregistrer l'Écriture
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
