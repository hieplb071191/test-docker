import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseInterceptors,
} from '@nestjs/common';
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

  @Post('login-session')
  async loginWithSession(
    @Session() session: Record<string, any>,
    @Body() body: LoginDto,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    session.visits = session.visits ? session.visits + 1 : 1;
    const user: any = await this.authService.verifyUser(body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    session.user = user;
    console.log(session);
  }

  @Get('me')
  getProfile(@Session() session: Record<string, any>) {
    console.log(session.id);
    return session;
  }
}
