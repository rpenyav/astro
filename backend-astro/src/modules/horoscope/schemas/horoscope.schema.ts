import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HoroscopeDocument = Horoscope & Document;

@Schema()
export class Horoscope {
  @Prop({ required: true })
  sign: string;

  @Prop({ required: true })
  daily: string;

  @Prop()
  weekly: string;

  @Prop()
  monthly: string;
}

export const HoroscopeSchema = SchemaFactory.createForClass(Horoscope);
