import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './guard/auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { SessionAuthGuard } from './guard/session-auth.guard';
import { PermissionRolesGuard } from './guard/session-role.guard';

@Global()
@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          global: true,
          secret: config.get('jwt.secret'),
          signOptions: {
            expiresIn: config.get('jwt.expiresIn'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    JwtAuthGuard,
    JwtStrategy,
    SessionAuthGuard,
    PermissionRolesGuard,
  ],
  exports: [
    AuthService,
    JwtAuthGuard,
    JwtStrategy,
    SessionAuthGuard,
    PermissionRolesGuard,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
