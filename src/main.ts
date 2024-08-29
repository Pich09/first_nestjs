import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /* Use useGlobalPipes to make the whole app know that we using pip in dto */
  /* Use whitelist to make the console shows only the part which a part of dto that we defined in this app not in postman */
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  await app.listen(3333);
}
bootstrap();
