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
@Injectable()
export class VerificationService {
  constructor(
    private readonly mailerService: MailerService,
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
      throw new NotFoundException('Otp code not found');
    }

    if (verification.code !== code) {
      throw new BadGatewayException('Otp code not match');
    }

    if (verification.expired < new Date()) {
      throw new BadGatewayException('Otp code expired');
    }

    return verification;
  }
}
