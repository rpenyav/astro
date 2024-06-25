import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { AstroChartService } from './astro-chart.service';
import { CreateAstroChartDto } from './dto/create-astro-chart.dto';
import { UpdateAstroChartDto } from './dto/update-astro-chart.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('astro-charts')
export class AstroChartController {
  constructor(private readonly astroChartService: AstroChartService) {}

  @Post()
  async create(@Body() createAstroChartDto: CreateAstroChartDto) {
    return this.astroChartService.createAstroChart(createAstroChartDto);
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.astroChartService.findAll(paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.astroChartService.findOneById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAstroChartDto: UpdateAstroChartDto,
  ) {
    return this.astroChartService.updateAstroChart(id, updateAstroChartDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.astroChartService.deleteAstroChart(id);
  }
}
