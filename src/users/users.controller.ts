import { Controller, Body, Param, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateRequestDto } from './dto/update-request.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('/update/:id')
  updateUser(
    @Body() updateUserDto: UpdateRequestDto,
    @Param('id') id: string,
  ): Promise<void> {
    return this.usersService.updateUser(updateUserDto, id);
  }

  @Delete('/delete/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
