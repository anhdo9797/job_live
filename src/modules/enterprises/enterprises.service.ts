import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { I18nService } from 'nestjs-i18n';
import { ResultResponse } from 'src/common/types/response';
import { User } from '../users/entities/user.schema';
import { EnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { Enterprise } from './entities/enterprise.schema';
import { UsersService } from '../users/users.service';
@Injectable({ scope: Scope.REQUEST })
@Injectable()
export class EnterprisesService {
  constructor(
    @InjectModel(Enterprise.name) private enterpriseModel: Model<Enterprise>,
    @Inject(REQUEST) private readonly request: any,
    private i18nService: I18nService,
  ) {}

  async handleProfile(
    user: User,
    data: EnterpriseDto | UpdateEnterpriseDto,
  ): Promise<ResultResponse<Enterprise>> {
    const current = await this.findByCreator(user._id);

    if (current) {
      const result = await this.enterpriseModel.findByIdAndUpdate(
        { _id: current._id },
        {
          $set: {
            ...data,
            updatedAt: Date.now(),
          },
        },
      );

      return {
        message: this.i18nService.t('messages.UPDATE_ENTERPRISE_SUCCESS'),
        result,
      };
    }

    const created = new this.enterpriseModel({
      ...data,
      creator: user._id,
    });
    const result = await created.save();

    return {
      message: this.i18nService.t('messages.CREATED_ENTERPRISE_SUCCESS'),
      result,
    };
  }

  async findByCreator(creator: string): Promise<Enterprise | undefined> {
    try {
      return this.enterpriseModel.findOne({ creator }).exec();
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(
    createEnterpriseDto: EnterpriseDto,
  ): Promise<ResultResponse<Enterprise>> {
    const userId = this.request.user._id;
    const model = new this.enterpriseModel({
      ...createEnterpriseDto,
      createdAt: new Date(),
      userId: this.request.user._id,
    });
    const enterprise = await model.save();

    return {
      message: this.i18nService.t('messages.CREATED_ENTERPRISE_SUCCESS'),
      result: enterprise,
    };
  }

  findAll() {
    return `This action returns all enterprises`;
  }

  findOne(id: number) {
    return `This action returns a #${id} enterprise`;
  }

  update(id: number, updateEnterpriseDto: UpdateEnterpriseDto) {
    return `This action updates a #${id} enterprise`;
  }

  remove(id: number) {
    return `This action removes a #${id} enterprise`;
  }
}
