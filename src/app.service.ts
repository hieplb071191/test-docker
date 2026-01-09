import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PermissionEnum } from './modules/shares/enum/permission.enum';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private prismaService: PrismaService) {}

  async onModuleInit(): Promise<void> {
    const listPermission = Object.values(PermissionEnum);
    const listPermissionExisted = await this.prismaService.permission.findMany({
      select: {
        name: true,
      },
    });

    const listNotExisted = listPermission.filter(
      (item) =>
        !listPermissionExisted
          .map((permission) => permission.name)
          .includes(item),
    );
    if (listNotExisted.length > 0) {
      await this.prismaService.permission.createMany({
        data: listNotExisted.map((item) => ({ name: item })),
      });
    }
  }
  getHello(): any {
    return this.prismaService.user.findMany({
      where: {
        name: {
          not: null,
        },
      },
    });
  }
}
