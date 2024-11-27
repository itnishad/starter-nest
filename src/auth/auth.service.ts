import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async signIn(userName: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(userName);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { _password, ...result } = user;
    // TODO: Generate a JWT and return it here
    const payload = { sub: user.userId, userName: user.username };
    // instead of the user object
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
