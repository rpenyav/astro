import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MonthlyHoroscopeDocument = MonthlyHoroscope & Document;

@Schema()
export class MonthlyHoroscope {
  @Prop({ required: true })
  signCode: string;

  @Prop({ required: true })
  prediction: string;

  @Prop({ required: true })
  month: number; // 0-11 for January-December
}

export const MonthlyHoroscopeSchema =
  SchemaFactory.createForClass(MonthlyHoroscope);
MonthlyHoroscopeSchema.index({ signCode: 1, month: 1 }, { unique: true });
