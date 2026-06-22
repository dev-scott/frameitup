import { Resolver, Query, ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
class HealthCheck {
  @Field()
  status!: string;
}

@Resolver()
export class AuthResolver {
  @Query(() => HealthCheck)
  health(): HealthCheck {
    return { status: 'ok' };
  }
}
