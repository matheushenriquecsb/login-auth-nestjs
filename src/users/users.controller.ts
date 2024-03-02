import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/update')
  create(@Body() createUserDto) {
    return this.usersService.create(createUserDto);
  }
}
