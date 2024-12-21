import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JWT {
  constructor(private readonly jwtService: JwtService) {}

  async accessToken(userId: string) {
    const token = await this.jwtService.sign({ userId }, { expiresIn: '1h' });
    return `${userId}abcdedght`;
  }
}
