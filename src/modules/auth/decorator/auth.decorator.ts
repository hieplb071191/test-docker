import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guard/auth.guard';

export function Auth() {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
  );
}
