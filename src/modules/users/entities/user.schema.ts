import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongoSchema } from 'mongoose';
import { ROLES } from 'src/common/constants/role.enum';
import { Employee } from 'src/modules/employees/entities/employee.schema';
import { Enterprise } from 'src/modules/enterprises/entities/enterprise.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    auto: true,
    type: MongoSchema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  _id: string;

  @Prop({
    type: MongoSchema.Types.ObjectId,
    ref: Enterprise.name,
  })
  enterpriseId: string;

  @Prop({
    type: MongoSchema.Types.ObjectId,
    ref: Employee.name,
  })
  employeeId: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ type: String, enum: ROLES })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.set('toJSON', { virtuals: true });
UserSchema.loadClass(User);
