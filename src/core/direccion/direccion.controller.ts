/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResources } from 'src/app.roles';
import { Auth } from 'src/comon/decorators/auth.decorator';
import { PaginationDto } from 'src/comon/dtos/pagination.dto';
import { DireccionService } from './direccion.service';
import { CreateDireccionDto } from './dto/create-direccion.dto';

@ApiTags('DIRECCION.')
@Controller('direccion')
export class DireccionController {
  constructor(private readonly direccionService: DireccionService) {}

  @Post('crearNueva')
  async create(@Body() createDireccionDto: CreateDireccionDto) {

    return this.direccionService.createOne(createDireccionDto);

  }

  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResources.DIRECCION
  })
  @Get('obtener-total-direcciones')
  obtenerTotalFamilias() {
    return this.direccionService.obtenerTotalDirecciones();
  }

  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResources.DIRECCION
  })
  @Get('obtenerDireccionesProveedores')
  async findEachoFifteenProveedor( @Query() paginationDto: PaginationDto) {
    return await this.direccionService.findEachoFifteenProveedor(paginationDto);
  }

}
