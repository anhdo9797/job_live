import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VerificationDocument = HydratedDocument<Verification>;

@Schema()
export class Verification {
  _id: string;

  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  code: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  expired: Date;
}

export const VerificationSchema = SchemaFactory.createForClass(Verification);
VerificationSchema.loadClass(Verification);
