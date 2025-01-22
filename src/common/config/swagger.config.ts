import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  APP_DESCRIPTION,
  APP_NAME,
  SWAGGER_ENDPOINT,
} from '../constants/app_constants';

export const createSwagger = (app: NestExpressApplication<any>) => {
  const config = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription(APP_DESCRIPTION)
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_ENDPOINT, app, documentFactory);
};
