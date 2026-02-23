import { config } from 'dotenv'


config()

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

console.log("NEST TYPE:", typeof process.env.DATABASE_URL);
console.log("NEST VALUE:", process.env.DATABASE_URL);

async function bootstrap() {
  console.log('DATABASE_URL:', process.env.DATABASE_URL);
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(4200);
}
bootstrap();
