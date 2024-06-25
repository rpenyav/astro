import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { getZodiacSign } from '../user/zodiac-sign.util';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { PaginationDto } from '../user/dto/pagination.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { User, UserDocument } from '../user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    let zodiacSign = createUserDto.zodiacSign;

    if (!zodiacSign && createUserDto.birthDate) {
      zodiacSign = getZodiacSign(new Date(createUserDto.birthDate));
    }

    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
      zodiacSign,
    });
    return createdUser.save();
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email }).exec();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user._id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async findAll(paginationDto: PaginationDto): Promise<any> {
    const { page, pageSize } = paginationDto;
    const skip = (page - 1) * pageSize;
    const totalElements = await this.userModel.countDocuments().exec();
    const users = await this.userModel.find().skip(skip).limit(pageSize).exec();

    return {
      list: users,
      pageNumber: page,
      pageSize: pageSize,
      totalElements: totalElements,
      totalPages: Math.ceil(totalElements / pageSize),
      isLast: page * pageSize >= totalElements,
    };
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return existingUser;
  }

  async deleteUser(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return deletedUser;
  }
}
