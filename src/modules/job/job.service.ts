import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from './entities/job.schema';
import { CreateJobDto } from './dto/create-job.dto';
import { ResultResponse } from 'src/common/types/response';
import { I18nService } from 'nestjs-i18n';
import { FindJobDto } from './dto/find-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name) private jobModel: Model<Job>,
    private i18nService: I18nService,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<ResultResponse<Job>> {
    try {
      const model = new this.jobModel({
        ...createJobDto,
        createdAt: new Date(),
      });

      const job = await model.save();
      return {
        message: this.i18nService.t('job.CREATED_SUCCESSFULLY'),
        result: job,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async findAll({
    page = 1,
    pageSize = 10,
    search = '',
    ...params
  }: FindJobDto): Promise<ResultResponse<Job[] | Job>> {
    const skip = (page - 1) * pageSize;
    const jobs = await this.jobModel
      .find()
      .or([
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { address: { $regex: search, $options: 'i' } },
      ])
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize ?? 10);

    const total = await this.jobModel.countDocuments().exec();

    return {
      result: jobs,
      total,
      currentPage: Number.parseInt(page.toString()),
      totalPages: Math.ceil(jobs.length / pageSize),
    };
  }
}
