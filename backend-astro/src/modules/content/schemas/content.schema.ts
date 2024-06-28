import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContentDocument = Content & Document;

@Schema()
export class Content {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  body: string;

  @Prop()
  author: string;
  @Prop()
  imatge: string;
  @Prop([String])
  tags: string[];
}

export const ContentSchema = SchemaFactory.createForClass(Content);
