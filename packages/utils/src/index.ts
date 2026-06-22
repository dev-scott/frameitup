// ─── Currency ─────────────────────────────────────────────────────────────────
export function formatUsd(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}

export function usdToCents(usd: number): number {
  return Math.round(usd * 100);
}

// ─── Date ─────────────────────────────────────────────────────────────────────
export function toPeriod(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

// ─── String ───────────────────────────────────────────────────────────────────
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function initials(firstName: string, lastName: string): string {
  return `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();
}

// ─── Pagination ───────────────────────────────────────────────────────────────
export function paginate(page: number, pageSize: number): { skip: number; take: number } {
  return {
    skip: (page - 1) * pageSize,
    take: pageSize,
  };
}

// ─── Frame sizing ─────────────────────────────────────────────────────────────
export function mmToInches(mm: number): number {
  return parseFloat((mm / 25.4).toFixed(2));
}

export function inchesToMm(inches: number): number {
  return parseFloat((inches * 25.4).toFixed(2));
}

export function getAspectRatio(width: number, height: number): string {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height);
  return `${width / divisor}:${height / divisor}`;
}
