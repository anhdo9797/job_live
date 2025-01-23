import { PartialType } from '@nestjs/mapped-types';
import { EnterpriseDto } from './create-enterprise.dto';

export class UpdateEnterpriseDto extends PartialType(EnterpriseDto) {}
