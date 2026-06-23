import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center px-6 pt-24 pb-16 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-32 left-1/4 w-96 h-96 bg-[var(--brand-400)] opacity-5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-24 right-1/4 w-72 h-72 bg-[var(--brand-600)] opacity-8 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-md">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-[var(--brand-500)] rounded-lg rotate-12" />
              <div className="absolute inset-1 bg-[var(--bg-primary)] rounded-md flex items-center justify-center">
                <div className="w-3 h-3 border-2 border-[var(--brand-500)] rounded-sm" />
              </div>
            </div>
            <span className="font-display text-2xl font-bold text-[var(--text-primary)]">
              Frame<span className="text-[var(--brand-500)]">ItUp</span>
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold text-[var(--text-primary)]">
            Welcome back
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Sign in to manage your custom frame orders
          </p>
        </div>

        {/* Clerk Sign In Component */}
        <SignIn
          appearance={{
            variables: {
              colorPrimary: '#d98d2e',
              colorBackground: 'var(--bg-card)',
              colorText: 'var(--text-primary)',
              borderRadius: '12px',
              fontFamily: 'Inter, system-ui, sans-serif',
            },
            elements: {
              card: 'shadow-lg border border-[var(--border)] bg-[var(--bg-card)]',
              headerTitle: 'hidden',
              headerSubtitle: 'hidden',
              socialButtonsBlockButton: 'border border-[var(--border)] hover:bg-[var(--bg-secondary)] transition-colors',
              formButtonPrimary: 'bg-[var(--brand-500)] hover:bg-[var(--brand-600)] text-white transition-colors',
              footerActionLink: 'text-[var(--brand-500)] hover:text-[var(--brand-600)]',
              identityPreviewEditButton: 'text-[var(--brand-500)]',
            },
          }}
        />
      </div>
    </main>
  );
}
