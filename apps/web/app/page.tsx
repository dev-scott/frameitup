import Link from 'next/link';
import { Button } from '@frameitup/ui';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-brand-500">
          Museum-Quality Framing
        </p>
        <h1 className="font-display mb-6 max-w-4xl text-6xl font-bold leading-tight md:text-8xl">
          Your memories,{' '}
          <span className="text-brand-500">perfectly framed.</span>
        </h1>
        <p className="mb-10 max-w-xl text-lg text-frame-warm">
          Upload any photo. Choose your frame. We craft and deliver a museum-quality framed print to
          your door in days..
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="/configure">Start Designing</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/frames">Browse Frames</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
