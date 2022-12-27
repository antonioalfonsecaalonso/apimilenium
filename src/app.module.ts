/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { enviromentConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './app.roles';
import { PaisModule } from './core/pais-provincia-ciudad/pais/pais.module';
import { ProvinciaModule } from './core/pais-provincia-ciudad/provincia/provincia.module';
import { CiudadModule } from './core/pais-provincia-ciudad/ciudad/ciudad.module';
import { InstalacionesModule } from './core/instalaciones/instalaciones.module';
import { DireccionModule } from './core/direccion/direccion.module';
import { ProveedorModule } from './proveedores/proveedor.module';
import { ModeloModule } from './modelo/modelo.module';

// importaciones para las actualizaciones de sap, comentar para produccion

// ------------------------------------------------------------------------

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [enviromentConfiguration],
      validationSchema: JoiValidationSchema,
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      ssl: process.env.STAGE === 'prod' ? true: false,
      extra: {
        ssl: process.env.STAGE === 'prod' 
          ? {
            rejectUnauthorized: false
          }
          : null
      },
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      // cambiar esto en producción.
      synchronize: true,
      entities : {
        
      }
    }),
  
    // ---------------------------------------
    AccessControlModule.forRoles(roles),
    UserModule,
    ProductsModule,
    AuthModule,
    PaisModule,
    ProvinciaModule,
    CiudadModule,
    InstalacionesModule,
    ProveedorModule,
    DireccionModule,
    ModeloModule,
  ],
  controllers: [AppController],
  providers: [
    JwtService,
    AppService,
    // --------------------------------------------------
  ],
})
export class AppModule {

}
