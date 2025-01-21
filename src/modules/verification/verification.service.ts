import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Verification } from './entities/verification.schema';
import { InjectModel } from '@nestjs/mongoose';
import { MailerService } from '@nestjs-modules/mailer';
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
      subject: 'Email Verification',
      text: `Your verification code is: ${code}`,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f9;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
    }
    .email-header {
      background: #007bff;
      color: #fff;
      padding: 20px;
      text-align: center;
    }
    .email-header h1 {
      margin: 0;
      font-size: 1.8rem;
    }
    .email-body {
      padding: 20px;
    }
    .email-body p {
      line-height: 1.6;
      margin: 0 0 10px;
    }
    .code {
      display: inline-block;
      background: #f4f4f9;
      border: 1px solid #007bff;
      color: #007bff;
      font-weight: bold;
      padding: 10px 20px;
      border-radius: 4px;
      margin: 20px 0;
    }
    .email-footer {
      background: #f9f9f9;
      padding: 10px;
      text-align: center;
      font-size: 0.9rem;
      color: #666;
      border-top: 1px solid #ddd;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Jobs Live - Email Verification</h1>
    </div>
    <div class="email-body">
      <p>Dear User,</p>
      <p>Thank you for signing up with <strong>Jobs Live</strong>. To complete your registration, please verify your email by using the code below:</p>
      <p class="code">${code}</p>
      <p>This code is valid for <strong>60 minutes</strong>. Please do not share this code with anyone for your account's security.</p>
      <p>If you did not request this email, please ignore it.</p>
    </div>
    <div class="email-footer">
      <p>&copy; 2025 Jobs Live. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`,
    });

    const verification = new this.verificationModel({
      email,
      code: Math.floor(100000 + Math.random() * 900000),
      expired: new Date(Date.now() + 60000),
    });
    await verification.save();
    return verification;
  }
}
