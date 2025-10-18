import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middleware para CORS
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, Accept',
    );

    if (req.method === 'OPTIONS') {
      res.status(200).send();
      return;
    }
    next();
  });

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
