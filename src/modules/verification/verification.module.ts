import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Verification,
  VerificationSchema,
} from './entities/verification.schema';
import { VerificationService } from './verification.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Verification.name,
        schema: VerificationSchema,
      },
    ]),

    MailerModule.forRootAsync({
      useFactory: async (configServices: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: configServices.get('MAIL_USER'),
            pass: configServices.get('MAIL_PASS'),
          },
        },
        template: {
          dir: 'src/mail/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [VerificationService],
  exports: [VerificationService],
})
export class VerificationModule {}
