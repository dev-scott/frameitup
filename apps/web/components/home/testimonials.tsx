'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLanguageStore } from '@/store/use-language-store';

interface TestimonialType {
  id: number;
  name: string;
  role: string;
  avatar: string;
  avatarColor: string;
  rating: number;
  text: string;
  frame: string;
  frameColor: string;
}

const testimonialsInfo = [
  {
    id: 1,
    avatar: 'SM',
    avatarColor: '#8B6914',
    rating: 5,
    frameColor: '#8B6914',
  },
  {
    id: 2,
    avatar: 'MC',
    avatarColor: '#2C5F8A',
    rating: 5,
    frameColor: '#1a1a1a',
  },
  {
    id: 3,
    avatar: 'EJ',
    avatarColor: '#5C4A8A',
    rating: 5,
    frameColor: '#B8860B',
  },
  {
    id: 4,
    avatar: 'LR',
    avatarColor: '#C4622D',
    rating: 5,
    frameColor: '#C4622D',
  },
];

/* ─── Stars ──────────────────────────────────────────── */
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-[var(--brand-400)] text-sm">★</span>
      ))}
    </div>
  );
}

/* ─── Testimonial card ───────────────────────────────── */
function TestimonialCard({ t, active }: { t: TestimonialType; active: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      <div className="max-w-3xl mx-auto p-8 md:p-12 rounded-3xl bg-[var(--bg-card)] dark:bg-[var(--bg-secondary)] border border-[var(--border)] relative overflow-hidden">
        {/* Quote mark */}
        <div className="absolute top-6 right-8 font-display text-[120px] leading-none text-[var(--brand-500)] opacity-[0.06] select-none pointer-events-none">
          "
        </div>

        {/* Stars */}
        <Stars count={t.rating} />

        {/* Quote */}
        <p className="mt-5 text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-8 relative z-10">
          "{t.text}"
        </p>

        {/* Author + Frame */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ backgroundColor: t.avatarColor }}
            >
              {t.avatar}
            </div>
            <div>
              <p className="font-semibold text-[var(--text-primary)]">{t.name}</p>
              <p className="text-sm text-[var(--text-muted)]">{t.role}</p>
            </div>
          </div>

          {/* Frame tag */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-secondary)] dark:bg-[var(--bg-tertiary)]">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: t.frameColor }} />
            <span className="text-xs font-medium text-[var(--text-muted)]">{t.frame}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main section ───────────────────────────────────── */
export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { t } = useLanguageStore();

  const testimonials = t.testimonials.items.map((item, idx) => ({
    ...item,
    ...testimonialsInfo[idx],
  })) as TestimonialType[];

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  return (
    <section ref={ref} id="testimonials" className="section-padding relative overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 bg-[var(--bg-primary)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,rgba(217,141,46,0.06)_0%,transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-4">{t.testimonials.sectionLabel}</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
            {t.testimonials.title}{' '}
            <span className="gradient-text">{t.testimonials.titleHighlight}</span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {testimonials[active] && <TestimonialCard key={active} t={testimonials[active]!} active={true} />}
          </AnimatePresence>
        </motion.div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-10">
          {/* Prev */}
          <button
            onClick={prev}
            id="testimonials-prev-btn"
            className="w-11 h-11 rounded-full border border-[var(--border-strong)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--brand-400)] hover:text-[var(--brand-500)] transition-all duration-200 hover:-translate-x-0.5"
          >
            ←
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-300 ${i === active
                    ? 'w-8 h-2 bg-[var(--brand-500)]'
                    : 'w-2 h-2 bg-[var(--border-strong)] hover:bg-[var(--brand-300)]'
                  }`}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={next}
            id="testimonials-next-btn"
            className="w-11 h-11 rounded-full border border-[var(--border-strong)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--brand-400)] hover:text-[var(--brand-500)] transition-all duration-200 hover:translate-x-0.5"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
