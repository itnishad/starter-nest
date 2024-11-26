import {
  ForbiddenException,
  Injectable,
  NestMiddleware,
  Optional,
} from '@nestjs/common';

export class UserAgentOption {
  accept?: string[];
}

// export function userAgent(req, res, next) {
//   const ua = req.headers['user-agent'];
//   console.log(ua);
//   next();
// }

@Injectable()
export class UserAgentMiddleware implements NestMiddleware {
  constructor(@Optional() private readonly option: UserAgentOption) {}

  use(req: any, res: any, next: (error?: Error | any) => void) {
    const ua = req.headers['user-agent'];
    if (!this.option) {
      return next();
    }
    if (!this.option.accept.includes(ua)) {
      throw new ForbiddenException('Not Acceptable');
    }
    next();
  }
}
