import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PermissionEnum } from '../../shares/enum/permission.enum';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Name',
    example: 'admin',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Description',
    example: 'Admin role',
  })
  description: string;

  @IsArray()
  @IsNotEmpty()
  @IsEnum(PermissionEnum, { each: true })
  @ApiProperty({
    enum: PermissionEnum,
    description: 'Permissions',
  })
  permissions: PermissionEnum[];
}
