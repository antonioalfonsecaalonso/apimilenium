import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Pais } from '../core/pais-provincia-ciudad/pais/entities/pais.entity';
import { Provincia } from '../core/pais-provincia-ciudad/provincia/entities/provincia.entity';
import { Ciudad } from '../core/pais-provincia-ciudad/ciudad/entities/ciudad.entity';
import { Temporada } from '../products/temporada/entities/temporada.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Pais, Provincia, Ciudad, Temporada]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
