import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Swagger
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('AgendaPRo Document')
      .setDescription('Documentação do SaaS de agendamento')
      .setVersion('0.5')
      .build();
    const documentSwagger = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentSwagger);
  }

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`✅ Backend rodando na porta: ${port}`);
}
bootstrap();
