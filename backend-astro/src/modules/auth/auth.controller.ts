import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { PaginationDto } from '../user/dto/pagination.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.authService.findAll(paginationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.authService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.updateUser(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.authService.deleteUser(id);
  }
}
