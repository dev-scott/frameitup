import { Module } from '@nestjs/common';
import { FramesResolver } from './frames.resolver';
import { FramesService } from './frames.service';

@Module({
  providers: [FramesResolver, FramesService],
})
export class FramesModule {}
