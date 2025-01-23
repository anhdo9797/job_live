import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto } from '../users/dto/create-user.dto';
import { VerificationService } from '../verification/verification.service';
import { AuthService } from './auth.service';
import { SendEmailDto, VerifyEmailDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly verification: VerificationService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('send-otp')
  sendOtpToEmail(@Body() body: SendEmailDto) {
    return this.verification.sendCode(body.email);
  }

  @HttpCode(HttpStatus.OK)
  @Post('verify-otp')
  verifyOtp(@Body() body: VerifyEmailDto) {
    return this.verification.verifyCode(body.email, body.code);
  }

  @ApiOperation({
    summary:
      'Register new user (or enterprise) with email authentication first',
    description: 'Requires email authentication',
    externalDocs: {
      url: '#/Auth/AuthController_sendOtpToEmail',
      description: 'Send otp to email',
    },
  })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() signInDto: CreateUserDto) {
    return this.authService.createUser(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() logInDto: LoginUserDto) {
    return this.authService.login(logInDto);
  }
}
