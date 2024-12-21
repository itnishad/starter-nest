import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  create(@Body(ValidationPipe) createUser: CreateUserDto) {
    return this.userService.create(createUser);
  }
}
