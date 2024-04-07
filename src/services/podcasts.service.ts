import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { Genre } from 'src/domain/models/genre';
import { Podcast } from 'src/domain/models/podcast';

import * as fs from 'node:fs';
import * as path from 'node:path';
import { InputParamsProps } from 'src/domain/interfaces/input-params-props.interface';
import { CoutryCodes } from 'src/domain/enum/country.enum';
import { paginatorUtil } from 'src/utils/paginator.util';
import { BestPodcastsResult } from 'src/domain/interfaces/best-podcasts-result.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PodcastsService implements OnModuleInit {
  private podcasts: Podcast[] = [];
  private genres: Genre[] = [];
  private defaultGenre: Genre;
  private defaultGenreId: number;
  private pageSize: number;
  private listennotesUrl: string;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    try {
      this.defaultGenreId = this.configService.get<number>('defaultGenreId');
      this.pageSize = this.configService.get<number>('pageSize');
      this.listennotesUrl = this.configService.get<string>('listennotesUrl');

      const podcastsPath = this.getFilePath('podcasts.json');
      const genresPath = this.getFilePath('genres.json');

      this.podcasts = this.getJson(podcastsPath) as Podcast[];
      this.genres = this.getJson(genresPath) as Genre[];
      this.defaultGenre = this.genres.find(
        (genre) => genre.id == this.defaultGenreId,
      );
    } catch (error) {
      console.error('Error reading files:', error);
      throw new BadRequestException('Error reading files');
    }
  }

  async findBestPodcasts(
    params: InputParamsProps,
  ): Promise<BestPodcastsResult> {
    const { page, region, genre_id, safe_mode } = params;

    const filteredPodcasts: Podcast[] = [];
    let genre: Genre;

    for (const podcast of this.podcasts) {
      let includePodcast = true;

      if (genre_id) {
        genre = this.genres.find((genre) => genre.id == genre_id);
        includePodcast =
          includePodcast && podcast.genre_ids.some((id) => id == genre_id);
      }

      if (region) {
        const selectedCountry = CoutryCodes[region];
        includePodcast = includePodcast && podcast.country == selectedCountry;
      }

      if (safe_mode && safe_mode == 1) {
        includePodcast = includePodcast && !podcast.explicit_content;
      }

      if (includePodcast) {
        filteredPodcasts.push(podcast);
      }
    }

    if (filteredPodcasts.length > 0 && !genre) {
      genre = this.defaultGenre;
    }

    return paginatorUtil({
      genre,
      podcasts: filteredPodcasts,
      listennotesUrl: this.listennotesUrl,
      page,
      pageSize: this.pageSize,
    });
  }

  private getFilePath(filename: string): string {
    return path.resolve(__dirname, '..', '..', 'src', 'data', filename);
  }

  private getJson(path: string) {
    return JSON.parse(fs.readFileSync(path, 'utf8'));
  }
}
