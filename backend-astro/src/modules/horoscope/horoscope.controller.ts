import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { HoroscopeService } from './horoscope.service';
import { CreateDailyHoroscopeDto } from './dto/create-daily-horoscope.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('horoscopes')
export class HoroscopeController {
  constructor(private readonly horoscopeService: HoroscopeService) {}

  @Post('daily')
  async createDailyHoroscope(
    @Body() createDailyHoroscopeDto: CreateDailyHoroscopeDto,
  ) {
    return this.horoscopeService.createDailyHoroscope(createDailyHoroscopeDto);
  }

  @Get('daily')
  async getDailyHoroscope(
    @Query('signCode') signCode: string,
    @Query('date') date: string,
  ) {
    return this.horoscopeService.getDailyHoroscope(signCode, date);
  }

  @Post('weekly')
  async createWeeklyHoroscope(
    @Body('signCode') signCode: string,
    @Body('prediction') prediction: string,
    @Body('startDate') startDate: string,
    @Body('endDate') endDate: string,
  ) {
    return this.horoscopeService.createWeeklyHoroscope(
      signCode,
      prediction,
      new Date(startDate),
      new Date(endDate),
    );
  }

  @Get('weekly')
  async getWeeklyHoroscope(
    @Query('signCode') signCode: string,
    @Query('date') date: string,
  ) {
    return this.horoscopeService.getWeeklyHoroscope(signCode, new Date(date));
  }

  @Post('monthly')
  async createMonthlyHoroscope(
    @Body('signCode') signCode: string,
    @Body('prediction') prediction: string,
    @Body('month') month: number,
  ) {
    return this.horoscopeService.createMonthlyHoroscope(
      signCode,
      prediction,
      month,
    );
  }

  @Get('monthly')
  async getMonthlyHoroscope(
    @Query('signCode') signCode: string,
    @Query('month') month: number,
  ) {
    return this.horoscopeService.getMonthlyHoroscope(signCode, month);
  }

  @Get('all-daily')
  async getAllDailyHoroscopes(@Query() paginationDto: PaginationDto) {
    return this.horoscopeService.getAllDailyHoroscopes(paginationDto);
  }

  @Get('all-weekly')
  async getAllWeeklyHoroscopes(@Query() paginationDto: PaginationDto) {
    return this.horoscopeService.getAllWeeklyHoroscopes(paginationDto);
  }

  @Get('all-monthly')
  async getAllMonthlyHoroscopes(@Query() paginationDto: PaginationDto) {
    return this.horoscopeService.getAllMonthlyHoroscopes(paginationDto);
  }
}
