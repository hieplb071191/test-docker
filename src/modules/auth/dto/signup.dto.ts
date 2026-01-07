import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { faker } from '@faker-js/faker';

export class SignupDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'Email',
    example: faker.internet.email(),
  })
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty({
    type: String,
    description: 'Password',
    example: faker.internet.password({ length: 10 }),
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Name',
    example: faker.word.adjective({ length: 10 }),
  })
  name: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiPropertyOptional({
    type: Date,
    description: 'Date of birth',
    required: false,
    example: new Date('2000-01-01').toISOString(),
  })
  dateOfBirth: Date;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    description: 'Avatar',
    required: false,
  })
  avatar: string;
}
