/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProvinciaService } from './provincia.service';
import { ProvinciaController } from './provincia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provincia } from './entities/provincia.entity';
import { CiudadService } from '../ciudad/ciudad.service';
import { Ciudad } from '../ciudad/entities/ciudad.entity';
import { Proveedor } from 'src/proveedores/entities/proveedor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Provincia,
    Ciudad,
    Proveedor
  ])
  ],
  controllers: [ProvinciaController],
  providers: [
    ProvinciaService,
    CiudadService
  ],
  exports: [
    ProvinciaService,
    CiudadService
  ],
})
export class ProvinciaModule {}
