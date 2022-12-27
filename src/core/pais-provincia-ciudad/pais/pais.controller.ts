/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, Param, Query } from '@nestjs/common';
import { AppResources } from 'src/app.roles';
import { Auth } from 'src/comon/decorators/auth.decorator';
import { PaginationDto } from 'src/comon/dtos/pagination.dto';
import { PaisService } from './pais.service';

@Controller('pais')
export class PaisController {
  constructor(private readonly paisService: PaisService) {}


  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResources.PAIS
  })
  @Get('obtenerPaises')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.paisService.findAll(paginationDto);
  }

  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResources.PAIS
  })
  @Get('obtenerTotalPaises')
  ContarPaises() {
    return this.paisService.totalPaises();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return 0;
  }


  
}
