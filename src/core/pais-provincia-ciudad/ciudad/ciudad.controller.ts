/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResources } from 'src/app.roles';
import { Auth } from 'src/comon/decorators/auth.decorator';
import { PaginationDto } from 'src/comon/dtos/pagination.dto';
import { CiudadService } from './ciudad.service';

@Controller('ciudad')
@ApiTags('Ciudades.')
export class CiudadController {
  constructor(
    private readonly ciudadService: CiudadService
  ) {}

  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResources.PROVINCIA,
  })
  @Get('obtener-numero-ciuades')
  async obtenerNumeroCiudades(){
    return this.ciudadService.obtenerNumeroCiudades();
  }


  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResources.PROVINCIA,
  })
  @Get('obtener-todas-ciudades')
  async obtenerTopdasCiudades(@Query() paginationDto: PaginationDto){
    return this.ciudadService.obtenerTodasLasCiudades(paginationDto);
  }

}