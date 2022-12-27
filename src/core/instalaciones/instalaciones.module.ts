/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { InstalacionesService } from './instalaciones.service';
import { InstalacionesController } from './instalaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instalaciones } from './entities/instalaciones.entity';
import { Pais } from '../pais-provincia-ciudad/pais/entities/pais.entity';
import { Provincia } from '../pais-provincia-ciudad/provincia/entities/provincia.entity';
import { Ciudad } from '../pais-provincia-ciudad/ciudad/entities/ciudad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Instalaciones,
    Pais,
    Provincia,
    Ciudad
  ])],
  controllers: [InstalacionesController],
  providers: [InstalacionesService],
})
export class InstalacionesModule {}
