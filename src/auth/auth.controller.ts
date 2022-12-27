/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User  } from 'src/comon/decorators/user.decorator';
import { User as UserEntity} from './../user/entities/user.entity';
import { LocalAuthGuard, JwtAuthGuard } from './guards';
import { rolesExport } from 'src/app.roles';


@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
    ) {}

  @UseGuards(
    LocalAuthGuard, 
  )
  @Post('login')
  async login(
    @User() user: UserEntity
  ) {

    const data = await this.authService.login(user);
    return {
      message: 'Login Exitoso',
      data: data
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }


  @Get('obtenerPermisos')
  getPermisos() {
    console.log(rolesExport);
    return rolesExport;
  }
}
