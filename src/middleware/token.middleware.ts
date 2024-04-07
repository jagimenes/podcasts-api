import { randomUUID } from 'node:crypto';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  private accessToken: string;

  constructor(private readonly configService: ConfigService) {
    let accessToken = this.configService.get<string>('accessToken');

    if (!accessToken) {
      accessToken = randomUUID();
      console.log(
        `Blank accessToken parameter. Gererating a random one: [${accessToken}]`,
      );
    }

    this.accessToken = accessToken;
  }

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token || token != this.accessToken) {
      throw new UnauthorizedException();
    }
    next();
  }
}
