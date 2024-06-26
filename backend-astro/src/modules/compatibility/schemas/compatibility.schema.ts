import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompatibilityDocument = Compatibility & Document;

@Schema()
export class Compatibility {
  @Prop({ required: true, minlength: 3, maxlength: 3 })
  sign1: string;

  @Prop({ required: true, minlength: 3, maxlength: 3 })
  sign2: string;

  @Prop({ required: true })
  love: string;

  @Prop({ required: true })
  friendship: string;

  @Prop({ required: true })
  business: string;
}

export const CompatibilitySchema = SchemaFactory.createForClass(Compatibility);
