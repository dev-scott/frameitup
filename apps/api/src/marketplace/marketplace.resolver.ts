import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { MarketplaceService } from './marketplace.service';
import { ArtworkModel } from './artwork.model';

@Resolver(() => ArtworkModel)
export class MarketplaceResolver {
  constructor(private marketplaceService: MarketplaceService) {}

  @Query(() => [ArtworkModel])
  async artworks(
    @Args('tags', { type: () => [String], nullable: true }) tags?: string[],
  ): Promise<ArtworkModel[]> {
    const artworks = await this.marketplaceService.findArtworks(tags);
    return artworks.map((a) => ({ ...a, priceUsd: Number(a.priceUsd), edition: a.edition as any }));
  }

  @Query(() => ArtworkModel, { nullable: true })
  async artwork(@Args('id', { type: () => ID }) id: string): Promise<ArtworkModel | null> {
    const a = await this.marketplaceService.findArtworkById(id);
    if (!a) return null;
    return { ...a, priceUsd: Number(a.priceUsd), edition: a.edition as any };
  }
}
