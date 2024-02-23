import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  registerUser(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.registerUser(registerAuthDto);
  }

  @Post('/sign-in')
  loginUser(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.loginUser(loginAuthDto);
  }

  @Get('/sign-out')
  logout() {
    return;
  }
}
