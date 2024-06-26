import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCompatibilityDto } from './dto/create-compatibility.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateCompatibilityDto } from './dto/update-compatibility.dto';
import {
  Compatibility,
  CompatibilityDocument,
} from './schemas/compatibility.schema';

@Injectable()
export class CompatibilityService {
  constructor(
    @InjectModel(Compatibility.name)
    private compatibilityModel: Model<CompatibilityDocument>,
  ) {}

  async createCompatibility(
    createCompatibilityDto: CreateCompatibilityDto,
  ): Promise<Compatibility> {
    const createdCompatibility = new this.compatibilityModel(
      createCompatibilityDto,
    );
    return createdCompatibility.save();
  }

  async findAll(paginationDto: PaginationDto): Promise<any> {
    const { page, pageSize } = paginationDto;
    const skip = (page - 1) * pageSize;
    const totalElements = await this.compatibilityModel.countDocuments().exec();
    const compatibilities = await this.compatibilityModel
      .find()
      .skip(skip)
      .limit(pageSize)
      .exec();

    return {
      list: compatibilities,
      pageNumber: page,
      pageSize: pageSize,
      totalElements: totalElements,
      totalPages: Math.ceil(totalElements / pageSize),
      isLast: page * pageSize >= totalElements,
    };
  }

  async findOneById(id: string): Promise<Compatibility> {
    const compatibility = await this.compatibilityModel.findById(id).exec();
    if (!compatibility) {
      throw new NotFoundException(`Compatibility with ID ${id} not found`);
    }
    return compatibility;
  }

  async findBySignCode(
    signCode: string,
    paginationDto: PaginationDto,
  ): Promise<any> {
    const { page, pageSize } = paginationDto;
    const skip = (page - 1) * pageSize;
    const totalElements = await this.compatibilityModel
      .countDocuments({ sign1: signCode })
      .exec();
    const compatibilities = await this.compatibilityModel
      .find({ sign1: signCode })
      .skip(skip)
      .limit(pageSize)
      .exec();

    return {
      list: compatibilities,
      pageNumber: page,
      pageSize: pageSize,
      totalElements: totalElements,
      totalPages: Math.ceil(totalElements / pageSize),
      isLast: page * pageSize >= totalElements,
    };
  }

  async updateCompatibility(
    id: string,
    updateCompatibilityDto: UpdateCompatibilityDto,
  ): Promise<Compatibility> {
    const existingCompatibility = await this.compatibilityModel
      .findByIdAndUpdate(id, updateCompatibilityDto, { new: true })
      .exec();
    if (!existingCompatibility) {
      throw new NotFoundException(`Compatibility with ID ${id} not found`);
    }
    return existingCompatibility;
  }

  async deleteCompatibility(id: string): Promise<Compatibility> {
    const deletedCompatibility = await this.compatibilityModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedCompatibility) {
      throw new NotFoundException(`Compatibility with ID ${id} not found`);
    }
    return deletedCompatibility;
  }
}
