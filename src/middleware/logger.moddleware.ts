import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class WinstonLogger implements NestMiddleware {
  constructor(private readonly logger: Logger) {}
  use(req: Request, _res: Response, next: NextFunction) {
    this.logger.log(`${req.method}----${req.ip}}`);
    next();
  }
}
