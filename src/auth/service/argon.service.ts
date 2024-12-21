import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class Argon {
  async hashPassword(password: string) {
    return await argon2.hash(password);
  }
}
