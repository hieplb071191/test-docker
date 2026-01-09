import { Body, Controller, Get, Post } from '@nestjs/common';
import { Auth } from '../auth/decorator/auth.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Permissions } from '../auth/decorator/permission.decorator';
import { PermissionEnum } from '../shares/enum/permission.enum';
import { Roles } from '../auth/decorator/role.decorator';
import { CreateRoleDto } from './dto/create-role.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UsersService,
  ) {}
  @ApiBearerAuth('accessToken')
  @Auth()
  @Get('list')
  getUser(): any {
    return { name: 'test' };
  }

  @ApiBearerAuth('accessToken')
  @Permissions(PermissionEnum.CREATE_ROLE)
  @Roles()
  @Post('create-role')
  async createRole(@Body() body: CreateRoleDto) {
    return await this.userService.createNewRole(body);
  }
}
