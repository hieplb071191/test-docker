import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createNewRole(body: CreateRoleDto) {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.prisma.$transaction(async (tx) => {
        const role = await tx.role.create({
          data: {
            name: body.name,
            description: body.description,
          },
        });
        if (role) {
          const listPermission = await tx.permission.findMany({
            where: {
              name: {
                in: body.permissions,
              },
            },
          });
          const updateRole = await tx.role.update({
            where: {
              id: role.id,
            },
            data: {
              permissions: {
                set: listPermission.map((p) => ({ id: p.id })),
              },
            },
          });

          return updateRole;
        }
      });
    } catch (error: any) {
      throw new BadRequestException({
        status: 400,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        message: error.message,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data: error,
      });
    }
  }
}
