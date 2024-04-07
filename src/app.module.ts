import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PodcastsService } from './services/podcasts.service';
import { PodcastsController } from './api/podcasts/podcasts.controller';
import { ConfigModule } from '@nestjs/config';
import configParams from './config/config.params';
import { TokenMiddleware } from './middleware/token.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configParams],
    }),
  ],
  controllers: [PodcastsController],
  providers: [PodcastsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware).forRoutes('*');
  }
}
