'use client';

import React from 'react';
import { SignIn } from '@clerk/nextjs';
import { ShieldCheck, Lock, Sparkles, Building2, Landmark, CheckCircle2 } from 'lucide-react';

export default function SignInPage() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#07080b] text-[#f5f5f5] overflow-hidden selection:bg-[#c59b52]/30 selection:text-white px-4 py-12">
      {/* Dynamic Background Atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#c59b52]/15 via-[#844819]/10 to-transparent rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[450px] h-[450px] bg-[#c59b52]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(#c59b52 1px, transparent 1px), radial-gradient(#c59b52 1px, #07080b 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Brand & Security Narrative */}
        <div className="lg:col-span-6 space-y-6 text-left p-6 lg:p-8">
          {/* Atelier Brand Hallmark */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#c59b52]/10 border border-[#c59b52]/30 text-[#c59b52] text-xs font-semibold tracking-wide">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            <span>Portail d’Accès Restreint & Direction</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
              Cockpit Financier & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e5c578] via-[#c59b52] to-[#844819]">
                Comptabilité Atelier
              </span>
            </h1>
            <p className="text-sm text-zinc-400 leading-relaxed font-sans">
              Connectez-vous avec vos identifiants administrateur pour gérer la comptabilité,
              suivre les flux de trésorerie, auditer les marges par cadre et valider les écritures.
            </p>
          </div>

          {/* Security & Feature Bullets */}
          <div className="space-y-3.5 pt-2">
            <div className="flex items-start gap-3 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3.5 backdrop-blur-md">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#c59b52]/20 text-[#c59b52]">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">Privilèges Administrateurs Uniquement</h4>
                <p className="text-[11px] text-zinc-400">
                  Accès exclusif réservé à l'équipe dirigeante, directeurs financiers et experts-comptables.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3.5 backdrop-blur-md">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#c59b52]/20 text-[#c59b52]">
                <Landmark className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">Chiffrement & Traçabilité Complète</h4>
                <p className="text-[11px] text-zinc-400">
                  Toutes les écritures d'achats, exports FEC et facturations sont horodatées et vérifiées.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Hallmark */}
          <div className="pt-2 flex items-center gap-3 text-[11px] text-zinc-500 font-mono">
            <Lock className="h-3.5 w-3.5 text-[#c59b52]" />
            <span>FrameItUp SAS © 2026 — Système Haute Sécurité</span>
          </div>
        </div>

        {/* Right Side: Clerk Sign-In Form with Luxury Obsidian & Gold Styling */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-md rounded-2xl border border-[#c59b52]/30 bg-[#0f1118]/90 p-2 shadow-2xl shadow-black/80 backdrop-blur-2xl">
            <SignIn
              routing="path"
              path="/sign-in"
              fallbackRedirectUrl="/"
              appearance={{
                layout: {
                  socialButtonsVariant: 'blockButton',
                  logoPlacement: 'none',
                },
                variables: {
                  colorPrimary: '#c59b52',
                  colorBackground: 'transparent',
                  colorInputBackground: '#090a0f',
                  colorInputText: '#f5f5f5',
                  colorText: '#f5f5f5',
                  colorTextSecondary: '#a1a1aa',
                  borderRadius: '0.75rem',
                },
                elements: {
                  rootBox: 'w-full',
                  card: 'bg-transparent shadow-none p-4 sm:p-6',
                  headerTitle: 'text-lg font-serif font-bold text-white tracking-wide',
                  headerSubtitle: 'text-xs text-zinc-400',
                  socialButtonsBlockButton:
                    'border border-zinc-800 bg-zinc-900/80 text-zinc-200 text-xs font-medium hover:bg-zinc-800 hover:text-white rounded-xl transition-all h-10',
                  socialButtonsBlockButtonText: 'text-xs font-medium',
                  dividerLine: 'bg-zinc-800',
                  dividerText: 'text-[11px] text-zinc-500 uppercase tracking-widest',
                  formFieldLabel: 'text-xs font-medium text-zinc-300',
                  formFieldInput:
                    'bg-[#090a0f] border border-zinc-800 focus:border-[#c59b52] text-white text-xs rounded-xl transition-all py-2.5 px-3 focus:ring-1 focus:ring-[#c59b52]',
                  formButtonPrimary:
                    'bg-gradient-to-r from-[#d4af37] via-[#c59b52] to-[#b08140] hover:brightness-110 text-black font-bold text-xs py-2.5 rounded-xl transition-all shadow-md shadow-[#c59b52]/20 active:scale-[0.98]',
                  footerActionLink: 'text-[#c59b52] hover:text-[#d4af37] text-xs font-semibold',
                  identityPreviewText: 'text-xs text-zinc-300',
                  identityPreviewEditButton: 'text-[#c59b52] hover:text-[#d4af37] text-xs',
                  formFieldAction: 'text-xs text-[#c59b52] hover:text-[#d4af37]',
                  footer: 'border-t border-zinc-800/60 pt-4 mt-4',
                  otpCodeFieldInput:
                    'bg-[#090a0f] border border-zinc-800 focus:border-[#c59b52] text-white rounded-xl',
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
