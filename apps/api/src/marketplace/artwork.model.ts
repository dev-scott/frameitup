import { ObjectType, Field, ID, Float, Int, registerEnumType } from '@nestjs/graphql';

export enum ArtworkEditionGql {
  OPEN = 'OPEN',
  LIMITED = 'LIMITED',
  ONE_OF_ONE = 'ONE_OF_ONE',
}

registerEnumType(ArtworkEditionGql, { name: 'ArtworkEdition' });

@ObjectType()
export class ArtworkModel {
  @Field(() => ID)
  id!: string;

  @Field()
  artistId!: string;

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field()
  imageUrl!: string;

  @Field(() => Float)
  priceUsd!: number;

  @Field(() => ArtworkEditionGql)
  edition!: ArtworkEditionGql;

  @Field(() => [String])
  tags!: string[];

  @Field(() => Int)
  availableCount!: number;

  @Field(() => Int)
  soldCount!: number;

  @Field()
  createdAt!: Date;
}
