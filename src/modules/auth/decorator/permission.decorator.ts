import { SetMetadata } from '@nestjs/common';
import { PermissionEnum } from '../../shares/enum/permission.enum';

export const PERMISSION_KEY = 'permissions';
export const Permissions = (...permissions: PermissionEnum[]) =>
  SetMetadata(PERMISSION_KEY, permissions);
