import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000', // teu front local
      'https://agenda-pro-topaz.vercel.app', // domínio do front no Vercel
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // 📄 Swagger (somente fora de produção)
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
  console.log(
    `📘 Swagger disponível em: http://localhost:${port}/docs (modo dev)`,
  );
}

bootstrap();
