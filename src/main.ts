import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });

  // ✅ Configuração de CORS explícita
  app.enableCors({
    origin: [
      'http://localhost:3000', // front local
      'https://agenda-pro-topaz.vercel.app', // front em produção (Vercel)
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('AgendaPro Document')
      .setDescription('Documentação do SaaS de agendamento')
      .setVersion('0.5')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`✅ Backend rodando na porta: ${port}`);
}

bootstrap();
