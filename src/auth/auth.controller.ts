import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  registerUser(@Body() registerAuthDto: RegisterAuthDto): Promise<void> {
    return this.authService.registerUser(registerAuthDto);
  }

  @Post('/signin')
  loginUser(
    @Body() loginAuthDto: LoginAuthDto,
  ): Promise<{ access_token: string }> {
    return this.authService.loginUser(loginAuthDto);
  }

  @Get('/sign-out')
  logout() {
    return;
  }
}
