import { HeroSection } from '@/components/home/hero-section';
import { HowItWorksSection } from '@/components/home/how-it-works';
import { FrameShowcaseSection } from '@/components/home/frame-showcase';
import { StatsSection } from '@/components/home/stats-section';
import { TestimonialsSection } from '@/components/home/testimonials';
import { CtaSection } from '@/components/home/cta-section';

export const metadata = {
  title: 'FrameItUp — Premium Custom Frames, Museum-Quality Delivered',
  description: 'Upload any photo, choose your frame, and receive a museum-quality framed print at your door in days. Trusted by 50,000+ art lovers worldwide.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <HowItWorksSection />
      {/* <FrameShowcaseSection /> */}
      <StatsSection />
      <TestimonialsSection />
      <CtaSection />
    </main>
  );
}
