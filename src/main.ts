import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port', 3000);
  const env = configService.get<string>('app.env');

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  await app.listen(port).then(() => {
    console.log(
      `Application is running in ${env} mode on: http://localhost:${port}`,
    );
  });
}
bootstrap();
