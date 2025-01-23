import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongoSchema } from 'mongoose';
import { ROLES } from 'src/common/constants/role.enum';

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

  @Prop({ default: false })
  icActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.set('toJSON', { virtuals: true });
UserSchema.loadClass(User);
