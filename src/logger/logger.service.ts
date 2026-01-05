import { Inject, Injectable, Scope } from '@nestjs/common';
import { type LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLoggerService {
  private context?: string;

  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  setContext(context: string) {
    this.context = context;
  }

  log(message: string, meta?: any) {
    this.logger.log(message, { context: this.context, ...meta });
  }

  error(message: string, trace?: string, meta?: any) {
    this.logger.error(message, {
      context: this.context,
      trace,
      ...meta,
    });
  }

  warn(message: string, meta?: any) {
    this.logger.warn(message, { context: this.context, ...meta });
  }
}
