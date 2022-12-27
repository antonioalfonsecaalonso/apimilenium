/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TemporadaService } from './temporada.service';
import { CreateTemporadaDto } from './dto/create-temporada.dto';
import { UpdateTemporadaDto } from './dto/update-temporada.dto';
import { Auth } from 'src/comon/decorators/auth.decorator';
import { AppResources } from 'src/app.roles';
import { PaginationDto } from 'src/comon/dtos/pagination.dto';

@Controller('temporada')
export class TemporadaController {
  constructor(
    private readonly temporadaService: TemporadaService
  ) {}

  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResources.TEMPORADA
  })
  @Get('obtener-total-temporada')
  obtenerTotalTemporada() {
    return this.temporadaService.obtenerTotalTemporadas();
  }

  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResources.TEMPORADA
  })
  @Get('obtenerTemporadas')
  async findFifty( @Query() paginationDto: PaginationDto) {
    return await this.temporadaService.findEachoFifteen(paginationDto);
  }

  // @Post()
  // create(@Body() createTemporadaDto: CreateTemporadaDto) {
  //   return this.temporadaService.create(createTemporadaDto);
  // }

  // @Get()
  // findAll() {
  //   return this.temporadaService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.temporadaService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTemporadaDto: UpdateTemporadaDto) {
  //   return this.temporadaService.update(+id, updateTemporadaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.temporadaService.remove(+id);
  // }
}
