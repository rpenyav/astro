import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HoroscopeService } from './horoscope.service';
import { HoroscopeController } from './horoscope.controller';
import {
  DailyHoroscope,
  DailyHoroscopeSchema,
} from './schemas/daily-horoscope.schema';
import {
  WeeklyHoroscope,
  WeeklyHoroscopeSchema,
} from './schemas/weekly-horoscope.schema';
import {
  MonthlyHoroscope,
  MonthlyHoroscopeSchema,
} from './schemas/monthly-horoscope.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DailyHoroscope.name, schema: DailyHoroscopeSchema },
      { name: WeeklyHoroscope.name, schema: WeeklyHoroscopeSchema },
      { name: MonthlyHoroscope.name, schema: MonthlyHoroscopeSchema },
    ]),
  ],
  providers: [HoroscopeService],
  controllers: [HoroscopeController],
})
export class HoroscopeModule {}
