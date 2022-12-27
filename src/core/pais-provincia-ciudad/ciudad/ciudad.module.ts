/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CiudadController } from './ciudad.controller';
import { Ciudad } from './entities/ciudad.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Direccion } from 'src/core/direccion/entities/direccion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Direccion,
    Ciudad
  ])
  ],
  controllers: [CiudadController],
  providers: [CiudadService],
  exports: [
    CiudadService]
})
export class CiudadModule {}
