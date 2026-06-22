import Link from 'next/link';
import { Button } from '@frameitup/ui';

export default function MarketplacePage() {
  return (
    <main className="min-h-screen px-6 py-16">
      <header className="mb-16 text-center">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-neutral-500">
          FrameItUp Market
        </p>
        <h1 className="font-display mb-4 text-5xl text-white md:text-7xl">
          Art worth living with.
        </h1>
        <p className="mx-auto max-w-lg text-neutral-400">
          Discover works from independent artists worldwide. Every purchase ships as a museum-quality
          framed print.
        </p>
      </header>

      {/* Filters */}
      <div className="mb-10 flex flex-wrap gap-2">
        {['All', 'Photography', 'Illustration', 'Abstract', 'Typography', 'Limited Editions'].map(
          (tag) => (
            <Button key={tag} variant="outline" size="sm">
              {tag}
            </Button>
          ),
        )}
      </div>

      {/* Grid placeholder */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[3/4] animate-pulse rounded-lg bg-neutral-800"
          />
        ))}
      </div>
    </main>
  );
}
