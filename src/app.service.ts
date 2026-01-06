import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) {}
  getHello(): any {
    return this.prismaService.user.findMany({
      where: {
        id: '',
      },
    });
  }
}
