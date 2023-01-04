import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import process from 'process';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Easy scraper api')
    .setDescription('Next generation scrapping tool')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  );
  const { PORT = 4000 } = process.env;
  await app.listen(PORT);

  Logger.log(
    `Server is listening on port: ${PORT} pid: ${process.pid}`
  );
}

bootstrap();
