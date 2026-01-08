import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from '../decorator/permission.decorator';
import { JwtAuthGuard } from './auth.guard';

@Injectable()
export class RolesGuard extends JwtAuthGuard {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      PERMISSION_KEY,
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request: any = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const user = request.user;
    if (!user) {
      return false;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (user?.isFullPermission) {
      return true;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    return requiredRoles.some((role) => user.roles.includes(role));
  }
}
