import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnterprisesController } from './enterprises.controller';
import { EnterprisesService } from './enterprises.service';
import { Enterprise, EnterpriseSchema } from './entities/enterprise.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Enterprise.name,
        schema: EnterpriseSchema,
      },
    ]),
  ],
  controllers: [EnterprisesController],
  providers: [EnterprisesService],
  exports: [EnterprisesService],
})
export class EnterprisesModule {}
