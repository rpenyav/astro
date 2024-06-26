import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DailyHoroscopeDocument = DailyHoroscope & Document;

@Schema({ timestamps: true })
export class DailyHoroscope {
  @Prop({ required: true })
  signCode: string;

  @Prop({ required: true })
  prediction: string;

  @Prop({ required: true })
  date: Date;
}

export const DailyHoroscopeSchema =
  SchemaFactory.createForClass(DailyHoroscope);

// Añadir índice compuesto
DailyHoroscopeSchema.index({ signCode: 1, date: 1 }, { unique: true });
