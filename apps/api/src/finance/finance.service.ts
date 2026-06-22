import { Injectable } from '@nestjs/common';
import { db } from '@frameitup/database';
import { Prisma } from '@frameitup/database';

const revenueEntrySelect = {} satisfies Prisma.RevenueEntryDefaultArgs;

// 2. Extraction du type de retour propre
export type RevenueEntryEntity = Prisma.RevenueEntryGetPayload<typeof revenueEntrySelect>;

@Injectable()
export class FinanceService {
  async getRevenueByPeriod(period: string): Promise<RevenueEntryEntity[]> {
    return db.revenueEntry.findMany({
      where: { period },
      orderBy: { recordedAt: 'desc' },
    });
  }

  async getSummary() {
    const entries = await db.revenueEntry.findMany();
    const totalRevenue = entries.reduce((sum, e) => sum + Number(e.amountUsd), 0);
    const totalCogs = entries.reduce((sum, e) => sum + Number(e.cogsUsd), 0);
    const totalProfit = entries.reduce((sum, e) => sum + Number(e.profitUsd), 0);
    return { totalRevenue, totalCogs, totalProfit, margin: totalRevenue ? totalProfit / totalRevenue : 0 };
  }
}
