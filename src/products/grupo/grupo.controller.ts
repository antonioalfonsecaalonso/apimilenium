/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GrupoService } from './grupo.service';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { Auth } from 'src/comon/decorators/auth.decorator';
import { AppResources } from 'src/app.roles';
import { PaginationDto } from 'src/comon/dtos/pagination.dto';

@Controller('grupo')
export class GrupoController {
  constructor(private readonly grupoService: GrupoService) {}

  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResources.GRUPO
  })
  @Get('obtener-total-grupos')
  obtenerTotalGrupos() {
    return this.grupoService.obtenerTotalGrupos();
  }

  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResources.GRUPO
  })
  @Get('obtenerGrupos')
  async findFifty( @Query() paginationDto: PaginationDto) {
    return await this.grupoService.findEachoFifteen(paginationDto);
  }

  // @Post()
  // create(@Body() createGrupoDto: CreateGrupoDto) {
  //   return this.grupoService.create(createGrupoDto);
  // }

  // @Get()
  // findAll() {
  //   return this.grupoService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.grupoService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGrupoDto: UpdateGrupoDto) {
  //   return this.grupoService.update(+id, updateGrupoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.grupoService.remove(+id);
  // }
}
