import { Controller, Get, Query } from '@nestjs/common';
import { BestPodcastsResult } from 'src/domain/interfaces/best-podcasts-result.interface';
import { InputParamsProps } from 'src/domain/interfaces/input-params-props.interface';
import { PodcastsService } from 'src/services/podcasts.service';

@Controller('best_podcasts')
export class PodcastsController {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Get()
  async index(@Query() params: InputParamsProps): Promise<BestPodcastsResult> {
    return await this.podcastsService.findBestPodcasts(params);
  }
}
