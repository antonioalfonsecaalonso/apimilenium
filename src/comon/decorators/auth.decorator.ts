/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role, ACGuard, UseRoles } from 'nest-access-control';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

export const Auth = (...roles: Role[]) => {
    
  return applyDecorators(
    UseGuards(JwtAuthGuard, ACGuard),
    UseRoles(...roles),
    ApiBearerAuth()
  )
  
}
