import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configs } from './config';
import { WinstonModule } from 'nest-winston';
import { createWinstonConfig } from './logger/winston.config';
import { LoggerModule } from './logger/logger.module';
import { LoggingInterceptor } from './logger/logging.intercepter';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      load: [...configs],
    }),
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        createWinstonConfig(configService),
    }),
    LoggerModule,
    UsersModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
