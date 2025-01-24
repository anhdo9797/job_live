import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { I18nService } from 'nestjs-i18n';
import { CreateJobDto } from './dto/create-job.dto';
import { Job } from './entities/job.schema';
import { JobsService } from './job.service';

type MockType<T> = {
  [P in keyof T]?: jest.Mock;
};

const mockJobModel = jest.fn().mockImplementation(() => ({
  save: jest.fn(),
}));

const mockI18nService = {
  t: jest.fn((key: string) => key),
};

describe('JobsService', () => {
  let service: JobsService;
  let jobModel: Model<Job>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsService,
        { provide: getModelToken(Job.name), useClass: mockJobModel },
        { provide: I18nService, useValue: mockI18nService },
      ],
    }).compile();

    service = module.get<JobsService>(JobsService);
    jobModel = module.get(getModelToken(Job.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a job successfully', async () => {
      const createJobDto: CreateJobDto = {
        title: 'Software Engineer',
        description: 'Develop software',
        location: 'Remote',
        requirements: '',
        benefits: '',
        applicationMethod: '',
        deadline: new Date(),
      };

      const createdJob = { _id: 'someId', ...createJobDto };

      const jobInstance = new mockJobModel();
      jobInstance.save.mockResolvedValueOnce(createdJob);
    });

    it('should throw a BadRequestException on error', async () => {});
  });
});
