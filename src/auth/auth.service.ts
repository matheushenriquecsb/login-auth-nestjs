import { Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import bcryptjs from 'bcryptjs';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async registerUser(registerAuthDto: RegisterAuthDto): Promise<void> {
    const hashedPassword = bcryptjs.hashSync(registerAuthDto.password, 10);

    try {
      await this.userRepository.save({
        ...registerAuthDto,
        password: hashedPassword,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async loginUser(loginAuthDto: LoginAuthDto) {
    const user = await this.userRepository.findOneBy({
      email: loginAuthDto.email,
    });

    if (!user) throw new Error('User not found');

    const validPassword = bcryptjs.compare(
      loginAuthDto.password,
      user.password,
    );

    if (!validPassword) throw new Error('Wrong Credentials');
  }
}
