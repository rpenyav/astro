import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { HoroscopeService } from './horoscope.service';
import { CreateHoroscopeDto } from './dto/create-horoscope.dto';
import { UpdateHoroscopeDto } from './dto/update-horoscope.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Horoscope } from './schemas/horoscope.schema';

@Controller('horoscopes')
export class HoroscopeController {
  constructor(private readonly horoscopeService: HoroscopeService) {}

  @Post()
  async create(@Body() createHoroscopeDto: CreateHoroscopeDto) {
    return this.horoscopeService.createHoroscope(createHoroscopeDto);
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.horoscopeService.findAll(paginationDto);
  }

  @Get('/search')
  async searchHoroscope(@Query('sign') sign: string): Promise<Horoscope> {
    const horoscope = await this.horoscopeService.findBySign(sign);
    if (!horoscope) {
      throw new NotFoundException('Horoscope not found');
    }
    return horoscope;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.horoscopeService.findOneById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateHoroscopeDto: UpdateHoroscopeDto,
  ) {
    return this.horoscopeService.updateHoroscope(id, updateHoroscopeDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.horoscopeService.deleteHoroscope(id);
  }
}
