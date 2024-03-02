import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterRequestDto } from './dto/register-request.dto';
import * as bcrypt from 'bcrypt';
import { LoginRequestDto } from './dto/login-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async registerUser(registerAuthDto: RegisterRequestDto): Promise<void> {
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

  async loginUser(loginAuthDto: LoginRequestDto): Promise<LoginResponseDto> {
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
      profilePicture: user.profilePicture,
      email: user.email,
      username: user.username,
    };
  }

  async loginGoogleAuth(googleAuthDto: GoogleAuthDto) {
    try {
      const user = await this.userRepository.findOneBy({
        email: googleAuthDto.email,
      });

      if (user) {
        const payload = { id: user.id };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }

      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

      console.log(hashedPassword);
    } catch (error) {
      throw new Error(error);
    }
  }
}
