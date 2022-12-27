import { Module } from '@nestjs/common';
import { TemporadaService } from './temporada.service';
import { TemporadaController } from './temporada.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Temporada } from './entities/temporada.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Temporada])],
  controllers: [TemporadaController],
  providers: [TemporadaService],
})
export class TemporadaModule {}
