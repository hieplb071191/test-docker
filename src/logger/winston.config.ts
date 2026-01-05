import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import * as fs from 'fs';

export const createWinstonConfig = (config: ConfigService) => {
  const appName = config.get<string>('app.name') ?? 'NestApp';

  const logDir = path.resolve(process.cwd(), 'logs');

  console.log(logDir);

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  return {
    level: 'info',
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          nestWinstonModuleUtilities.format.nestLike(appName, {
            prettyPrint: true,
          }),
        ),
      }),

      new winston.transports.File({
        filename: path.join(logDir, 'error.log'),
        level: 'error',
      }),

      new winston.transports.File({
        filename: path.join(logDir, 'combined.log'),
      }),
    ],
  };
};
