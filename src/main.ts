import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const ALLOWED_ORIGINS = ['http://localhost:3000/'];

  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('AgendaPRo Document')
      .setDescription('Documentaçao do Saas de agendamento')
      .setVersion('0.5')
      .build();

    const documentSwagger = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, documentSwagger);
  }

  const port = process.env.PORT ?? 3000;

  app.enableCors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'X-CSRF-Token',
    ],
    exposedHeaders: ['Set-Cookie'],
    maxAge: 86400,
    optionsSuccessStatus: 204,
  });

  await app.listen(port);
  console.log(`Ouvindo na porta: ${port}`);
}
bootstrap();
