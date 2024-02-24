import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async registerUser(registerAuthDto: RegisterAuthDto): Promise<void> {
    const hashedPassword = await bcrypt.hash(registerAuthDto.password, 10);

    try {
      await this.userRepository.save({
        ...registerAuthDto,
        password: hashedPassword,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async loginUser(
    loginAuthDto: LoginAuthDto,
  ): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOneBy({
      email: loginAuthDto.email,
    });

    if (!user) throw new NotFoundException('User not found');

    const validPassword = await bcrypt.compare(
      loginAuthDto.password,
      user.password,
    );

    if (!validPassword) throw new BadRequestException('Wrong Credentials');

    const payload = { id: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
