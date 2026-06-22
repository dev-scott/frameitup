import { Injectable } from '@nestjs/common';
import { db } from '@frameitup/database';
import { Prisma } from '@frameitup/database';

const artworkWithRelations = {
  include: {
    artist: true,
  },
} satisfies Prisma.ArtworkDefaultArgs;

// 2. Extraction du type de retour propre
export type ArtworkWithRelations = Prisma.ArtworkGetPayload<typeof artworkWithRelations>;

@Injectable()
export class MarketplaceService {
  async findArtworks(tags?: string[]): Promise<ArtworkWithRelations[]> {
    return db.artwork.findMany({
      where: {
        published: true,
        ...(tags?.length ? { tags: { hasSome: tags } } : {}),
      },
      include: { artist: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findArtworkById(id: string): Promise<ArtworkWithRelations | null> {
    return db.artwork.findUnique({
      where: { id },
      include: { artist: true },
    });
  }
}
