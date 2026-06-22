import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class FrameModel {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  material!: string;

  @Field()
  color!: string;

  @Field(() => Float)
  widthMm!: number;

  @Field(() => Float)
  heightMm!: number;

  @Field(() => Float)
  depthMm!: number;

  @Field(() => Float)
  priceUsd!: number;

  @Field()
  thumbnailUrl!: string;

  @Field()
  available!: boolean;

  @Field()
  createdAt!: Date;
}
