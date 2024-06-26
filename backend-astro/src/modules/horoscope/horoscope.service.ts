import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  DailyHoroscope,
  DailyHoroscopeDocument,
} from './schemas/daily-horoscope.schema';
import {
  WeeklyHoroscope,
  WeeklyHoroscopeDocument,
} from './schemas/weekly-horoscope.schema';
import {
  MonthlyHoroscope,
  MonthlyHoroscopeDocument,
} from './schemas/monthly-horoscope.schema';
import { CreateDailyHoroscopeDto } from './dto/create-daily-horoscope.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class HoroscopeService {
  constructor(
    @InjectModel(DailyHoroscope.name)
    private dailyHoroscopeModel: Model<DailyHoroscopeDocument>,
    @InjectModel(WeeklyHoroscope.name)
    private weeklyHoroscopeModel: Model<WeeklyHoroscopeDocument>,
    @InjectModel(MonthlyHoroscope.name)
    private monthlyHoroscopeModel: Model<MonthlyHoroscopeDocument>,
  ) {}

  // Daily Horoscope Methods
  async createDailyHoroscope(
    createDailyHoroscopeDto: CreateDailyHoroscopeDto,
  ): Promise<DailyHoroscope> {
    const { signCode, prediction, date } = createDailyHoroscopeDto;
    const dateObj = new Date(date);
    const startOfDay = new Date(
      dateObj.getUTCFullYear(),
      dateObj.getUTCMonth(),
      dateObj.getUTCDate(),
    );

    // Verificar existencia de la combinación signCode y date
    const existingHoroscope = await this.dailyHoroscopeModel
      .findOne({ signCode, date: startOfDay })
      .exec();
    if (existingHoroscope) {
      throw new BadRequestException(
        'Daily horoscope already exists for this sign and date',
      );
    }

    const createdHoroscope = new this.dailyHoroscopeModel({
      signCode,
      prediction,
      date: startOfDay,
    });
    return createdHoroscope.save();
  }

  async getDailyHoroscope(
    signCode: string,
    date: string,
  ): Promise<DailyHoroscope> {
    const dateObj = new Date(date);
    const startOfDay = new Date(
      Date.UTC(
        dateObj.getUTCFullYear(),
        dateObj.getUTCMonth(),
        dateObj.getUTCDate(),
      ),
    );
    const endOfDay = new Date(startOfDay);
    endOfDay.setUTCDate(startOfDay.getUTCDate() + 1);

    const horoscope = await this.dailyHoroscopeModel
      .findOne({
        signCode,
        date: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      })
      .exec();
    if (!horoscope) {
      throw new NotFoundException('No prediction for today');
    }
    return horoscope;
  }

  // Weekly Horoscope Methods
  async createWeeklyHoroscope(
    signCode: string,
    prediction: string,
    startDate: Date,
    endDate: Date,
  ): Promise<WeeklyHoroscope> {
    const existingHoroscope = await this.weeklyHoroscopeModel
      .findOne({ signCode, startDate, endDate })
      .exec();
    if (existingHoroscope) {
      throw new BadRequestException(
        'Weekly horoscope already exists for this range',
      );
    }
    const createdHoroscope = new this.weeklyHoroscopeModel({
      signCode,
      prediction,
      startDate,
      endDate,
    });
    return createdHoroscope.save();
  }

  async getWeeklyHoroscope(
    signCode: string,
    date: Date,
  ): Promise<WeeklyHoroscope> {
    const startOfWeek = new Date(date);
    startOfWeek.setUTCDate(startOfWeek.getUTCDate() - startOfWeek.getUTCDay()); // Obtener el inicio de la semana (domingo)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setUTCDate(startOfWeek.getUTCDate() + 6); // Obtener el fin de la semana (sábado)

    const horoscope = await this.weeklyHoroscopeModel
      .findOne({
        signCode,
        startDate: { $lte: date },
        endDate: { $gte: date },
      })
      .exec();
    if (!horoscope) {
      throw new NotFoundException('No prediction for this week');
    }
    return horoscope;
  }

  // Monthly Horoscope Methods
  async createMonthlyHoroscope(
    signCode: string,
    prediction: string,
    month: number,
  ): Promise<MonthlyHoroscope> {
    const existingHoroscope = await this.monthlyHoroscopeModel
      .findOne({ signCode, month })
      .exec();
    if (existingHoroscope) {
      throw new BadRequestException(
        'Monthly horoscope already exists for this month',
      );
    }
    const createdHoroscope = new this.monthlyHoroscopeModel({
      signCode,
      prediction,
      month,
    });
    return createdHoroscope.save();
  }

  async getMonthlyHoroscope(
    signCode: string,
    month: number,
  ): Promise<MonthlyHoroscope> {
    const horoscope = await this.monthlyHoroscopeModel
      .findOne({ signCode, month })
      .exec();
    if (!horoscope) {
      throw new NotFoundException('No prediction for this month');
    }
    return horoscope;
  }

  async getAllDailyHoroscopes(paginationDto: PaginationDto): Promise<any> {
    const { page, pageSize } = paginationDto;
    const skip = (page - 1) * pageSize;
    const totalElements = await this.dailyHoroscopeModel
      .countDocuments()
      .exec();
    const dailyHoroscopes = await this.dailyHoroscopeModel
      .find()
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .exec();

    return {
      list: dailyHoroscopes,
      pageNumber: page,
      pageSize: pageSize,
      totalElements: totalElements,
      totalPages: Math.ceil(totalElements / pageSize),
      isLast: page * pageSize >= totalElements,
    };
  }

  async getAllWeeklyHoroscopes(paginationDto: PaginationDto): Promise<any> {
    const { page, pageSize } = paginationDto;
    const skip = (page - 1) * pageSize;
    const totalElements = await this.weeklyHoroscopeModel
      .countDocuments()
      .exec();
    const weeklyHoroscopes = await this.weeklyHoroscopeModel
      .find()
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .exec();

    return {
      list: weeklyHoroscopes,
      pageNumber: page,
      pageSize: pageSize,
      totalElements: totalElements,
      totalPages: Math.ceil(totalElements / pageSize),
      isLast: page * pageSize >= totalElements,
    };
  }

  async getAllMonthlyHoroscopes(paginationDto: PaginationDto): Promise<any> {
    const { page, pageSize } = paginationDto;
    const skip = (page - 1) * pageSize;
    const totalElements = await this.monthlyHoroscopeModel
      .countDocuments()
      .exec();
    const monthlyHoroscopes = await this.monthlyHoroscopeModel
      .find()
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .exec();

    return {
      list: monthlyHoroscopes,
      pageNumber: page,
      pageSize: pageSize,
      totalElements: totalElements,
      totalPages: Math.ceil(totalElements / pageSize),
      isLast: page * pageSize >= totalElements,
    };
  }
}
