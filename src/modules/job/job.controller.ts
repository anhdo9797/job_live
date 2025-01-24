import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/common/config/roles.decorator';
import { Role } from 'src/common/constants/role.enum';
import { ResultResponse } from 'src/common/types/response';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CreateJobDto } from './dto/create-job.dto';
import { Job } from './entities/job.schema';
import { JobsService } from './job.service';
import { RolesGuard } from '../auth/guard/roles.guard';
import { FindJobDto } from './dto/find-job.dto';

@Controller('job')
@UseGuards(JwtAuthGuard, RolesGuard)
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Roles(Role.Enterprise)
  @Post()
  async create(
    @Body() createJobDto: CreateJobDto,
  ): Promise<ResultResponse<Job>> {
    return this.jobsService.create(createJobDto);
  }

  @Get()
  async findAll(@Query() params: FindJobDto): Promise<ResultResponse<any>> {
    return this.jobsService.findAll(params);
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string): Promise<Job> {
  //   return this.jobsService.findOne(id);
  // }

  // @Put(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateJobDto: any,
  // ): Promise<Job> {
  //   return this.jobsService.update(id, updateJobDto);
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: string): Promise<Job> {
  //   return this.jobsService.delete(id);
  // }
}
