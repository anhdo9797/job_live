import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { APP_PREFIX } from './common/constants/app_constants';
import { logSuccess } from './common/utils/logger';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { createSwagger } from './common/config/swagger.config';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ErrorsInterceptor } from './common/interceptors/errors.interceptor';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // set up the view engine
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  // validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      enableDebugMessages: true,
      skipNullProperties: true, // <- This line here
    }),
  );

  // set global prefix
  app.setGlobalPrefix(APP_PREFIX, { exclude: ['/'] });

  // i18n
  app.useGlobalPipes(new I18nValidationPipe({}));
  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      detailedErrors: false,
    }),
  );

  createSwagger(app);

  // interceptor
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalInterceptors(new ErrorsInterceptor());

  // get port env
  const config = app.get(ConfigService);
  const port = config.get<number>('PORT');
  await app.listen(port ?? 3000);
  logSuccess(`Server is running on: http://localhost:${port}`);

  // setup hot module replacement
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
