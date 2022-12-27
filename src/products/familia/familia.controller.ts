/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FamiliaService } from './familia.service';
import { CreateFamiliaDto } from './dto/create-familia.dto';
import { UpdateFamiliaDto } from './dto/update-familia.dto';
import { Auth } from 'src/comon/decorators/auth.decorator';
import { AppResources } from 'src/app.roles';
import { PaginationDto } from 'src/comon/dtos/pagination.dto';

@Controller('familia')
export class FamiliaController {
  constructor(private readonly familiaService: FamiliaService) {}

  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResources.FAMILIA
  })
  @Get('obtener-total-familias')
  obtenerTotalFamilias() {
    return this.familiaService.obtenerTotalFamilias();
  }

  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResources.FAMILIA
  })
  @Get('obtenerFamilias')
  async findFifty( @Query() paginationDto: PaginationDto) {
    return await this.familiaService.findEachoFifteen(paginationDto);
  }

  // @Post()
  // create(@Body() createFamiliaDto: CreateFamiliaDto) {
  //   return this.familiaService.create(createFamiliaDto);
  // }

  // @Get()
  // findAll() {
  //   return this.familiaService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.familiaService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFamiliaDto: UpdateFamiliaDto) {
  //   return this.familiaService.update(+id, updateFamiliaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.familiaService.remove(+id);
  // }
}
