/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DireccionService } from './direccion.service';
import { DireccionController } from './direccion.controller';
import { Direccion } from './entities/direccion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provincia } from '../pais-provincia-ciudad/provincia/entities/provincia.entity';
import { User } from 'src/user/entities/user.entity';
import { Pais } from '../pais-provincia-ciudad/pais/entities/pais.entity';
import { Ciudad } from '../pais-provincia-ciudad/ciudad/entities/ciudad.entity';
import { Proveedor } from 'src/proveedores/entities/proveedor.entity';
import { PaisService } from '../pais-provincia-ciudad/pais/pais.service';
import { ProvinciaService } from '../pais-provincia-ciudad/provincia/provincia.service';
import { CiudadService } from '../pais-provincia-ciudad/ciudad/ciudad.service';


@Module({
  imports: [TypeOrmModule.forFeature([
    Proveedor,
    Ciudad,
    Pais,
    Provincia,
    User,
    Direccion
  ])
  ],
  controllers: [DireccionController],
  providers: [
    DireccionService,
    PaisService,
    ProvinciaService,
    ProvinciaService,
    CiudadService
  ]
})
export class DireccionModule {}
