import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { LoggingInterceptor } from '../../logger/logging.intercepter';
import { LoginDto } from './dto/login.dto';

@UseInterceptors(LoggingInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBearerAuth('accessToken')
  @Post('signup')
  async signUp(@Body() body: SignupDto): Promise<any> {
    return this.authService.signupPassword(body);
  }

  @Post('login')
  async loginWithPassword(@Body() body: LoginDto): Promise<any> {
    return this.authService.loginWithPassword(body);
  }
}
