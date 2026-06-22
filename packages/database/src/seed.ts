import { prisma } from './index';

async function main() {
  console.log('🌱 Seeding database...');

  // Seed frames
  const frames = await Promise.all([
    prisma.frame.upsert({
      where: { id: 'frame-oak-classic' },
      update: {},
      create: {
        id: 'frame-oak-classic',
        name: 'Oak Classic',
        material: 'WOOD',
        color: '#8B6914',
        widthMm: 30,
        heightMm: 30,
        depthMm: 15,
        priceUsd: 49.99,
        thumbnailUrl: '/frames/oak-classic.webp',
        available: true,
      },
    }),
    prisma.frame.upsert({
      where: { id: 'frame-matte-black' },
      update: {},
      create: {
        id: 'frame-matte-black',
        name: 'Matte Black',
        material: 'METAL',
        color: '#1A1A1A',
        widthMm: 20,
        heightMm: 20,
        depthMm: 10,
        priceUsd: 39.99,
        thumbnailUrl: '/frames/matte-black.webp',
        available: true,
      },
    }),
    prisma.frame.upsert({
      where: { id: 'frame-museum-gold' },
      update: {},
      create: {
        id: 'frame-museum-gold',
        name: 'Museum Gold',
        material: 'WOOD',
        color: '#D4AF37',
        widthMm: 50,
        heightMm: 50,
        depthMm: 20,
        priceUsd: 89.99,
        thumbnailUrl: '/frames/museum-gold.webp',
        available: true,
      },
    }),
  ]);

  console.log(`✅ Seeded ${frames.length} frames`);
  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
