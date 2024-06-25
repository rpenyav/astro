import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HoroscopeService } from './horoscope.service';
import { HoroscopeController } from './horoscope.controller';
import { Horoscope, HoroscopeSchema } from './schemas/horoscope.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Horoscope.name, schema: HoroscopeSchema },
    ]),
  ],
  providers: [HoroscopeService],
  controllers: [HoroscopeController],
})
export class HoroscopeModule {}
