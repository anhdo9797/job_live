import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { HydratedDocument, Schema as MongoSchema } from 'mongoose';

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema()
export class Employee {
  @Prop({
    auto: true,
    type: MongoSchema.Types.ObjectId,
    ref: 'Employee',
  })
  _id: string;

  @Prop({ required: true, type: MongoSchema.Types.ObjectId, ref: 'User' })
  userId: string;

  @IsNotEmpty()
  @Prop({ required: true, type: String })
  name: string;

  @IsNotEmpty()
  @Prop({ required: true, type: String })
  phone: string;

  @IsNotEmpty()
  @Prop({ required: true, type: String })
  address: string;

  @IsNotEmpty()
  @Prop({ required: true, type: Date })
  birthday: Date;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
EmployeeSchema.set('toJSON', { virtuals: true });
EmployeeSchema.loadClass(Employee);
