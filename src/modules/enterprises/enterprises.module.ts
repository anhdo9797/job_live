import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnterprisesService } from './enterprises.service';
import { Enterprise, EnterpriseSchema } from './entities/enterprise.schema';
import { EnterprisesController } from './enterprises.controller';

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
