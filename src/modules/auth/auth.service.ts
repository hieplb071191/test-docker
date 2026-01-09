import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import * as argon2 from 'argon2';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signupPassword(dto: SignupDto): Promise<any> {
    const oldUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (oldUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await this.hasPassword(dto.password);
    const model = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        name: dto.name,
        dateOfBirth: dto.dateOfBirth,
        avatar: dto.avatar,
      },
      select: { id: true, email: true, name: true, createdAt: true },
    });
    return model;
  }

  async hasPassword(password: string): Promise<string> {
    return argon2.hash(password, {
      type: argon2.argon2id,
      hashLength: 32,
    });
  }

  async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return argon2.verify(hashedPassword, password);
  }

  async verifyUser(body: LoginDto): Promise<Partial<User>> {
    const user = await this.prisma.user.findUnique({
      where: { email: body.email },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        dateOfBirth: true,
        avatar: true,
        isFullPermission: true,
        role: {
          select: { name: true, permissions: { select: { name: true } } },
        },
      },
    });

    if (!user) {
      throw new BadRequestException('Email or password is incorrect');
    }

    const isMatch = await this.verifyPassword(body.password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Email or password is incorrect');
    }

    return user;
  }

  async loginWithPassword(body: LoginDto): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = (await this.verifyUser(body)) as any;
    const accessToken = this.jwtService.sign({
      ...user,
      password: null,
      role: null,
      roles: user.role?.permissions?.map((p) => p.name),
    });

    return {
      accessToken,
    };
  }
}
