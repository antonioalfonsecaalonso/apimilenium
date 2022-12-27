/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ModeloService } from './modelo.service';
import { ModeloController } from './modelo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Talla } from '../products/tallas/entities/talla.entity';
import { TallasService } from '../products/tallas/tallas.service';
import { ProveedorService } from 'src/proveedores/proveedor.service';
import { UserService } from '../user/user.service';
import { User } from 'src/user/entities/user.entity';
import { Pais } from 'src/core/pais-provincia-ciudad/pais/entities/pais.entity';
import { Ciudad } from 'src/core/pais-provincia-ciudad/ciudad/entities/ciudad.entity';
import { Provincia } from 'src/core/pais-provincia-ciudad/provincia/entities/provincia.entity';
import { DireccionService } from 'src/core/direccion/direccion.service';
import { Direccion } from 'src/core/direccion/entities/direccion.entity';
import { PaisService } from '../core/pais-provincia-ciudad/pais/pais.service';
import { ProvinciaService } from '../core/pais-provincia-ciudad/provincia/provincia.service';
import { CiudadService } from '../core/pais-provincia-ciudad/ciudad/ciudad.service';
import { Proveedor } from 'src/proveedores/entities/proveedor.entity';
import { Familia } from '../products/familia/entities/familia.entity';
import { FamiliaService } from '../products/familia/familia.service';
import { Color } from '../products/color/entities/color.entity';
import { ColorService } from '../products/color/color.service';
import { TemporadaService } from '../products/temporada/temporada.service';
import { Temporada } from '../products/temporada/entities/temporada.entity';
import { GrupoService } from '../products/grupo/grupo.service';
import { Grupo } from 'src/products/grupo/entities/grupo.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ 
    Familia,
    Talla, 
    Proveedor,
    User,
    Pais,
    Ciudad,
    Provincia,
    Direccion,
    Color,
    Temporada,
    Grupo
  ])],
  controllers: [ModeloController],
  providers: [
    ModeloService, 
    TallasService,
    UserService,
    PaisService,
    ProvinciaService,
    CiudadService,
    ProveedorService,
    DireccionService,
    FamiliaService,
    ColorService,
    TemporadaService,
    GrupoService
  ],
})
export class ModeloModule {}
