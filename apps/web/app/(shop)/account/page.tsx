'use client';

import { UserProfile } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { useLanguageStore } from '@/store/use-language-store';

export default function AccountPage() {
  const { t } = useLanguageStore();

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 space-y-2"
        >
          <span className="text-xs font-semibold tracking-widest text-[var(--brand-500)] uppercase">
            {t.accountPage.badge}
          </span>
          <h1 className="font-display text-4xl font-bold tracking-tight text-[var(--text-primary)]">
            {t.accountPage.title}
          </h1>
          <p className="text-[var(--text-secondary)] text-sm">
            {t.accountPage.subtitle}
          </p>
        </motion.div>

        {/* Clerk User Profile Component */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <UserProfile
            appearance={{
              variables: {
                colorPrimary: '#d98d2e',
                colorBackground: 'var(--bg-card)',
                colorText: 'var(--text-primary)',
                borderRadius: '12px',
                fontFamily: 'Inter, system-ui, sans-serif',
              },
              elements: {
                card: 'shadow-md border border-[var(--border)] bg-[var(--bg-card)]',
                navbar: 'border-r border-[var(--border)] bg-[var(--bg-secondary)]',
                navbarButton: 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]',
                navbarButtonActive: 'text-[var(--brand-600)] bg-[var(--brand-50)]',
                formButtonPrimary: 'bg-[var(--brand-500)] hover:bg-[var(--brand-600)] text-white',
                formFieldInput: 'border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-primary)]',
                badge: 'bg-[var(--brand-100)] text-[var(--brand-800)]',
              },
            }}
          />
        </motion.div>
      </div>
    </main>
  );
}
