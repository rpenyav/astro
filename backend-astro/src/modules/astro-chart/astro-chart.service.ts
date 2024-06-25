import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AstroChart, AstroChartDocument } from './schemas/astro-chart.schema';
import { CreateAstroChartDto } from './dto/create-astro-chart.dto';
import { UpdateAstroChartDto } from './dto/update-astro-chart.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class AstroChartService {
  constructor(
    @InjectModel(AstroChart.name)
    private astroChartModel: Model<AstroChartDocument>,
  ) {}

  async createAstroChart(
    createAstroChartDto: CreateAstroChartDto,
  ): Promise<AstroChart> {
    const createdAstroChart = new this.astroChartModel(createAstroChartDto);
    return createdAstroChart.save();
  }

  async findAll(paginationDto: PaginationDto): Promise<any> {
    const { page, pageSize } = paginationDto;
    const skip = (page - 1) * pageSize;
    const totalElements = await this.astroChartModel.countDocuments().exec();
    const astroCharts = await this.astroChartModel
      .find()
      .skip(skip)
      .limit(pageSize)
      .exec();

    return {
      list: astroCharts,
      pageNumber: page,
      pageSize: pageSize,
      totalElements: totalElements,
      totalPages: Math.ceil(totalElements / pageSize),
      isLast: page * pageSize >= totalElements,
    };
  }

  async findOneById(id: string): Promise<AstroChart> {
    const astroChart = await this.astroChartModel.findById(id).exec();
    if (!astroChart) {
      throw new NotFoundException(`Astro Chart with ID ${id} not found`);
    }
    return astroChart;
  }

  async updateAstroChart(
    id: string,
    updateAstroChartDto: UpdateAstroChartDto,
  ): Promise<AstroChart> {
    const existingAstroChart = await this.astroChartModel
      .findByIdAndUpdate(id, updateAstroChartDto, { new: true })
      .exec();
    if (!existingAstroChart) {
      throw new NotFoundException(`Astro Chart with ID ${id} not found`);
    }
    return existingAstroChart;
  }

  async deleteAstroChart(id: string): Promise<AstroChart> {
    const deletedAstroChart = await this.astroChartModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedAstroChart) {
      throw new NotFoundException(`Astro Chart with ID ${id} not found`);
    }
    return deletedAstroChart;
  }
}
