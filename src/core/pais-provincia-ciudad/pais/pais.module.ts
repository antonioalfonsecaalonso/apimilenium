/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PaisService } from './pais.service';
import { PaisController } from './pais.controller';
import { Pais } from './entities/pais.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provincia } from '../provincia/entities/provincia.entity';
import { ProvinciaService } from '../provincia/provincia.service';
import { User } from 'src/user/entities/user.entity';
import { CiudadService } from '../ciudad/ciudad.service';
import { Ciudad } from '../ciudad/entities/ciudad.entity';



@Module({
  imports: [TypeOrmModule.forFeature([
    Pais,
    Provincia,
    User,
    Ciudad
  ])
  ],
  controllers: [PaisController],
  providers: [
    PaisService, 
    ProvinciaService,
    CiudadService
  ],
  exports: [],
})
export class PaisModule {}
