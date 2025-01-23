import { Injectable } from '@nestjs/common';
import { EnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Enterprise } from './entities/enterprise.schema';
import { Model } from 'mongoose';
import { User } from '../users/entities/user.schema';

@Injectable()
export class EnterprisesService {
  constructor(
    @InjectModel(Enterprise.name) private enterpriseModel: Model<Enterprise>,
  ) {}

  async handleProfile(
    user: User,
    data: EnterpriseDto | UpdateEnterpriseDto,
  ): Promise<any> {
    try {
      const current = await this.findByCreator(user._id);

      if (current) {
        const updater = await this.enterpriseModel.updateOne(
          { _id: current._id },
          {
            $set: {
              ...data,
              updatedAt: Date.now(),
            },
          },
        );
        return {
          message: 'Custom message from service',
        };
      }

      const created = new this.enterpriseModel({
        ...data,
        creator: user._id,
      });
      await created.save();

      return { message: 'Enterprise created successfully' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByCreator(creator: string): Promise<Enterprise | undefined> {
    try {
      return this.enterpriseModel.findOne({ creator }).exec();
    } catch (error) {
      throw new Error(error);
    }
  }

  create(createEnterpriseDto: EnterpriseDto) {
    return 'This action adds a new enterprise';
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
