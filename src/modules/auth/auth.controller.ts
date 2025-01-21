import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
}
