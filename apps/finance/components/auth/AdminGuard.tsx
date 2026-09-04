'use client';

import React from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import { ShieldAlert, LogOut, Lock, Sparkles, UserX, Loader2 } from 'lucide-react';
import { Button } from '@frameitup/ui';

interface AdminGuardProps {
  children: React.ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  // 1. Loading state with luxury Atelier branding
  if (!isLoaded) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-[#07080b] text-[#f5f5f5] space-y-4">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#d4af37] via-[#c59b52] to-[#844819] opacity-20 blur-xl animate-pulse" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[#c59b52]/40 bg-[#0f1118] shadow-xl">
            <Loader2 className="h-6 w-6 animate-spin text-[#c59b52]" />
          </div>
        </div>
        <div className="text-center space-y-1">
          <div className="text-sm font-semibold font-serif text-white tracking-wide">
            FrameItUp Atelier Finance
          </div>
          <p className="text-xs text-zinc-400 font-mono">
            Vérification des accréditations exécutives...
          </p>
        </div>
      </div>
    );
  }

  // 2. Not Signed In (Fallback while middleware redirects)
  if (!isSignedIn || !user) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-[#07080b] text-[#f5f5f5] space-y-4">
        <Lock className="h-8 w-8 text-[#c59b52] animate-bounce" />
        <p className="text-xs text-zinc-400">Redirection vers la page d'authentification...</p>
      </div>
    );
  }

  // 3. Role Checking
  // Check if the user has an explicit non-admin role (e.g. CUSTOMER or ARTIST)
  const role = (user.publicMetadata?.role as string)?.toUpperCase();
  const isUnauthorizedRole = role === 'CUSTOMER' || role === 'ARTIST';

  if (isUnauthorizedRole) {
    return (
      <div className="relative flex min-h-screen w-full items-center justify-center bg-[#07080b] text-[#f5f5f5] px-4">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-950/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-lg rounded-2xl border border-red-500/30 bg-[#0f1118]/95 p-8 shadow-2xl shadow-black/90 backdrop-blur-2xl text-center space-y-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/30 bg-red-950/40 text-red-400 shadow-lg">
            <ShieldAlert className="h-7 w-7" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
              <UserX className="h-3.5 w-3.5" />
              <span>Privilèges Insuffisants ({role})</span>
            </div>
            <h2 className="text-xl font-serif font-bold text-white tracking-tight">
              Accès Réservé à l'Administration
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Le profil <strong className="text-zinc-200">{user.primaryEmailAddress?.emailAddress}</strong> ne possède pas les droits d'accès au cockpit financier et comptable de FrameItUp.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-left text-xs space-y-1.5 font-mono text-zinc-400">
            <div className="flex justify-between">
              <span>Utilisateur :</span>
              <span className="text-white">{user.fullName || user.username || 'Utilisateur'}</span>
            </div>
            <div className="flex justify-between">
              <span>Email :</span>
              <span className="text-white">{user.primaryEmailAddress?.emailAddress}</span>
            </div>
            <div className="flex justify-between">
              <span>Rôle attribué :</span>
              <span className="text-red-400 font-bold">{role}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => signOut({ redirectUrl: '/sign-in' })}
              className="w-full gap-2 bg-gradient-to-r from-[#d4af37] via-[#c59b52] to-[#b08140] hover:brightness-110 text-black font-bold text-xs py-2.5 rounded-xl transition-all"
            >
              <LogOut className="h-4 w-4" />
              <span>Se connecter avec un compte Admin</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 4. Authorized Admin / Executive
  return <>{children}</>;
}
