import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { EnterpriseDto } from '../enterprises/dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from '../enterprises/dto/update-enterprise.dto';
import { EnterprisesService } from '../enterprises/enterprises.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly enterprisesService: EnterprisesService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new Error('Email not found');
    }

    const isPasswordMatching = await this.comparePasswords(
      password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new Error('Invalid password');
    }

    return user.toObject();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email });
  }
  async findById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.hashPassword(createUserDto.password);

    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    const newUser = await createdUser.save();
    const json = newUser.toJSON();
    return json;
  }

  async handleProfile(
    user: User,
    data: EnterpriseDto | UpdateEnterpriseDto,
  ): Promise<any> {
    try {
      if (user.role === 'enterprise') {
        return this.enterprisesService.handleProfile(user, data);
      }
      return null;
    } catch (error) {
      console.error(
        '🚀 ~ file: users.service.ts ~ line 64 ~ UsersService ~ handleProfile ~ error',
        error,
      );
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
