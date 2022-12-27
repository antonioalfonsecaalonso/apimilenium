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
import { TipoService } from './tipo.service';
import { CreateTipoDto } from './dto/create-tipo.dto';
import { UpdateTipoDto } from './dto/update-tipo.dto';
import { Auth } from 'src/comon/decorators/auth.decorator';
import { AppResources } from 'src/app.roles';
import { PaginationDto } from 'src/comon/dtos/pagination.dto';

@Controller('tipo')
export class TipoController {
  constructor(private readonly tipoService: TipoService) {}

  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResources.TIPO,
  })
  @Get('obtener-total-tipos')
  obtenerTotalColores() {
    return this.tipoService.obtenerTotalTipos();
  }

  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResources.TIPO,
  })
  @Get('obtenerTipos')
  async findFifty(@Query() paginationDto: PaginationDto) {
    return await this.tipoService.findEachoFifteen(paginationDto);
  }

  // @Post()
  // create(@Body() createTipoDto: CreateTipoDto) {
  //   return this.tipoService.create(createTipoDto);
  // }

  // @Get()
  // findAll() {
  //   return this.tipoService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.tipoService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTipoDto: UpdateTipoDto) {
  //   return this.tipoService.update(+id, updateTipoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tipoService.remove(+id);
  // }
}
