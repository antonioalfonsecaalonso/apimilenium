/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { TallasModule } from './tallas/tallas.module';
import { ColorModule } from './color/color.module';
import { TipoModule } from './tipo/tipo.module';
import { GrupoModule } from './grupo/grupo.module';
import { FamiliaModule } from './familia/familia.module';
import { TemporadaModule } from './temporada/temporada.module';

@Module({
  imports: [
    TallasModule,
    TypeOrmModule.forFeature([
      Product
    ]),
    ColorModule,
    TipoModule,
    GrupoModule,
    FamiliaModule,
    TemporadaModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [
    ProductsService
  ],
})
export class ProductsModule {}
