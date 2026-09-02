import { prisma } from './index';

async function main() {
  console.log('🌱 Début du seed financier et e-commerce FrameItUp...');

  // 1. Utilisateurs
  const users = await Promise.all([
    prisma.user.upsert({
      where: { clerkId: 'user_admin_1' },
      update: {},
      create: {
        id: 'usr_cfo_01',
        clerkId: 'user_admin_1',
        email: 'cfo@frameitup.com',
        firstName: 'Alexandre',
        lastName: 'Vance',
        role: 'FINANCE',
      },
    }),
    prisma.user.upsert({
      where: { clerkId: 'user_artist_elena' },
      update: {},
      create: {
        id: 'usr_artist_01',
        clerkId: 'user_artist_elena',
        email: 'elena.rostova@art.io',
        firstName: 'Elena',
        lastName: 'Rostova',
        role: 'ARTIST',
      },
    }),
    prisma.user.upsert({
      where: { clerkId: 'user_client_1' },
      update: {},
      create: {
        id: 'usr_client_01',
        clerkId: 'user_client_1',
        email: 'sophie.martin@luxurydecor.fr',
        firstName: 'Sophie',
        lastName: 'Martin',
        role: 'CUSTOMER',
      },
    }),
    prisma.user.upsert({
      where: { clerkId: 'user_client_2' },
      update: {},
      create: {
        id: 'usr_client_02',
        clerkId: 'user_client_2',
        email: 'jean.dupont@architectes.com',
        firstName: 'Jean',
        lastName: 'Dupont',
        role: 'CUSTOMER',
      },
    }),
  ]);

  // 2. Profil Artiste
  const artistProfile = await prisma.artistProfile.upsert({
    where: { userId: 'usr_artist_01' },
    update: {},
    create: {
      id: 'art_prof_01',
      userId: 'usr_artist_01',
      bio: 'Artiste peintre contemporaine - Spécialiste des huiles sur toile et abstractions minimalistes.',
      country: 'France',
      stripeConnectId: 'acct_1NXY892ELENA',
      royaltyPercent: 70.0,
      verified: true,
    },
  });

  // 3. Cadres
  const frames = await Promise.all([
    prisma.frame.upsert({
      where: { id: 'frame-chene-massif' },
      update: {},
      create: {
        id: 'frame-chene-massif',
        name: 'Chêne Massif Naturel',
        material: 'WOOD',
        color: '#C8A261',
        widthMm: 25,
        heightMm: 35,
        depthMm: 20,
        priceUsd: 89.0,
        thumbnailUrl: '/frames/chene.webp',
        available: true,
      },
    }),
    prisma.frame.upsert({
      where: { id: 'frame-noyer-fonce' },
      update: {},
      create: {
        id: 'frame-noyer-fonce',
        name: 'Noyer Américain Fumé',
        material: 'WOOD',
        color: '#4A2E18',
        widthMm: 30,
        heightMm: 45,
        depthMm: 22,
        priceUsd: 119.0,
        thumbnailUrl: '/frames/noyer.webp',
        available: true,
      },
    }),
    prisma.frame.upsert({
      where: { id: 'frame-alu-mat' },
      update: {},
      create: {
        id: 'frame-alu-mat',
        name: 'Aluminium Brossé Noir Mat',
        material: 'METAL',
        color: '#1A1A1A',
        widthMm: 15,
        heightMm: 30,
        depthMm: 18,
        priceUsd: 69.0,
        thumbnailUrl: '/frames/alu-noir.webp',
        available: true,
      },
    }),
    prisma.frame.upsert({
      where: { id: 'frame-or-musee' },
      update: {},
      create: {
        id: 'frame-or-musee',
        name: 'Doré Musée Patiné à la Feuille',
        material: 'COMPOSITE',
        color: '#D4AF37',
        widthMm: 45,
        heightMm: 60,
        depthMm: 30,
        priceUsd: 159.0,
        thumbnailUrl: '/frames/or-musee.webp',
        available: true,
      },
    }),
  ]);

  // 4. Fournisseurs
  const suppliers = await Promise.all([
    prisma.supplier.upsert({
      where: { id: 'supp-bois-moulures' },
      update: {},
      create: {
        id: 'supp-bois-moulures',
        name: 'Moulures & Bois des Vosges SAS',
        category: 'RAW_MATERIALS_WOOD',
        contactEmail: 'commandes@boisdesvosges.fr',
        contactPhone: '+33 3 29 00 11 22',
        taxId: 'FR34892019482',
        paymentTerms: 'NET_30',
        currency: 'USD',
        balanceDueUsd: 4850.0,
      },
    }),
    prisma.supplier.upsert({
      where: { id: 'supp-verre-optique' },
      update: {},
      create: {
        id: 'supp-verre-optique',
        name: 'Claryl Glass Europe / Verres Musée',
        category: 'RAW_MATERIALS_GLASS',
        contactEmail: 'b2b@clarylglass.eu',
        contactPhone: '+32 2 555 7890',
        taxId: 'BE0823910394',
        paymentTerms: 'NET_30',
        currency: 'USD',
        balanceDueUsd: 2340.0,
      },
    }),
    prisma.supplier.upsert({
      where: { id: 'supp-dhl-express' },
      update: {},
      create: {
        id: 'supp-dhl-express',
        name: 'DHL Express Global Logistics',
        category: 'SHIPPING_LOGISTICS',
        contactEmail: 'billing@dhl.com',
        paymentTerms: 'NET_15',
        currency: 'USD',
        balanceDueUsd: 1890.0,
      },
    }),
    prisma.supplier.upsert({
      where: { id: 'supp-meta-ads' },
      update: {},
      create: {
        id: 'supp-meta-ads',
        name: 'Meta Ads & Google Ads Inc',
        category: 'MARKETING_ADS',
        contactEmail: 'billing@meta.com',
        paymentTerms: 'DUE_ON_RECEIPT',
        currency: 'USD',
        balanceDueUsd: 0,
      },
    }),
    prisma.supplier.upsert({
      where: { id: 'supp-aws-vercel' },
      update: {},
      create: {
        id: 'supp-aws-vercel',
        name: 'Vercel / Cloudflare / Supabase Infra',
        category: 'SOFTWARE_SERVERS',
        contactEmail: 'enterprise-billing@vercel.com',
        paymentTerms: 'DUE_ON_RECEIPT',
        currency: 'USD',
        balanceDueUsd: 0,
      },
    }),
  ]);

  // 5. Dépenses d'exploitation et d'achats
  const sampleExpenses = [
    {
      id: 'exp-2026-01',
      supplierId: 'supp-bois-moulures',
      supplierName: 'Moulures & Bois des Vosges SAS',
      category: 'RAW_MATERIALS_WOOD',
      description: 'Lot 500m baguettes Chêne & Noyer certifié FSC',
      amountUsd: 4850.0,
      taxRatePercent: 20,
      taxAmountUsd: 970.0,
      totalWithTaxUsd: 5820.0,
      status: 'APPROVED',
      paymentMethod: 'BANK_TRANSFER',
      period: '2026-02',
      date: new Date('2026-02-10'),
      isRecurring: false,
    },
    {
      id: 'exp-2026-02',
      supplierId: 'supp-verre-optique',
      supplierName: 'Claryl Glass Europe / Verres Musée',
      category: 'RAW_MATERIALS_GLASS',
      description: 'Plaques de verre anti-reflet UV 99% 80x120cm',
      amountUsd: 3200.0,
      taxRatePercent: 20,
      taxAmountUsd: 640.0,
      totalWithTaxUsd: 3840.0,
      status: 'PAID',
      paymentMethod: 'BANK_TRANSFER',
      period: '2026-02',
      date: new Date('2026-02-05'),
      paidAt: new Date('2026-02-06'),
      isRecurring: false,
    },
    {
      id: 'exp-2026-03',
      supplierId: 'supp-dhl-express',
      supplierName: 'DHL Express Global Logistics',
      category: 'SHIPPING_LOGISTICS',
      description: 'Expéditions express et assurances œuvres d art - Février',
      amountUsd: 2150.0,
      taxRatePercent: 20,
      taxAmountUsd: 430.0,
      totalWithTaxUsd: 2580.0,
      status: 'PAID',
      paymentMethod: 'DIRECT_DEBIT',
      period: '2026-02',
      date: new Date('2026-02-14'),
      paidAt: new Date('2026-02-14'),
      isRecurring: true,
    },
    {
      id: 'exp-2026-04',
      supplierId: 'supp-meta-ads',
      supplierName: 'Meta Ads & Google Ads Inc',
      category: 'MARKETING_ADS',
      description: 'Campagnes d acquisition Meta Ads & Google Search CAC',
      amountUsd: 4500.0,
      taxRatePercent: 20,
      taxAmountUsd: 900.0,
      totalWithTaxUsd: 5400.0,
      status: 'PAID',
      paymentMethod: 'CREDIT_CARD',
      period: '2026-02',
      date: new Date('2026-02-18'),
      paidAt: new Date('2026-02-18'),
      isRecurring: true,
    },
    {
      id: 'exp-2026-05',
      supplierId: null,
      supplierName: 'Atelier Paris 11e - Bail Commercial',
      category: 'WORKSHOP_RENT',
      description: 'Loyer mensuel atelier d encadrement + charges',
      amountUsd: 3800.0,
      taxRatePercent: 20,
      taxAmountUsd: 760.0,
      totalWithTaxUsd: 4560.0,
      status: 'PAID',
      paymentMethod: 'DIRECT_DEBIT',
      period: '2026-02',
      date: new Date('2026-02-01'),
      paidAt: new Date('2026-02-01'),
      isRecurring: true,
    },
    {
      id: 'exp-2026-06',
      supplierId: null,
      supplierName: 'Équipe Encadrement & Dev',
      category: 'PAYROLL_SALARIES',
      description: 'Salaires & charges sociales maîtres encadreurs & dev',
      amountUsd: 14200.0,
      taxRatePercent: 0,
      taxAmountUsd: 0,
      totalWithTaxUsd: 14200.0,
      status: 'PAID',
      paymentMethod: 'BANK_TRANSFER',
      period: '2026-02',
      date: new Date('2026-02-28'),
      paidAt: new Date('2026-02-28'),
      isRecurring: true,
    },
    {
      id: 'exp-2026-07',
      supplierId: 'supp-aws-vercel',
      supplierName: 'Vercel / Cloudflare / Supabase Infra',
      category: 'SOFTWARE_SERVERS',
      description: 'Hébergement Next.js, bases PostgreSQL & CDN Cloudflare R2',
      amountUsd: 650.0,
      taxRatePercent: 20,
      taxAmountUsd: 130.0,
      totalWithTaxUsd: 780.0,
      status: 'PAID',
      paymentMethod: 'CREDIT_CARD',
      period: '2026-02',
      date: new Date('2026-02-15'),
      paidAt: new Date('2026-02-15'),
      isRecurring: true,
    },
  ];

  for (const exp of sampleExpenses) {
    await prisma.expense.upsert({
      where: { id: exp.id },
      update: {},
      create: exp as any,
    });
  }

  // 6. Factures Clients & B2B
  const invoices = await Promise.all([
    prisma.invoice.upsert({
      where: { invoiceNumber: 'INV-2026-0089' },
      update: {},
      create: {
        id: 'inv_01',
        invoiceNumber: 'INV-2026-0089',
        clientName: 'Cabinet Architecture Jean Dupont & Associés',
        clientEmail: 'comptabilite@architectes.com',
        clientAddress: '14 Rue de la Paix, 75002 Paris',
        clientTaxId: 'FR4982739182',
        subtotalUsd: 3840.0,
        taxRatePercent: 20.0,
        taxAmountUsd: 768.0,
        totalUsd: 4608.0,
        status: 'PAID',
        issueDate: new Date('2026-02-02'),
        dueDate: new Date('2026-03-02'),
        paidAt: new Date('2026-02-15'),
        items: [
          { description: '24x Cadres Noyer Fumé Grand Format 70x100cm', qty: 24, unitPrice: 160, total: 3840 },
        ],
      },
    }),
    prisma.invoice.upsert({
      where: { invoiceNumber: 'INV-2026-0090' },
      update: {},
      create: {
        id: 'inv_02',
        invoiceNumber: 'INV-2026-0090',
        clientName: 'Hôtel Particulier Marais Luxury Suites',
        clientEmail: 'finance@hotel-marais-paris.com',
        clientAddress: '28 Rue des Francs-Bourgeois, 75003 Paris',
        clientTaxId: 'FR8392019482',
        subtotalUsd: 6200.0,
        taxRatePercent: 20.0,
        taxAmountUsd: 1240.0,
        totalUsd: 7440.0,
        status: 'ISSUED',
        issueDate: new Date('2026-02-18'),
        dueDate: new Date('2026-03-20'),
        items: [
          { description: '30x Encadrements Doré Feuille d Or & Tirages Fine Art', qty: 30, unitPrice: 206.67, total: 6200 },
        ],
      },
    }),
  ]);

  // 7. Budgets Mensuels 2026
  const budgets = [
    { period: '2026-02', category: 'REVENUE_TOTAL', target: 65000.0, actual: 72450.0 },
    { period: '2026-02', category: 'COGS_MATERIALS', target: 18000.0, actual: 16840.0 },
    { period: '2026-02', category: 'MARKETING', target: 5000.0, actual: 4500.0 },
    { period: '2026-02', category: 'PAYROLL', target: 15000.0, actual: 14200.0 },
    { period: '2026-02', category: 'WORKSHOP_RENT', target: 3800.0, actual: 3800.0 },
    { period: '2026-02', category: 'SOFTWARE_HOSTING', target: 800.0, actual: 650.0 },
  ];

  for (const b of budgets) {
    await prisma.financialBudget.upsert({
      where: { period_category: { period: b.period, category: b.category } },
      update: {},
      create: {
        period: b.period,
        category: b.category,
        targetAmountUsd: b.target,
        actualAmountUsd: b.actual,
      },
    });
  }

  // 8. Reversements Artistes
  await prisma.artistPayout.upsert({
    where: { id: 'payout-2026-01' },
    update: {},
    create: {
      id: 'payout-2026-01',
      artistId: artistProfile.id,
      amountUsd: 1420.0,
      period: '2026-02',
      status: 'PAID',
      stripeTransferId: 'tr_1NXk892ELENA99',
      artworksCount: 4,
      processedAt: new Date('2026-02-28'),
    },
  });

  console.log('✅ Base de données seedée avec succès !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur de seed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
