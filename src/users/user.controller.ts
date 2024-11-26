import {
  Controller,
  Get,
  Req,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  ParseIntPipe,
  Param,
  BadRequestException,
  Inject,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { ParseDatePipe } from './parse-date.pipe';

@Controller('user')
export class UsersController {
  private readonly logger = new Logger();
  constructor(@Inject('TestFectory') private readonly test: string) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Req() req: Request) {
    throw new Error('test Error');

    // return 'Hello Nishad';
  }
  @Post()
  createUser(@Body('timestamp', ParseDatePipe) body: string) {
    console.log(body);
    return 'created successfully';
  }

  @Get('/:id')
  findUser(@Param('id', ParseIntPipe) id: number) {
    if (id <= 0) {
      throw new BadRequestException(
        {
          cause: new Error(),
          description: '2222222222',
        },
        '1111111',
      );
    }
    return 'update successfully';
  }
}
