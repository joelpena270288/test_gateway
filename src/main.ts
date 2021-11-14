import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Api Gateway')
    .setDescription('Api for practical test of Musala Soft')
    .setVersion('1.0')
    .addTag('gateway')
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //app.setGlobalPrefix('api');
  await app.listen(AppModule.port);
}
bootstrap();
