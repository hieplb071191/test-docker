import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly config: ConfigService) {
    const databaseUrl = config.get<string>('db.url');

    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not defined');
    }

    const pool = new Pool({
      connectionString: databaseUrl,
    });

    const adapter = new PrismaPg(pool);

    super({
      adapter,
    });
  }
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks() {
    await this.$disconnect();
  }
}
