import {
  Controller,
  HttpCode,
  Get,
  Post,
  HttpStatus,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signup')
  signup() {
    return 'signup';
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  prifile(@Req() req: any) {
    return req?.user;
  }
}
