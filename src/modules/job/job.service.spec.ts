import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { I18nService } from 'nestjs-i18n';
import { CreateJobDto } from './dto/create-job.dto';
import { Job } from './entities/job.schema';
import { JobsService } from './job.service';
import { BadRequestException } from '@nestjs/common';

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

  type MockType<T> = {
    [P in keyof T]?: jest.Mock;
  };

  const mockJobModel = jest.fn();
  const mockI18nService = {
    t: jest.fn((key: string) => key),
  };

  describe('JobsService', () => {
    let service: JobsService;
    let jobModel: jest.Mock;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          JobsService,
          {
            provide: getModelToken(Job.name),
            useValue: mockJobModel,
          },
          { provide: I18nService, useValue: mockI18nService },
        ],
      }).compile();

      service = module.get<JobsService>(JobsService);
      jobModel = module.get(getModelToken(Job.name));
      // Clear mocks before each test
      mockJobModel.mockReset();
      (mockI18nService.t as jest.Mock).mockClear();
    });

    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    describe('create', () => {
      it('should create a job successfully', async () => {
        // Arrange
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

        // Create a mock instance with a save method
        const saveMock = jest.fn().mockResolvedValue(createdJob);
        // When the constructor is called, return an object with save method.
        jobModel.mockImplementation(() => ({ save: saveMock }));

        // Act
        const result = await service.create(createJobDto);

        // Assert that the model was instantiated with createJobDto and createdAt
        expect(jobModel).toHaveBeenCalledWith(
          expect.objectContaining({
            ...createJobDto,
            createdAt: expect.any(Date),
          }),
        );
        expect(saveMock).toHaveBeenCalled();
        expect(mockI18nService.t).toHaveBeenCalledWith(
          'job.CREATED_SUCCESSFULLY',
        );
        expect(result).toEqual({
          message: 'job.CREATED_SUCCESSFULLY',
          result: createdJob,
        });
      });

      it('should throw a BadRequestException on error', async () => {
        // Arrange
        const createJobDto: CreateJobDto = {
          title: 'Data Scientist',
          description: 'Analyze data',
          location: 'On-site',
          requirements: '',
          benefits: '',
          applicationMethod: '',
          deadline: new Date(),
        };

        const errorMessage = 'Save failed';
        const saveMock = jest.fn().mockRejectedValue(errorMessage);
        jobModel.mockImplementation(() => ({ save: saveMock }));

        // Act & Assert
        await expect(service.create(createJobDto)).rejects.toThrow(
          BadRequestException,
        );
        expect(saveMock).toHaveBeenCalled();
        expect(mockI18nService.t).not.toHaveBeenCalled();
      });
    });
  });
 
});
