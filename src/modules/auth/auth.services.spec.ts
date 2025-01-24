import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';
import { VerificationService } from '../verification/verification.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { BadRequestException } from '@nestjs/common';

const mockUsersService = {
  findByEmail: jest.fn(),
  create: jest.fn(),
  validateUser: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn().mockReturnValue('mockJwtToken'),
};

const mockI18nService = {
  t: jest.fn().mockReturnValue('register success'),
};

const mockVerificationService = {
  verifyCode: jest.fn(),
  deletedAllWithEmail: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: I18nService, useValue: mockI18nService },
        { provide: VerificationService, useValue: mockVerificationService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password123',
        code: '123456',
        name: 'test',
        role: 'user',
      };

      mockUsersService.findByEmail.mockResolvedValue(null);
      mockUsersService.create.mockResolvedValue({
        ...createUserDto,
        _id: 'mockUserId',
        role: 'user',
      });

      const result = await service.createUser(createUserDto);

      expect(result).toEqual({
        message: 'register success',
        result: {
          access_token: 'mockJwtToken',
          user: {
            _id: 'mockUserId',
            code: '123456',
            email: 'test@example.com',
            name: 'test',
            role: 'user',
          },
        },
      });
    });

    it('should throw BadRequestException if email already exists', async () => {
      const createUserDto: CreateUserDto = {
        email: 'exist@email.com',
        password: 'password123',
        code: '123456',
        name: 'test',
        role: 'user',
      };

      mockUsersService.findByEmail.mockResolvedValue(createUserDto);

      await expect(service.createUser(createUserDto)).rejects.toThrow(
        new BadRequestException('email already exist'),
      );
    });

    it('should throw BadRequestException if verification fails', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password123',
        code: '123456',
        name: 'test',
        role: 'user',
      };

      process.env.VALIDATE_EMAIL = 'true';
      mockUsersService.findByEmail.mockResolvedValue(null);
      mockVerificationService.verifyCode.mockRejectedValue(
        new Error('Invalid code'),
      );

      await expect(service.createUser(createUserDto)).rejects.toThrow(
        new BadRequestException('Invalid code'),
      );
    });
  });
});
