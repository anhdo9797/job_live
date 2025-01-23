import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/modules/users/entities/user.schema';

export type EnterpriseDocument = mongoose.HydratedDocument<Enterprise>;

@Schema()
export class Enterprise {
  @Prop({
    auto: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enterprise',
    required: true,
  })
  _id: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  creator: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  address: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: String })
  phoneNumber: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ default: false })
  isVerified: boolean;
}

export const EnterpriseSchema = SchemaFactory.createForClass(Enterprise);
EnterpriseSchema.loadClass(Enterprise);
