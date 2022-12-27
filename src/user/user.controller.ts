/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/comon/dtos/pagination.dto';
import { AppResources, roles } from '../app.roles';
import { Auth } from 'src/comon/decorators/auth.decorator';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { User } from 'src/comon/decorators/user.decorator';
import { User as UserEntity } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('Control de usuarios.')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder
    ) {}

  // @Auth({
  //   possession: 'any',
  //   action: 'create',
  //   resource: AppResources.USER
  // })
  @Post("createOne")
  create(@Body() createUserDto: CreateUserDto): any {
    return this.userService.create(createUserDto);
  }
  

  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResources.USER
  })
  @Get('obtenerNumeroDeUsuarios')
  async countUsers(@Req() request: Request){
    return await this.userService.countUsers();
  }
  
  // en este caso el dto proviene desde la barra de direcciones ?limit=1&offSet=2
  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResources.USER
  })
  @Get('obtenerActualizacion')
  async findAll( @Query() paginationDto: PaginationDto) {
    return await this.userService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') tern: {login: string, password: string}) {
    return this.userService.findOne(tern);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto,
    @User() user: UserEntity
  ) {

    let data: any;

    if(this.rolesBuilder.can(user.roles).updateAny(AppResources.USER).granted){
      // aqui fabricamos un update para cuando el que accede tiene permisos
      data = this.userService.update(+id, updateUserDto);

    }else {
      // aqui daremos un metodo para que solo pueda modificar su usuario
      const {roles, ...rest} = updateUserDto;
      data = this.userService.editOne(id, rest);
    }

    return {
      message: 'Usuario editado',
      data
    }

  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
