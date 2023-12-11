import { Schema, Prop, SchemaFactory } from '@nestJs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';


export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

@Schema()
export class User {
  // @Prop()
  // firstName: string;
  // @Prop()
  // lastName: string;
  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop({ minlength: [6, 'Password must be min 6 characters'] })
  password: string;

  @Prop({ enum: Role })
  role: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
