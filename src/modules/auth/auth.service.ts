import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';
import { UserTypeResponse as AuthResponseType } from 'src/common/types/auth.types';
import { ResultResponse } from 'src/common/types/response';
import { CreateUserDto, LoginUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.schema';
import { UsersService } from '../users/users.service';
import { VerificationService } from '../verification/verification.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private verificationService: VerificationService,
    private i18nService: I18nService,
  ) {}

  async login(
    loginDto: LoginUserDto,
  ): Promise<ResultResponse<AuthResponseType>> {
    try {
      const hasUser = await this.usersService.validateUser(
        loginDto.email,
        loginDto.password,
      );
      if (!hasUser) {
        throw new BadRequestException('Invalid email or password');
      }

      return {
        message: this.i18nService.t('messages.LOGIN_SUCCESS'),
        result: {
          access_token: this.generateToken(hasUser),
          user: {
            ...hasUser,
            password: undefined,
          },
        },
      };
    } catch (error) {
      console.error(
        '🚀 ~ file: auth.service.ts ~ line 41 ~ AuthService ~ login ~ error',
        error,
      );

      throw new BadRequestException(error.message);
    }
  }

  async createUser(
    user: CreateUserDto,
  ): Promise<ResultResponse<AuthResponseType>> {
    try {
      const { email } = user;
      const isEmailExist = await this.usersService.findByEmail(email);
      if (isEmailExist) {
        throw new BadRequestException('email already exist');
      }

      await this.verificationService.verifyCode(email, user.code);
      const newUser = await this.usersService.create(user);
      await this.verificationService.deletedAllWithEmail(email);

      return {
        message: this.i18nService.t('messages.REGISTER_SUCCESS'),
        result: {
          access_token: this.generateToken(newUser),
          user: {
            ...newUser,
            password: undefined,
          },
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  generateToken(user: User): string {
    return this.jwtService.sign({
      email: user.email,
      _id: user._id,
      role: user.role,
    });
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
