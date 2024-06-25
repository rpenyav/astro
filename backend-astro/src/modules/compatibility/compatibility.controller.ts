import { CompatibilityService } from './compatibility.service';
import { CreateCompatibilityDto } from './dto/create-compatibility.dto';
import { UpdateCompatibilityDto } from './dto/update-compatibility.dto';
import { PaginationDto } from './dto/pagination.dto';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';

@Controller('compatibilities')
export class CompatibilityController {
  constructor(private readonly compatibilityService: CompatibilityService) {}

  @Post()
  async create(@Body() createCompatibilityDto: CreateCompatibilityDto) {
    return this.compatibilityService.createCompatibility(
      createCompatibilityDto,
    );
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.compatibilityService.findAll(paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.compatibilityService.findOneById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCompatibilityDto: UpdateCompatibilityDto,
  ) {
    return this.compatibilityService.updateCompatibility(
      id,
      updateCompatibilityDto,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.compatibilityService.deleteCompatibility(id);
  }
}
