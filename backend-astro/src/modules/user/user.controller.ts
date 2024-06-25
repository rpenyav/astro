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
import { UserService } from './user.service';

import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from './dto/pagination.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.userService.findAll(paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
