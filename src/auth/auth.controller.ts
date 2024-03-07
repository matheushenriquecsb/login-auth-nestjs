import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/register-request.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { GoogleAuthDto } from './dto/google-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  registerUser(@Body() registerAuthDto: RegisterRequestDto): Promise<void> {
    return this.authService.registerUser(registerAuthDto);
  }

  @Post('/signin')
  loginUser(@Body() loginAuthDto: LoginRequestDto) {
    return this.authService.loginUser(loginAuthDto);
  }

  @Post('/google')
  loginGoogleAuth(@Body() googleAuthDto: GoogleAuthDto) {
    return this.authService.loginGoogleAuth(googleAuthDto);
  }

  @Get('/sign-out')
  logout() {
    return;
  }
}
