/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TipoService } from './tipo.service';
import { TipoController } from './tipo.controller';
import { Tipo } from './entities/tipo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Tipo
    ]),
    TipoModule,
  ],
  controllers: [TipoController],
  providers: [TipoService],
})
export class TipoModule {}
