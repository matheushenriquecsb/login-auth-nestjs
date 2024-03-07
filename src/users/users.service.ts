import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateRequestDto } from './dto/update-request.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async updateUser(updateUserDto: UpdateRequestDto, id: string): Promise<void> {
    await this.userRepository.update(id, {
      username: updateUserDto.username,
      email: updateUserDto.email,
      profilePicture: updateUserDto.profilePicture,
    });
  }

  async deleteUser(id: string) {
    try {
      await this.userRepository.delete(id);
    } catch (error) {
      console.log(error);
    }
  }
}
