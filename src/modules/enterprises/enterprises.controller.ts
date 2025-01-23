import { Controller, Get } from '@nestjs/common';
import { EnterprisesService } from './enterprises.service';

@Controller('enterprises')
export class EnterprisesController {
  constructor(private readonly enterprisesService: EnterprisesService) {}
  @Get()
  findAll() {
    return this.enterprisesService.findAll();
  }
}
