/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // puesto de escucha para el servidor.
  app.setGlobalPrefix('apiMilenium');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );


  const configSwager = new DocumentBuilder()
    .setTitle('Milenium API')
    .setDescription('Api de Milenium Modas.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, configSwager);
  SwaggerModule.setup('api', app, document);

  //cambiar para produccions
  app.enableCors({
    origin: [
      'http://localhost:4200',
    ],
    credentials: true,
  });
  
  await app.listen(parseInt(process.env.PORT) || 3000);
  console.log(`Servidor corriendo en puerto ${process.env.PORT}.`);
}
bootstrap();

