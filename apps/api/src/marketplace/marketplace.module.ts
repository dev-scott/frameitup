import { Module } from '@nestjs/common';
import { MarketplaceResolver } from './marketplace.resolver';
import { MarketplaceService } from './marketplace.service';

@Module({
  providers: [MarketplaceResolver, MarketplaceService],
})
export class MarketplaceModule {}
