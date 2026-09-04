import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });

export const metadata: Metadata = {
  title: 'FrameItUp — Cockpit Financier & Comptabilité Atelier',
  description: 'Tableau de bord financier d’entreprise, marges unitaires et gestion comptable pour FrameItUp.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased min-h-screen">
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: '#c59b52',
              colorBackground: '#0f1118',
              colorInputBackground: '#090a0f',
              colorInputText: '#f5f5f5',
              colorText: '#f5f5f5',
              colorTextSecondary: '#a1a1aa',
              borderRadius: '0.75rem',
            },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
