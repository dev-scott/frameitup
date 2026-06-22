import { Injectable } from '@nestjs/common';
import { db } from '@frameitup/database';
import { Prisma } from '@frameitup/database';

const orderWithRelations = {
  include: {
    items: {
      include: { frame: true }
    }
  }
} satisfies Prisma.OrderDefaultArgs;

export type OrderWithRelations = Prisma.OrderGetPayload<typeof orderWithRelations>;

@Injectable()
export class OrdersService {
  async findByUser(userId: string): Promise<OrderWithRelations[]> {
    return db.order.findMany({
      where: { userId },
      include: { items: { include: { frame: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string): Promise<OrderWithRelations | null> {
    return db.order.findUnique({
      where: { id },
      include: { items: { include: { frame: true } } },
    });
  }
}
