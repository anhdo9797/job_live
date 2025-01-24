import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as AutoIncrementFactory from 'mongoose-sequence';
const AutoIncrement = AutoIncrementFactory(mongoose);

@Schema()
export class Job extends mongoose.Document {
  @Prop()
  _id: number;

  @Prop({ auto: true, type: mongoose.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ auto: true, type: mongoose.Types.ObjectId, ref: 'Enterprise' })
  enterpriseId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  requirements: string;

  @Prop({ required: true })
  benefits: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  applicationMethod: string;

  @Prop({ required: true })
  deadline: Date;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}
export const JobSchema = SchemaFactory.createForClass(Job);
