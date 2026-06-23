'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useFrameStore } from '@/store/use-frame-store';
import { createOrder } from '@/app/actions';
import { Button } from '@frameitup/ui';

export default function CheckoutPage() {
  const router = useRouter();
  
  // Zustand Store
  const {
    imageSrc,
    artworkWidthMm,
    artworkHeightMm,
    selectedFrame,
    hasMat,
    matColor,
    matColorName,
    matWidthMm,
    glasingType,
    quantity,
    calculatePrice,
    setShipping,
  } = useFrameStore();

  // Redirect if no image configured
  if (!imageSrc && typeof window !== 'undefined') {
    router.push('/configure');
  }

  // Shipping Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    line1: '',
    line2: '',
    city: 'Douala', // default Cameroon cities for localization
    state: 'Littoral',
    postalCode: '00237',
    country: 'Cameroon',
  });

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<'CASH_ON_DELIVERY' | 'MOBILE_MONEY'>('MOBILE_MONEY');
  const [carrier, setCarrier] = useState<'MTN' | 'ORANGE'>('MTN');
  const [momoNumber, setMomoNumber] = useState<string>('');
  
  // CinetPay Portal Simulation States
  const [showCinetPay, setShowCinetPay] = useState<boolean>(false);
  const [cinetPayStep, setCinetPayStep] = useState<'INIT' | 'USSD_PUSH' | 'PIN_ENTER' | 'SUCCESS'>('INIT');
  const [ussdProgress, setUssdProgress] = useState<number>(0);
  const [mockPin, setMockPin] = useState<string>('');
  const [processing, setProcessing] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Pricing calculations
  const prices = calculatePrice();

  // Validate form fields
  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.firstName) errs.firstName = 'Required';
    if (!formData.lastName) errs.lastName = 'Required';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Invalid email';
    if (!formData.line1) errs.line1 = 'Required';
    if (!formData.city) errs.city = 'Required';
    
    if (paymentMethod === 'MOBILE_MONEY') {
      const pureNum = momoNumber.replace(/\D/g, '');
      if (pureNum.length < 9) {
        errs.momoNumber = 'Invalid phone number (9 digits required)';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Submit flow
  const handlePaymentInitiate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (paymentMethod === 'CASH_ON_DELIVERY') {
      // Direct placement (no CinetPay required)
      processOrderRegistry('CASH_ON_DELIVERY');
    } else {
      // Trigger CinetPay Aggregate Portal Simulation
      setShowCinetPay(true);
      setCinetPayStep('INIT');
    }
  };

  const startUssdSimulation = () => {
    setCinetPayStep('USSD_PUSH');
    setUssdProgress(0);
    const interval = setInterval(() => {
      setUssdProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setCinetPayStep('PIN_ENTER');
          return 100;
        }
        return prev + 20;
      });
    }, 600);
  };

  const handlePinSubmit = () => {
    if (mockPin.length < 4) return;
    setCinetPayStep('SUCCESS');
    setTimeout(() => {
      setShowCinetPay(false);
      processOrderRegistry(carrier === 'MTN' ? 'MTN_MOMO' : 'ORANGE_MONEY');
    }, 1500);
  };

  const processOrderRegistry = async (method: 'CASH_ON_DELIVERY' | 'MTN_MOMO' | 'ORANGE_MONEY') => {
    setProcessing(true);
    setShipping(formData);

    const transactionId = method === 'CASH_ON_DELIVERY' 
      ? undefined 
      : `CP-TX-${Math.floor(100000 + Math.random() * 900000)}`;

    const res = await createOrder({
      shipping: {
        line1: formData.line1,
        line2: formData.line2 || undefined,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      },
      items: [
        {
          frameId: selectedFrame.id,
          imageUrl: imageSrc ?? '',
          matColor: hasMat ? matColor : undefined,
          glasingType: glasingType,
          widthPx: artworkWidthMm,
          heightPx: artworkHeightMm,
          quantity: quantity,
          unitPriceUsd: prices.total / quantity,
        },
      ],
      totalUsd: prices.total,
      paymentMethod: method,
      transactionId: transactionId,
    });

    setProcessing(false);
    if (res.success && res.order) {
      router.push(`/checkout/success?orderId=${res.order.id}&tracking=${res.order.trackingNumber}&total=${res.order.totalUsd}&method=${method}`);
    } else {
      alert(res.error || 'Failed to place order.');
    }
  };

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] pt-32 pb-24 px-6 md:px-12 flex justify-center relative">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: SHIPPING AND METHOD */}
        <form onSubmit={handlePaymentInitiate} className="lg:col-span-7 space-y-8">
          
          {/* Shipping Details */}
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-6 shadow-md space-y-6">
            <h2 className="text-xl font-bold font-display text-[var(--text-primary)] border-b border-[var(--border)] pb-3">
              Shipping & Customer Info
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-[var(--text-muted)] mb-1">First Name</label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className={`w-full px-3 py-2.5 border rounded-xl bg-transparent text-sm font-medium ${errors.firstName ? 'border-rose-500' : 'border-[var(--border)]'}`}
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-[var(--text-muted)] mb-1">Last Name</label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className={`w-full px-3 py-2.5 border rounded-xl bg-transparent text-sm font-medium ${errors.lastName ? 'border-rose-500' : 'border-[var(--border)]'}`}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-[var(--text-muted)] mb-1">Email Address (for Invoice)</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-3 py-2.5 border rounded-xl bg-transparent text-sm font-medium ${errors.email ? 'border-rose-500' : 'border-[var(--border)]'}`}
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-[var(--text-muted)] mb-1">Delivery Address</label>
              <input
                type="text"
                required
                placeholder="Street address or neighborhood details"
                value={formData.line1}
                onChange={(e) => setFormData({ ...formData, line1: e.target.value })}
                className={`w-full px-3 py-2.5 border rounded-xl bg-transparent text-sm font-medium mb-3 ${errors.line1 ? 'border-rose-500' : 'border-[var(--border)]'}`}
              />
              <input
                type="text"
                placeholder="Apartment, unit, details (optional)"
                value={formData.line2}
                onChange={(e) => setFormData({ ...formData, line2: e.target.value })}
                className="w-full px-3 py-2.5 border border-[var(--border)] rounded-xl bg-transparent text-sm font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-[var(--text-muted)] mb-1">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className={`w-full px-3 py-2.5 border rounded-xl bg-transparent text-sm font-medium ${errors.city ? 'border-rose-500' : 'border-[var(--border)]'}`}
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-[var(--text-muted)] mb-1">Region / State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-3 py-2.5 border border-[var(--border)] rounded-xl bg-transparent text-sm font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-[var(--text-muted)] mb-1">Postal Code</label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full px-3 py-2.5 border border-[var(--border)] rounded-xl bg-transparent text-sm font-medium"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-[var(--text-muted)] mb-1">Country</label>
                <input
                  type="text"
                  disabled
                  value={formData.country}
                  className="w-full px-3 py-2.5 border border-[var(--border)] rounded-xl bg-[var(--bg-secondary)] text-sm font-medium text-[var(--text-muted)]"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-6 shadow-md space-y-6">
            <h2 className="text-xl font-bold font-display text-[var(--text-primary)] border-b border-[var(--border)] pb-3">
              Payment Gateway
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('MOBILE_MONEY')}
                className={`p-4 border rounded-2xl flex flex-col items-center gap-2 text-center transition-all ${
                  paymentMethod === 'MOBILE_MONEY'
                    ? 'border-[var(--brand-500)] bg-[var(--brand-50)]/50'
                    : 'border-[var(--border)] hover:bg-[var(--bg-secondary)]'
                }`}
              >
                <span className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 font-bold">
                  OM
                </span>
                <span className="text-xs font-bold text-[var(--text-primary)]">Pay Online (MoMo)</span>
                <span className="text-[9px] text-[var(--text-muted)]">Orange Money / MTN MoMo</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('CASH_ON_DELIVERY')}
                className={`p-4 border rounded-2xl flex flex-col items-center gap-2 text-center transition-all ${
                  paymentMethod === 'CASH_ON_DELIVERY'
                    ? 'border-[var(--brand-500)] bg-[var(--brand-50)]/50'
                    : 'border-[var(--border)] hover:bg-[var(--bg-secondary)]'
                }`}
              >
                <span className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 font-bold">
                  COD
                </span>
                <span className="text-xs font-bold text-[var(--text-primary)]">Pay on Delivery</span>
                <span className="text-[9px] text-[var(--text-muted)]">Pay cash to delivery courier</span>
              </button>
            </div>

            {/* Mobile Money Settings */}
            {paymentMethod === 'MOBILE_MONEY' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 pt-4 border-t border-[var(--border)]"
              >
                <div className="flex gap-4">
                  {/* MTN Selector */}
                  <button
                    type="button"
                    onClick={() => setCarrier('MTN')}
                    className={`flex-1 p-3 border rounded-xl flex items-center justify-center gap-2 font-bold text-xs ${
                      carrier === 'MTN'
                        ? 'border-amber-400 bg-amber-400/10 text-amber-700'
                        : 'border-[var(--border)] hover:bg-[var(--bg-secondary)]'
                    }`}
                  >
                    <span className="w-4 h-4 bg-amber-400 rounded-full" />
                    MTN Mobile Money
                  </button>

                  {/* Orange Selector */}
                  <button
                    type="button"
                    onClick={() => setCarrier('ORANGE')}
                    className={`flex-1 p-3 border rounded-xl flex items-center justify-center gap-2 font-bold text-xs ${
                      carrier === 'ORANGE'
                        ? 'border-orange-500 bg-orange-500/10 text-orange-600'
                        : 'border-[var(--border)] hover:bg-[var(--bg-secondary)]'
                    }`}
                  >
                    <span className="w-4 h-4 bg-orange-500 rounded-full" />
                    Orange Money
                  </button>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-[var(--text-muted)] mb-1">
                    Mobile Wallet Number (Cameroon)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-[var(--text-muted)]">
                      +237
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="677 00 00 00"
                      value={momoNumber}
                      onChange={(e) => setMomoNumber(e.target.value.replace(/\D/g, '').slice(0, 9))}
                      className={`w-full pl-14 pr-3 py-2.5 border rounded-xl bg-transparent text-sm font-medium font-mono tracking-wider ${
                        errors.momoNumber ? 'border-rose-500' : 'border-[var(--border)]'
                      }`}
                    />
                  </div>
                  {errors.momoNumber && (
                    <span className="text-[10px] text-rose-500 block mt-1">{errors.momoNumber}</span>
                  )}
                  <p className="text-[10px] text-[var(--text-subtle)] mt-2">
                    CinetPay aggregator will send a USSD transaction prompt request directly to this number.
                  </p>
                </div>
              </motion.div>
            )}

            {paymentMethod === 'CASH_ON_DELIVERY' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 rounded-2xl text-xs space-y-2"
              >
                <p className="font-bold">✓ Cash on Delivery Approved</p>
                <p className="opacity-90">
                  No payment required today. Your invoice bill will be printed, and you will pay cash directly to the courier agent when your handcrafted frame is delivered.
                </p>
              </motion.div>
            )}
          </div>
        </form>

        {/* RIGHT COLUMN: ORDER SUMMARY */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-6 shadow-md h-fit">
          <div className="space-y-6">
            <h2 className="text-xl font-bold font-display text-[var(--text-primary)] border-b border-[var(--border)] pb-3">
              Order Summary
            </h2>

            {imageSrc && (
              <div className="flex gap-4">
                <div 
                  className="w-20 h-20 flex items-center justify-center relative flex-shrink-0"
                  style={{
                    border: `3px solid ${selectedFrame.color}`,
                    backgroundColor: hasMat ? matColor : 'transparent',
                    padding: hasMat ? '4px' : '0px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.15)'
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageSrc} alt="Preview" className="w-full h-full object-contain" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-[var(--text-primary)]">Custom {selectedFrame.name} Framing</h4>
                  <p className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Artwork: {artworkWidthMm}x{artworkHeightMm}mm
                  </p>
                  <p className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Mat: {hasMat ? `${matWidthMm}mm (${matColorName})` : 'None'}
                  </p>
                  <p className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Glass: {glasingType.replace('_', ' ')}
                  </p>
                  <p className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Quantity: {quantity}
                  </p>
                </div>
              </div>
            )}

            {/* Pricing */}
            <div className="space-y-3 pt-6 border-t border-[var(--border)] text-xs text-[var(--text-secondary)]">
              <div className="flex justify-between">
                <span>Custom Frame Profile</span>
                <span>${prices.baseFrame.toFixed(2)}</span>
              </div>
              {hasMat && (
                <div className="flex justify-between">
                  <span>Mat Board Border</span>
                  <span>${prices.matPrice.toFixed(2)}</span>
                </div>
              )}
              {glasingType !== 'STANDARD' && (
                <div className="flex justify-between">
                  <span>Glazing Treatment</span>
                  <span>${prices.glassPrice.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping & Delivery</span>
                <span className="text-emerald-600 font-bold uppercase">Gratuit (Cameroun)</span>
              </div>
            </div>

            <div className="border-t border-[var(--border)] pt-4 flex justify-between items-end">
              <span className="text-xs uppercase font-bold text-[var(--text-muted)]">Total Amount</span>
              <span className="text-2xl font-black font-display text-[var(--text-primary)]">
                ${prices.total.toFixed(2)}
              </span>
            </div>
          </div>

          <Button
            type="submit"
            onClick={handlePaymentInitiate}
            className="w-full bg-[var(--brand-500)] hover:bg-[var(--brand-600)] text-white font-bold rounded-xl py-3.5 shadow-brand hover:shadow-brand-lg mt-8 transition-all duration-200 flex items-center justify-center gap-2"
          >
            {paymentMethod === 'MOBILE_MONEY' ? 'Pay Online (CinetPay)' : 'Confirm Order & Deliver'}
          </Button>
        </div>

      </div>

      {/* CINETPAY GATEWAY MODAL SIMULATION */}
      <AnimatePresence>
        {showCinetPay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#1E293B] border border-stone-700 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl text-white"
            >
              {/* Header */}
              <div className="bg-[#0F172A] p-4 flex justify-between items-center border-b border-stone-700">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-amber-500 rounded flex items-center justify-center text-slate-900 font-black text-[9px]">CP</span>
                  <span className="font-bold text-xs uppercase tracking-widest text-stone-300">CinetPay Gateway</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCinetPay(false)}
                  className="text-stone-400 hover:text-white text-xs font-semibold"
                >
                  Cancel
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                
                {cinetPayStep === 'INIT' && (
                  <div className="space-y-5 text-center">
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase block tracking-wider">Payment Transaction for</span>
                      <h4 className="font-bold text-lg text-amber-500">FrameItUp Custom Framing</h4>
                      <p className="text-2xl font-black font-mono mt-1">${prices.total.toFixed(2)}</p>
                    </div>

                    <div className="bg-slate-800/50 p-4 border border-slate-700 rounded-xl space-y-1 text-xs text-left">
                      <div className="flex justify-between">
                        <span className="text-stone-400">Carrier wallet:</span>
                        <span className="font-bold">{carrier === 'MTN' ? 'MTN MoMo' : 'Orange Money'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Wallet phone:</span>
                        <span className="font-bold font-mono">+237 {momoNumber}</span>
                      </div>
                    </div>

                    <Button
                      onClick={startUssdSimulation}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl py-3"
                    >
                      Authorize Wallet Payment
                    </Button>
                  </div>
                )}

                {cinetPayStep === 'USSD_PUSH' && (
                  <div className="text-center py-6 space-y-4">
                    <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mx-auto" />
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm">Sending Mobile Network Payload...</h4>
                      <p className="text-xs text-stone-400">Requesting USSD push session code (+237)...</p>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-stone-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-500 transition-all duration-300"
                        style={{ width: `${ussdProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {cinetPayStep === 'PIN_ENTER' && (
                  <div className="space-y-6 text-center">
                    <div>
                      <h4 className="font-bold text-sm text-amber-400">✓ USSD Session Initiated</h4>
                      <p className="text-xs text-stone-400 mt-1">Please enter your secret 4-digit Mobile Wallet PIN code on the virtual screen below to validate payment:</p>
                    </div>

                    {/* Numeric PIN display dots */}
                    <div className="flex justify-center gap-4 py-2">
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={`w-3.5 h-3.5 rounded-full border-2 transition-all ${
                            mockPin.length > i 
                              ? 'bg-amber-400 border-amber-400 scale-110 shadow-lg shadow-amber-400/40' 
                              : 'border-stone-500'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Sim keyboard layout */}
                    <div className="grid grid-cols-3 gap-3 max-w-[200px] mx-auto">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => mockPin.length < 4 && setMockPin(mockPin + val)}
                          className="w-12 h-12 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center font-bold text-lg border border-slate-700/60"
                        >
                          {val}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setMockPin('')}
                        className="w-12 h-12 bg-rose-950/30 text-rose-400 hover:bg-rose-950/50 rounded-full flex items-center justify-center text-xs font-bold"
                      >
                        Clear
                      </button>
                      <button
                        type="button"
                        onClick={() => mockPin.length < 4 && setMockPin(mockPin + '0')}
                        className="w-12 h-12 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center font-bold text-lg border border-slate-700/60"
                      >
                        0
                      </button>
                      <button
                        type="button"
                        onClick={handlePinSubmit}
                        disabled={mockPin.length < 4}
                        className="w-12 h-12 bg-emerald-950/40 text-emerald-400 hover:bg-emerald-950/60 disabled:opacity-40 rounded-full flex items-center justify-center text-xs font-bold"
                      >
                        OK
                      </button>
                    </div>
                  </div>
                )}

                {cinetPayStep === 'SUCCESS' && (
                  <div className="text-center py-6 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto border border-emerald-500/20">
                      <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-emerald-400">Payment Approved!</h4>
                      <p className="text-xs text-stone-400">Receipt reference logged to CinetPay system.</p>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECURE LOADING SCREEN OVERLAY */}
      <AnimatePresence>
        {processing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center flex-col text-white"
          >
            <div className="w-16 h-16 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mb-6" />
            <p className="font-medium text-stone-300">Registering custom frame order into PostgreSQL...</p>
            <span className="text-[10px] uppercase text-stone-500 font-mono tracking-widest mt-2">SSL Secure 256-Bit TLS</span>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
