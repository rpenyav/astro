import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AstroChartDocument = AstroChart & Document;

@Schema()
export class AstroChart {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop({ required: true })
  timeOfBirth: string;

  @Prop({ required: true })
  placeOfBirth: string;

  @Prop({ type: Object, required: true })
  chartData: Record<string, any>; // o chartData: any;
}

export const AstroChartSchema = SchemaFactory.createForClass(AstroChart);
