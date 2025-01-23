import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './entities/employee.schema';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { REQUEST } from '@nestjs/core';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ResultResponse } from 'src/common/types/response';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class EmployeesService {
  constructor(
    @Inject(REQUEST) private readonly request: any,
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
    private i18nService: I18nService,
  ) {}

  async createOrUpdate(
    body: CreateEmployeeDto | UpdateEmployeeDto,
  ): Promise<ResultResponse<Employee>> {
    const { _id } = this.request.user;
    const current = await this.findByUserId(_id);

    if (current) {
      const updater = await this.update(current._id, body);

      return {
        message: this.i18nService.t('messages.UPDATE_EMPLOYEE_SUCCESS'),
        result: updater,
      };
    }

    const creator = await this.employeeModel.create({
      ...body,
      userId: _id,
    });

    return {
      message: this.i18nService.t('messages.CREATED_EMPLOYEE_SUCCESS'),
      result: creator,
    };
  }

  async findByUserId(id: string) {
    return await this.employeeModel.findOne({ userId: id });
  }

  async findAll() {
    return await this.employeeModel.find().exec();
  }

  async findOne(id: string) {
    return await this.employeeModel.findById(id).exec();
  }

  async update(id: string, body: CreateEmployeeDto | UpdateEmployeeDto) {
    return this.employeeModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          ...body,
          updatedAt: Date.now(),
        },
      },
    );
  }

  async remove(id: string) {
    return await this.employeeModel.findByIdAndDelete(id).exec();
  }
}
