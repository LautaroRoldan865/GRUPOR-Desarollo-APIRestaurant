import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//corre la aplicacion usuarios
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
