import { config } from 'dotenv'


config()

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

console.log("NEST TYPE:", typeof process.env.DATABASE_URL);
console.log("NEST VALUE:", process.env.DATABASE_URL);

async function bootstrap() {
  console.log('DATABASE_URL:', process.env.DATABASE_URL);
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Instant Wellness Kit API')
    .setDescription('The Instant Wellness Kit API description')
    .setVersion('1.0')
    .addTag('roles')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(4200);
}
bootstrap();