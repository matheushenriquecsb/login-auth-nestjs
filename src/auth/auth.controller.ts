import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RegisterRequestDto } from './dto/register-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  registerUser(@Body() registerAuthDto: RegisterRequestDto): Promise<void> {
    return this.authService.registerUser(registerAuthDto);
  }

  @Post('/signin')
  loginUser(@Body() loginAuthDto: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.loginUser(loginAuthDto);
  }

  @Post('/google')
  loginGoogleAuth(@Body() googleAuthDto: GoogleAuthDto) {
    return this.authService.loginGoogleAuth(googleAuthDto);
  }

  @Get('/signout')
  signOut(@Res() res: Response) {
    return this.authService.signOut(res);
  }
}
