import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('pizza-api');

  const configService = app.get(ConfigService);
  const serviceName = configService.get<string>('npm_package_name');
  const serviceVersion = configService.get<string>('npm_package_version');
  const servicePort = configService.get<number>('PORT');

  /**
   * Enable validations
   */
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableCors();

  /**
   * Swagger documentation config
   */
  const options = new DocumentBuilder()
    .setTitle(serviceName)
    .setDescription('Pizza API documentation')
    .setVersion(serviceVersion)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${serviceName}/swagger`, app, document);

  await app.listen(servicePort || 80);
}
bootstrap();
