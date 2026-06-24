'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

const links = {
  product: [
    { label: 'Browse Frames', href: '/frames' },
    { label: 'Design Yours', href: '/configure' },
    { label: 'My Orders', href: '/orders' },
    { label: 'Marketplace', href: 'http://localhost:3001', external: true },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Craftsmanship', href: '/craftsmanship' },
    { label: 'Sustainability', href: '/sustainability' },
    { label: 'Blog', href: '/blog' },
  ],
  support: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Shipping & Returns', href: '/shipping' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
};

export function Footer() {
  return (
    <footer id="footer" className="relative overflow-hidden bg-[var(--frame-dark)] text-white">
      {/* Top border gradient */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--brand-500)] to-transparent opacity-30" />

      {/* Ambient glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-[var(--brand-500)] opacity-5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand col */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 mb-6 group w-fit">
              <div className="relative ">
                {/* <div className="absolute inset-0 bg-[var(--brand-500)] rounded-lg rotate-12 group-hover:rotate-6 transition-transform duration-300" />
                <div className="absolute inset-1 bg-[var(--frame-dark)] rounded-md flex items-center justify-center">
                  <div className="w-3 h-3 border-2 border-[var(--brand-500)] rounded-sm" />
                </div> */}
                              <Image src="/frameitup_logo.svg" alt="Frame It Up" width={50} height={50} />
                
                
              </div>
              <span className="font-display text-xl font-bold">
                Frame<span className="text-[var(--brand-500)]">ItUp</span>
              </span>
            </Link>

            <p className="text-sm text-[rgba(250,250,249,0.5)] leading-relaxed mb-6 max-w-xs">
              Museum-quality custom frames, crafted with care and delivered to your door. Transform your memories into timeless art.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {[
                {
                  label: 'Instagram', icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" />
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                    </svg>
                  )
                },
                {
                  label: 'Twitter', icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                    </svg>
                  )
                },
                {
                  label: 'Pinterest', icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.03-2.83.19-.77 1.26-5.33 1.26-5.33s-.32-.64-.32-1.59c0-1.49.87-2.61 1.94-2.61.92 0 1.36.69 1.36 1.52 0 .93-.59 2.31-.9 3.59-.25 1.07.54 1.95 1.59 1.95 1.91 0 3.19-2.46 3.19-5.37 0-2.21-1.49-3.77-4.11-3.77-2.97 0-4.77 2.22-4.77 4.64 0 .83.24 1.41.61 1.85.17.2.19.28.13.51-.04.17-.14.57-.18.73-.06.23-.24.32-.45.23-1.66-.68-2.43-2.5-2.43-4.54 0-3.33 2.78-7.25 8.33-7.25 4.45 0 7.38 3.22 7.38 6.68 0 4.54-2.52 7.94-6.25 7.94-1.24 0-2.41-.67-2.81-1.43l-.76 2.96c-.28 1.04-1.01 2.35-1.51 3.15.95.29 1.96.45 3 .45 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
                    </svg>
                  )
                },
              ].map((social) => (
                <button
                  key={social.label}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg border border-[rgba(168,162,158,0.2)] flex items-center justify-center text-[rgba(250,250,249,0.4)] hover:border-[var(--brand-500)] hover:text-[var(--brand-400)] transition-all duration-200"
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {(Object.entries(links) as [string, typeof links.product][]).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[rgba(250,250,249,0.4)] mb-5">
                {title}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      target={'external' in item && item.external ? '_blank' : undefined}
                      className="text-sm text-[rgba(250,250,249,0.55)] hover:text-[var(--brand-400)] transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      {item.label}
                      {'external' in item && item.external && (
                        <span className="text-xs opacity-40 group-hover:opacity-70">↗</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border border-[rgba(168,162,158,0.12)] rounded-2xl p-6 mb-10 bg-[rgba(255,255,255,0.03)]">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
            <div>
              <h4 className="font-semibold text-white mb-1">Get framing inspiration</h4>
              <p className="text-sm text-[rgba(250,250,249,0.45)]">New collections, design tips and exclusive offers.</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                id="footer-newsletter-input"
                className="flex-1 md:w-64 px-4 py-2.5 bg-[rgba(255,255,255,0.06)] border border-[rgba(168,162,158,0.15)] rounded-xl text-sm text-white placeholder-[rgba(250,250,249,0.3)] focus:outline-none focus:border-[var(--brand-500)] transition-colors duration-200"
              />
              <button
                id="footer-newsletter-btn"
                className="px-5 py-2.5 bg-[var(--brand-500)] hover:bg-[var(--brand-600)] text-white text-sm font-semibold rounded-xl transition-colors duration-200 whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-[rgba(168,162,158,0.1)]">
          <p className="text-xs text-[rgba(250,250,249,0.3)]">
            © 2025 FrameItUp. All rights reserved. Crafted with ♥ for art lovers.
          </p>
          <div className="flex items-center gap-1 text-xs text-[rgba(250,250,249,0.3)]">
            <span>Payments secured by</span>
            <span className="font-semibold text-[rgba(250,250,249,0.5)] ml-1">Stripe</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
