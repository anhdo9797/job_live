import { MailerService } from '@nestjs-modules/mailer';
import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Verification } from './entities/verification.schema';
import {
  MAIL_TEMPLATE_PATH,
  SUBJECT_MAIL_VERIFICATION,
} from 'src/common/constants/app_constants';
import { I18nService } from 'nestjs-i18n';
@Injectable()
export class VerificationService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly i18nService: I18nService,
    @InjectModel(Verification.name)
    private verificationModel: Model<Verification>,
  ) {}

  async sendCode(email: string) {
    const code = Math.floor(100000 + Math.random() * 900000);

    await this.mailerService.sendMail({
      to: email,
      from: '"Jobs Live" <your-email@gmail.com>',
      subject: SUBJECT_MAIL_VERIFICATION,
      template: MAIL_TEMPLATE_PATH,
      context: { email, code },
    });

    const verification = new this.verificationModel({
      email,
      code,
      expired: new Date(Date.now() + 5000),
    });
    await verification.save();

    return { message: `Otp send success to mail ${email}` };
  }

  async verifyCode(email: string, code: string) {
    const verification = await this.verificationModel.findOne({ email });

    if (!verification) {
      throw new NotFoundException(this.i18nService.t('messages.OTP_NOT_FOUND'));
    }

    if (verification.code !== code) {
      throw new BadGatewayException(this.i18nService.t('messages.OTP_INVALID'));
    }

    if (verification.expired < new Date()) {
      throw new BadGatewayException(this.i18nService.t('messages.OTP_EXPIRED'));
    }

    return verification;
  }
}
