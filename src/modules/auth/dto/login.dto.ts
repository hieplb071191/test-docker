import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Email',
    example: '<EMAIL>',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Password',
    example: '<PASSWORD>',
  })
  password: string;
}
