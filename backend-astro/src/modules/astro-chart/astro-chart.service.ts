import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AstroChart, AstroChartDocument } from './schemas/astro-chart.schema';
import { PaginationDto } from './dto/pagination.dto';
import { CreateAstroChartDto } from './dto/create-astro-chart.dto';
import { UpdateAstroChartDto } from './dto/update-astro-chart.dto';

@Injectable()
export class AstroChartService {
  constructor(
    @InjectModel(AstroChart.name)
    private astroChartModel: Model<AstroChartDocument>,
  ) {}

  private parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  }

  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  async createAstroChart(
    createAstroChartDto: CreateAstroChartDto,
  ): Promise<AstroChart> {
    const { dateOfBirth, ...rest } = createAstroChartDto;
    const date = this.parseDate(dateOfBirth);
    const createdAstroChart = new this.astroChartModel({
      ...rest,
      dateOfBirth: date,
    });
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
      list: astroCharts.map((chart) => ({
        ...chart.toObject(),
        dateOfBirth: this.formatDate(new Date(chart.dateOfBirth)),
      })),
      pageNumber: page,
      pageSize,
      totalElements,
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
    const { dateOfBirth, ...rest } = updateAstroChartDto;
    const updateData = {
      ...rest,
      ...(dateOfBirth ? { dateOfBirth: this.parseDate(dateOfBirth) } : {}),
    };
    const existingAstroChart = await this.astroChartModel
      .findByIdAndUpdate(id, updateData, { new: true })
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

  async findAllByUserId(
    userId: string,
    paginationDto: PaginationDto,
  ): Promise<any> {
    const { page, pageSize } = paginationDto;
    const skip = (page - 1) * pageSize;
    const totalElements = await this.astroChartModel
      .countDocuments({ userId })
      .exec();
    const astroCharts = await this.astroChartModel
      .find({ userId })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 }) // Ordenar por fecha de creación descendente
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
}
