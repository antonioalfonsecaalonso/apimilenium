/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FamiliaService } from './familia.service';
import { FamiliaController } from './familia.controller';
import { Familia } from './entities/familia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Familia
    ]),
  ],
  controllers: [FamiliaController],
  providers: [FamiliaService]
})
export class FamiliaModule {}
