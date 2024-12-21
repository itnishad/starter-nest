import {
  Controller,
  HttpCode,
  Get,
  Post,
  HttpStatus,
  Body,
  UseGuards,
  Req,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SignupDto } from './dto/signUp.dto';
import { LoginDto } from './dto/login.dto';
import { Argon } from './service/argon.service';
import { JwtService } from '@nestjs/jwt';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly argon: Argon,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/signup')
  async signup(@Body(ValidationPipe) signUpDto: SignupDto) {
    //TODO: Check Email is in use.
    const isExist = await this.authService.checkExistingUser(signUpDto.email);
    if (isExist) {
      return new BadRequestException('User Already Exist');
    }
    //TODO: Hash the password with argon2d.
    //TODO: Check if we pass 'hello wordl' as a pssword is it work.
    const hashPassword = await this.argon.hashPassword(signUpDto.password);
    //TODO: Create UserDocument and save it database.
    const newUser = { ...signUpDto, password: hashPassword };
    const user = await this.authService.create(newUser);
    //TODO: create a jwt token using user information.
    const accessToken = this.jwtService.sign(
      { userId: user._id },
      { expiresIn: '1h' },
    );
    //TODO: send jwt token to the client.
    return {
      accessToken,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async logIn(@Body(ValidationPipe) credential: LoginDto) {
    //TODO: Find User exist by email.
    const existUser = await this.authService.checkExistingUser(
      credential.email,
    );
    //TODO: Compare enterd password by existing Password.
    //TODO: Generate JWT Token.
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  prifile(@Req() req: any) {
    return req?.user;
  }
}
