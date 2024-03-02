import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  create(createUserDto) {
    return createUserDto;
  }
}
