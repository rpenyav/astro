import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  birthDate: Date;

  @Prop()
  zodiacSign: string;

  @Prop({ required: true, enum: ['user', 'admin'], default: 'user' })
  role: string; // Añadir el campo role
}

export const UserSchema = SchemaFactory.createForClass(User);
