import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { OrderModel } from './order.model';

@Resolver(() => OrderModel)
export class OrdersResolver {
  constructor(private ordersService: OrdersService) { }

  @Query(() => [OrderModel])
  async myOrders(@Args('userId', { type: () => ID }) userId: string): Promise<OrderModel[]> {
    const orders = await this.ordersService.findByUser(userId);
    return orders.map((o) => ({ ...o, totalUsd: Number(o.totalUsd), status: o.status as any, trackingNumber: o.trackingNumber ?? undefined, }));
  }
}
