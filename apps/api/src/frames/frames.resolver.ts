import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { FramesService } from './frames.service';
import { FrameModel } from './frame.model';

@Resolver(() => FrameModel)
export class FramesResolver {
  constructor(private framesService: FramesService) {}

  @Query(() => [FrameModel])
  async frames(): Promise<FrameModel[]> {
    const frames = await this.framesService.findAll();
    return frames.map((f) => ({
      ...f,
      priceUsd: Number(f.priceUsd),
    }));
  }

  @Query(() => FrameModel, { nullable: true })
  async frame(@Args('id', { type: () => ID }) id: string): Promise<FrameModel | null> {
    const frame = await this.framesService.findById(id);
    if (!frame) return null;
    return { ...frame, priceUsd: Number(frame.priceUsd) };
  }
}
