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
  signIn(@Body() signInDto: CreateUserDto) {
    return this.authService.login(signInDto);
  }
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() signInDto: CreateUserDto) {
    return this.authService.createUser(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('send-otp-to-email')
  sendOtpToEmail(@Body() body: { email: string }) {
    return this.verification.sendCode(body.email);
  }
}
