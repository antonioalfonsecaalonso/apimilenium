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
import { TallasService } from './tallas.service';
import { CreateTallaDto } from './dto/create-talla.dto';
import { UpdateTallaDto } from './dto/update-talla.dto';
import { Auth } from 'src/comon/decorators/auth.decorator';
import { AppResources } from 'src/app.roles';
import { PaginationDto } from 'src/comon/dtos/pagination.dto';

@Controller('talla')
export class TallasController {
  constructor(
    private readonly tallaService: TallasService
    ) {}

  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResources.TALLA
  })
  @Get('obtener-total-tallas')
  obtenerTotalTallas() {
    return this.tallaService.obtenerTotalTallas();
  }

  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResources.TALLA
  })
  @Get('obtenerTallas')
  async findFifty( @Query() paginationDto: PaginationDto) {
    return await this.tallaService.findEachoFifteen(paginationDto);
  }

  // @Post()
  // create(@Body() createTallaDto: CreateTallaDto) {
  //   return this.tallasService.create(createTallaDto);
  // }

  // @Get('obtener-todas')
  // findAll() {
  //   return 'ok';
  //   return this.tallasService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.tallasService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTallaDto: UpdateTallaDto) {
  //   return this.tallasService.update(+id, updateTallaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tallasService.remove(+id);
  // }
}
