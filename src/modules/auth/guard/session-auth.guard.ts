import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class SessionAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: any = context.switchToHttp().getRequest();
    if (!request.session?.user) {
      throw new UnauthorizedException('Please login first');
    }
    return !!request.session?.user;
  }
}
