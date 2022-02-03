import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configApi = new DocumentBuilder().setTitle('API News from HackerRoom').setDescription('API News from HackerRoom').setVersion('1.0').addTag('news').build();

  const document = SwaggerModule.createDocument(app, configApi);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
