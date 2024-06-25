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
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('contents')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post()
  async create(@Body() createContentDto: CreateContentDto) {
    return this.contentService.createContent(createContentDto);
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.contentService.findAll(paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.contentService.findOneById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateContentDto: UpdateContentDto,
  ) {
    return this.contentService.updateContent(id, updateContentDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.contentService.deleteContent(id);
  }
}
