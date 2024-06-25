import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content, ContentDocument } from './schemas/content.schema';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel(Content.name) private contentModel: Model<ContentDocument>,
  ) {}

  async createContent(createContentDto: CreateContentDto): Promise<Content> {
    const createdContent = new this.contentModel(createContentDto);
    return createdContent.save();
  }

  async findAll(paginationDto: PaginationDto): Promise<any> {
    const { page, pageSize } = paginationDto;
    const skip = (page - 1) * pageSize;
    const totalElements = await this.contentModel.countDocuments().exec();
    const contents = await this.contentModel
      .find()
      .skip(skip)
      .limit(pageSize)
      .exec();

    return {
      list: contents,
      pageNumber: page,
      pageSize: pageSize,
      totalElements: totalElements,
      totalPages: Math.ceil(totalElements / pageSize),
      isLast: page * pageSize >= totalElements,
    };
  }

  async findOneById(id: string): Promise<Content> {
    const content = await this.contentModel.findById(id).exec();
    if (!content) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }
    return content;
  }

  async updateContent(
    id: string,
    updateContentDto: UpdateContentDto,
  ): Promise<Content> {
    const existingContent = await this.contentModel
      .findByIdAndUpdate(id, updateContentDto, { new: true })
      .exec();
    if (!existingContent) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }
    return existingContent;
  }

  async deleteContent(id: string): Promise<Content> {
    const deletedContent = await this.contentModel.findByIdAndDelete(id).exec();
    if (!deletedContent) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }
    return deletedContent;
  }
}
