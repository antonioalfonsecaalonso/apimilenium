/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProveedorController } from './proveedor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pais } from '../core/pais-provincia-ciudad/pais/entities/pais.entity';
import { Provincia } from '../core/pais-provincia-ciudad/provincia/entities/provincia.entity';
import { Ciudad } from 'src/core/pais-provincia-ciudad/ciudad/entities/ciudad.entity';
import { Proveedor } from './entities/proveedor.entity';
import { ProveedorService } from './proveedor.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from '../user/user.service';
import { DireccionService } from '../core/direccion/direccion.service';
import { Direccion } from '../core/direccion/entities/direccion.entity';
import { PaisService } from '../core/pais-provincia-ciudad/pais/pais.service';
import { ProvinciaService } from '../core/pais-provincia-ciudad/provincia/provincia.service';
import { CiudadService } from 'src/core/pais-provincia-ciudad/ciudad/ciudad.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    Pais,
    Provincia,
    Ciudad,
    Proveedor,
    User,
    Direccion
  ])
  ],
  controllers: [ProveedorController],
  providers: [
    UserService,
    DireccionService,
    ProveedorService,
    PaisService,
    ProvinciaService,
    CiudadService,
  ]
})
export class ProveedorModule {}
