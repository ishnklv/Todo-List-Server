import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { routesConfig } from './configs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const logger = new Logger();

  const { port, host } = configService.get('http');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Todo List')
    .setDescription('The Todo List Application API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup(routesConfig.swagger, app, swaggerDocument);

  await app.listen(port, host, () =>
    logger.log(`Server listening on ${host}:${port}`),
  );
}

bootstrap();
