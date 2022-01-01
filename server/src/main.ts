import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrismaRepo } from './repositories/prisma.repo';
import { AppModule } from './app.module';
import { appConfig } from '../config/config';
import { NestApplicationOptions } from '@nestjs/common';

async function bootstrap() {
  const options: NestApplicationOptions = {
    bodyParser: false,        
  }

  const app = await NestFactory.create(AppModule, options);

  const config = new DocumentBuilder()
    .setTitle('Momentum Mod API')
    .setDescription('The Momentum Mod API - Made with 💖')
    .addBearerAuth()
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const prismaDalc: PrismaRepo = app.get(PrismaRepo);
  prismaDalc.enableShutdownHooks(app)

  await app.listen(appConfig.port);
} 
bootstrap();
