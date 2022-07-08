import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getIPAdress } from './common/utils/os';
import { Log4jsService } from '@quickts/nestjs-log4js';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { knife4jSetup } from 'nest-knife4j2';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import config from './config';

const chalk = require('chalk');
declare const module: any;
async function bootstrap() {
  const logger = new Log4jsService();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger,
    cors: true,
  });
  if (config.swagger.enable) {
    const options = new DocumentBuilder()
      .setTitle(config.swagger.title)
      .setDescription(config.swagger.description)
      .setVersion(config.swagger.version)
      .addBasicAuth()
      .addBearerAuth()
      .addCookieAuth()
      .addApiKey()
      .addSecurityRequirements('bearer')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(config.swagger.url, app, document, {
      swaggerOptions: config.swagger.swaggerOptions,
    });
    knife4jSetup(app, {
      urls: [
        {
          name: config.swagger.title,
          url: `/swagger-json`,
          swaggerVersion: '3.0',
          location: `/api-json`,
        },
      ],
    });
  }
  app.useGlobalInterceptors(
    new TimeoutInterceptor(),
    new TransformInterceptor(),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  // 支持 CORS
  app.enableCors({
    origin: config.cors.origins,
    credentials: true,
  });

  await app.listen(config.server.port);
  // 热重载
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  console.log(chalk.green(`App running at:`));
  console.log(
    `     - Local:   ${chalk.cyan(`http://localhost:${config.server.port}/`)}`,
  );
  console.log(
    `     - Network: ${chalk.cyan(
      `http://${getIPAdress()}:${config.server.port}/`,
    )}`,
  );
  console.log(chalk.green(`Docs at:`));
  console.log(
    `     - Local:   ${chalk.cyan(
      `http://localhost:${config.server.port}/doc.html`,
    )}`,
  );
  console.log(
    `     - Network: ${chalk.cyan(
      `http://${getIPAdress()}:${config.server.port}/doc.html`,
    )}`,
  );
}
bootstrap();
