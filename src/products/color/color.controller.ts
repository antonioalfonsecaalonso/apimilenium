/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AppResources } from 'src/app.roles';
import { Auth } from 'src/comon/decorators/auth.decorator';
import { PaginationDto } from 'src/comon/dtos/pagination.dto';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Color } from './entities/color.entity';

@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Post()
  create(@Body() createColorDto: CreateColorDto) {
    return this.colorService.create(createColorDto);
  }

  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResources.COLOR
  })
  @Get('obtener-todos')
  findAll() {
    return this.colorService.findAll();
  }

  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResources.COLOR
  })
  @Get('obtenerColores')
  async findFifty( @Query() paginationDto: PaginationDto) {
    return await this.colorService.findEachoFifteen(paginationDto);
  }


  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResources.COLOR
  })
  @Get('obtener-total-colores')
  obtenerTotalColores() {
    return this.colorService.obtenerTotalColores();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.colorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColorDto: UpdateColorDto) {
    return this.colorService.update(+id, updateColorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.colorService.remove(+id);
  }
}
