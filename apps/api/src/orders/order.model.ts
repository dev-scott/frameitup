import { ObjectType, Field, ID, Float, registerEnumType } from '@nestjs/graphql';

export enum OrderStatusGql {
  PENDING = 'PENDING',
  PAYMENT_CONFIRMED = 'PAYMENT_CONFIRMED',
  IN_PRODUCTION = 'IN_PRODUCTION',
  QUALITY_CHECK = 'QUALITY_CHECK',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

registerEnumType(OrderStatusGql, { name: 'OrderStatus' });

@ObjectType()
export class OrderModel {
  @Field(() => ID)
  id!: string;

  @Field()
  userId!: string;

  @Field(() => OrderStatusGql)
  status!: OrderStatusGql;

  @Field(() => Float)
  totalUsd!: number;

  @Field({ nullable: true })
  trackingNumber?: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
