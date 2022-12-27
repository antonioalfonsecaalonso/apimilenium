import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResources } from 'src/app.roles';
import { Auth } from 'src/comon/decorators/auth.decorator';
import { PaginationDto } from 'src/comon/dtos/pagination.dto';
import { ProvinciaService } from './provincia.service';

@Controller('provincias')
@ApiTags('Provincias.')
export class ProvinciaController {
  constructor(private readonly provinciaService: ProvinciaService) {}

  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResources.PROVINCIA,
  })
  @Get('obtenerProvincias')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.provinciaService.findAll(paginationDto);
  }

  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResources.PROVINCIA,
  })
  @Get('obtenerTotalProvincias')
  obtenerTotalProvincias() {
    return this.provinciaService.obtenerTotalProvincias();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.provinciaService.findOne(+id);
  }
}
