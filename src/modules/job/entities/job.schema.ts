import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Job extends Document {
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
