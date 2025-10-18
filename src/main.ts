import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔐 Configuração de CORS — mais robusta
  app.enableCors({
    origin: [
      'http://localhost:3000', // Front local
      'http://localhost:3001', // Front Next.js
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
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
