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
import { ApiTags } from '@nestjs/swagger';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { ProveedorService } from './proveedor.service';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';
import { NotFoundException } from '@nestjs/common';
import { Auth } from 'src/comon/decorators/auth.decorator';
import { AppResources } from 'src/app.roles';
import { PaginationDto } from 'src/comon/dtos/pagination.dto';

@Controller('proveedor')
@ApiTags('Control de Proveedor.')
export class ProveedorController {

  constructor(
    private readonly proveedorService: ProveedorService
  ) {}

  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResources.USER
  })
  @Post('create-one')
  async create(@Body() createProveedorDto: CreateProveedorDto) {
    return await this.proveedorService.create(createProveedorDto);
  }

  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResources.USER
  })
  @Get('obtener-numero-proveedores')
  async obtenerNumeroProveedores(): Promise<number | NotFoundException> {
    return this.proveedorService.obtenerNumeroProveedores();
  }
// obtenerProveedores
  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResources.USER
  })
  @Get('obtenerProveedores')
  async findFifty( @Query() paginationDto: PaginationDto) {
    return await this.proveedorService.findEachoFifteen(paginationDto);
  }

  @Auth({
    possession: 'any',
    action: 'read',
    resource: AppResources.USER
  })
  @Get('obtener-proveedores')
  findAll() {
    return this.proveedorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proveedorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProveedorDto: UpdateProveedorDto) {
    return this.proveedorService.update(+id, updateProveedorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proveedorService.remove(+id);
  }
}
