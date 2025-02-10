import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/common/config/roles.decorator';
import { Role } from 'src/common/constants/role.enum';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { EnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { EnterprisesService } from './enterprises.service';

@Controller('enterprises')
export class EnterprisesController {
  constructor(private readonly enterprisesService: EnterprisesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.enterprisesService.findAll();
  }

  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.Admin, Role.Enterprise)
  @Post()
  create(createEnterpriseDto: EnterpriseDto) {
    return this.enterprisesService.create(createEnterpriseDto);
  }
  @HttpCode(HttpStatus.OK)
  @Roles(Role.Admin, Role.Enterprise)
  @Put()
  update(update: UpdateEnterpriseDto) {
    throw new Error('Method not implemented.');
  }
}
