import { Module } from '@nestjs/common';
import { TallasService } from './tallas.service';
import { TallasController } from './tallas.controller';
import { Talla } from './entities/talla.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Talla])],
  controllers: [TallasController],
  providers: [TallasService],
  exports: [TallasService],
})
export class TallasModule {}
