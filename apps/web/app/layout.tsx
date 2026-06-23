import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });

export const metadata: Metadata = {
  title: { default: 'FrameItUp — Premium Custom Frames', template: '%s | FrameItUp' },
  description: 'Design and order beautiful custom frames for your most cherished memories. Museum-quality, delivered in days.',
  keywords: ['custom frames', 'photo frames', 'museum quality', 'framed prints', 'wall art'],
  openGraph: {
    title: 'FrameItUp — Premium Custom Frames',
    description: 'Museum-quality custom frames, crafted and delivered in days.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <ClerkProvider>
            <Navbar />
            {children}
            <Footer />
            <Toaster richColors position="top-right" />
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
