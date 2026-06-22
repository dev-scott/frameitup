import { Injectable } from '@nestjs/common';
import { db, Prisma } from '@frameitup/database';


const frameSelect = {} satisfies Prisma.FrameDefaultArgs;

// 2. Extraction du type de retour propre
export type FrameEntity = Prisma.FrameGetPayload<typeof frameSelect>;

@Injectable()
export class FramesService {
  async findAll(onlyAvailable = true):Promise<FrameEntity[]> {
    return db.frame.findMany({
      where: onlyAvailable ? { available: true } : undefined,
      orderBy: { priceUsd: 'asc' },
    });
  }

  async findById(id: string):Promise<FrameEntity|null> {
    return db.frame.findUnique({ where: { id } });
  }
}
