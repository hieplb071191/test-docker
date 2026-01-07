import { Controller, Get } from '@nestjs/common';
import { Auth } from '../auth/decorator/auth.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UserController {

  @ApiBearerAuth('accessToken')
  @Auth()
  @Get('list')
  async getUser(): Promise<any> {
    return { name: 'test' };
  }
}