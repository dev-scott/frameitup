import { HeroSection } from '@/components/home/hero-section';
import { HowItWorksSection } from '@/components/home/how-it-works';
import { FrameShowcaseSection } from '@/components/home/frame-showcase';
import { StatsSection } from '@/components/home/stats-section';
import { TestimonialsSection } from '@/components/home/testimonials';
import { CtaSection } from '@/components/home/cta-section';

export const metadata = {
  title: 'FrameItUp — Atelier d’Encadrement Sur-Mesure & Qualité Musée',
  description:
    'Sublimez vos photographies et tirages d’art. Moulures en bois noble certifié FSC, passe-partout coton et verre anti-reflet 99% UV. Fabriqué à la main et livré chez vous.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      <HeroSection />
      <HowItWorksSection />
      <FrameShowcaseSection />
      <StatsSection />
      <TestimonialsSection />
      <CtaSection />
    </main>
  );
}
