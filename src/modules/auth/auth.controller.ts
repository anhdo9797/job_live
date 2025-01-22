import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { VerificationService } from '../verification/verification.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly verification: VerificationService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() logInDto: CreateUserDto) {
    return this.authService.login(logInDto);
  }
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() signInDto: CreateUserDto) {
    return this.authService.createUser(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('send-otp')
  sendOtpToEmail(@Body() body: { email: string }) {
    return this.verification.sendCode(body.email);
  }

  @HttpCode(HttpStatus.OK)
  @Post('verify-otp')
  verifyOtp(@Body() body: { email: string; code: string }) {
    return this.verification.verifyCode(body.email, body.code);
  }
}
