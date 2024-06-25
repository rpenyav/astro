import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Horoscope, HoroscopeDocument } from './schemas/horoscope.schema';
import { CreateHoroscopeDto } from './dto/create-horoscope.dto';
import { UpdateHoroscopeDto } from './dto/update-horoscope.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class HoroscopeService {
  constructor(
    @InjectModel(Horoscope.name)
    private horoscopeModel: Model<HoroscopeDocument>,
  ) {}

  async createHoroscope(
    createHoroscopeDto: CreateHoroscopeDto,
  ): Promise<Horoscope> {
    const createdHoroscope = new this.horoscopeModel(createHoroscopeDto);
    return createdHoroscope.save();
  }

  async findAll(paginationDto: PaginationDto): Promise<any> {
    const { page, pageSize } = paginationDto;
    const skip = (page - 1) * pageSize;
    const totalElements = await this.horoscopeModel.countDocuments().exec();
    const horoscopes = await this.horoscopeModel
      .find()
      .skip(skip)
      .limit(pageSize)
      .exec();

    return {
      list: horoscopes,
      pageNumber: page,
      pageSize: pageSize,
      totalElements: totalElements,
      totalPages: Math.ceil(totalElements / pageSize),
      isLast: page * pageSize >= totalElements,
    };
  }

  async findOneById(id: string): Promise<Horoscope> {
    const horoscope = await this.horoscopeModel.findById(id).exec();
    if (!horoscope) {
      throw new NotFoundException(`Horoscope with ID ${id} not found`);
    }
    return horoscope;
  }

  async updateHoroscope(
    id: string,
    updateHoroscopeDto: UpdateHoroscopeDto,
  ): Promise<Horoscope> {
    const existingHoroscope = await this.horoscopeModel
      .findByIdAndUpdate(id, updateHoroscopeDto, { new: true })
      .exec();
    if (!existingHoroscope) {
      throw new NotFoundException(`Horoscope with ID ${id} not found`);
    }
    return existingHoroscope;
  }

  async deleteHoroscope(id: string): Promise<Horoscope> {
    const deletedHoroscope = await this.horoscopeModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedHoroscope) {
      throw new NotFoundException(`Horoscope with ID ${id} not found`);
    }
    return deletedHoroscope;
  }

  async findById(id: string): Promise<Horoscope> {
    return this.horoscopeModel.findById(id).exec();
  }

  async findBySign(sign: string): Promise<Horoscope> {
    return this.horoscopeModel.findOne({ sign }).exec();
  }
}
