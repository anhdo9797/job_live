import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { Auth } from './entities/auth.entity';
import { VerificationService } from '../verification/verification.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private verificationService: VerificationService,
  ) {}

  async login(loginDto: LoginUserDto) {
    try {
      const hasUser = await this.usersService.validateUser(
        loginDto.email,
        loginDto.password,
      );
      if (!hasUser) {
        throw new BadRequestException('Invalid email or password');
      }
      return {
        access_token: this.jwtService.sign({
          email: hasUser.email,
          id: hasUser._id,
        }),
        user: {
          ...hasUser,
          password: undefined,
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

  async createUser(user: CreateUserDto): Promise<Auth> {
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
        access_token: this.jwtService.sign({
          email: newUser.email,
          id: newUser._id,
        }),

        user: {
          ...newUser,
          password: undefined,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
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
