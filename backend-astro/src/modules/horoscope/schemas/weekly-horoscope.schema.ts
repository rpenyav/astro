import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WeeklyHoroscopeDocument = WeeklyHoroscope & Document;

@Schema()
export class WeeklyHoroscope {
  @Prop({ required: true })
  signCode: string;

  @Prop({ required: true })
  prediction: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;
}

export const WeeklyHoroscopeSchema =
  SchemaFactory.createForClass(WeeklyHoroscope);
WeeklyHoroscopeSchema.index(
  { signCode: 1, startDate: 1, endDate: 1 },
  { unique: true },
);
