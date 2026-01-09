import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/role.guard';

export function Roles() {
  return applyDecorators(UseGuards(JwtAuthGuard, RolesGuard));
}
