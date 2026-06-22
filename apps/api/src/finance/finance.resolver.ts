import { Resolver, Query, Args, ObjectType, Field, Float } from '@nestjs/graphql';
import { FinanceService } from './finance.service';

@ObjectType()
class FinanceSummary {
  @Field(() => Float) totalRevenue!: number;
  @Field(() => Float) totalCogs!: number;
  @Field(() => Float) totalProfit!: number;
  @Field(() => Float) margin!: number;
}

@Resolver()
export class FinanceResolver {
  constructor(private financeService: FinanceService) {}

  @Query(() => FinanceSummary)
  async financeSummary(): Promise<FinanceSummary> {
    return this.financeService.getSummary();
  }
}
