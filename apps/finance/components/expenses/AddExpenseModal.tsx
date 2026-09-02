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
import { PlusCircle, Receipt, DollarSign, Euro, Calculator } from 'lucide-react';

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
      date: new Date(),
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
      <DialogContent className="max-w-xl bg-gray-900 border-gray-800 text-gray-100 p-6 rounded-2xl">
        <DialogHeader className="border-b border-gray-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Receipt className="h-4 w-4" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold text-white">
                Saisie d'une Dépense ou Facture Fournisseur
              </DialogTitle>
              <p className="text-xs text-gray-400">
                Enregistrez un achat de matière première ou un frais de fonctionnement
              </p>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Libellé & Fournisseur */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">
                Libellé de la dépense *
              </label>
              <Input
                required
                placeholder="ex: Lot 200m baguettes Noyer"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-9 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">
                Fournisseur / Prestataire
              </label>
              <Input
                placeholder="ex: Moulures des Vosges SAS"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                className="h-9 text-xs"
              />
            </div>
          </div>

          {/* Catégorie & Mode de règlement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">Catégorie comptable</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
                className="h-9 w-full rounded-lg border border-gray-800 bg-gray-950 px-3 text-xs text-gray-200 focus:border-emerald-500 focus:outline-none"
              >
                <option value={ExpenseCategory.RAW_MATERIALS_WOOD}>Baguettes Bois / Moulures</option>
                <option value={ExpenseCategory.RAW_MATERIALS_GLASS}>Verre Optique & Musée</option>
                <option value={ExpenseCategory.PACKAGING}>Cartons & Emballages</option>
                <option value={ExpenseCategory.SHIPPING_LOGISTICS}>Transport & DHL Express</option>
                <option value={ExpenseCategory.MARKETING_ADS}>Publicité Meta & Google</option>
                <option value={ExpenseCategory.SOFTWARE_SERVERS}>Serveurs & Logiciels</option>
                <option value={ExpenseCategory.PAYROLL_SALARIES}>Salaires & Rémunérations</option>
                <option value={ExpenseCategory.WORKSHOP_RENT}>Loyer Atelier & Charges</option>
                <option value={ExpenseCategory.LEGAL_ACCOUNTING}>Expert-Comptable & Juridique</option>
                <option value={ExpenseCategory.OTHER_OPEX}>Autres Frais Généraux</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">Mode de paiement</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                className="h-9 w-full rounded-lg border border-gray-800 bg-gray-950 px-3 text-xs text-gray-200 focus:border-emerald-500 focus:outline-none"
              >
                <option value={PaymentMethod.BANK_TRANSFER}>Virement Bancaire (SEPA)</option>
                <option value={PaymentMethod.CREDIT_CARD}>Carte Bancaire Entreprise</option>
                <option value={PaymentMethod.DIRECT_DEBIT}>Prélèvement Automatique</option>
                <option value={PaymentMethod.STRIPE}>Stripe / En ligne</option>
                <option value={PaymentMethod.PAYPAL}>PayPal</option>
              </select>
            </div>
          </div>

          {/* Montant HT & Taux TVA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">Montant HT ({symbol}) *</label>
              <Input
                required
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                value={amountHt}
                onChange={(e) => setAmountHt(e.target.value)}
                className="h-9 text-xs font-mono font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">Taux de TVA (%)</label>
              <select
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                className="h-9 w-full rounded-lg border border-gray-800 bg-gray-950 px-3 text-xs text-gray-200 focus:border-emerald-500 focus:outline-none"
              >
                <option value={20}>20% (Taux normal)</option>
                <option value={10}>10% (Taux intermédiaire)</option>
                <option value={5.5}>5.5% (Taux réduit art/livre)</option>
                <option value={0}>0% (Exonéré / Autoliquidation)</option>
              </select>
            </div>
          </div>

          {/* Tax summary banner */}
          <div className="p-3 rounded-xl bg-gray-950 border border-gray-800 flex items-center justify-between text-xs">
            <div>
              <span className="text-gray-400">TVA déductible : </span>
              <span className="font-mono font-bold text-emerald-400">
                {symbol}
                {taxAmount.toFixed(2)}
              </span>
            </div>
            <div>
              <span className="text-gray-400">Total TTC à décaisser : </span>
              <span className="font-mono font-bold text-white text-sm">
                {symbol}
                {totalTtc.toFixed(2)}
              </span>
            </div>
          </div>

          <DialogFooter className="pt-2 border-t border-gray-800">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="text-xs border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-md shadow-emerald-900/30"
            >
              Valider & Enregistrer l'Écriture
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
