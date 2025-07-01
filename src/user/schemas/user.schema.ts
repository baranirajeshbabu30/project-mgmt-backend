import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  toJSON(): { [x: string]: any; password: any; } {
    throw new Error('Method not implemented.');
  }
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;



  @Prop({ required: true })
  password: string;

   @Prop({ required: true, enum: ['Admin', 'Viewer'], default: 'Viewer' })
  role: string;

  @Prop()
  createdAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
