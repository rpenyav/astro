import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { PaginationDto } from '../user/dto/pagination.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user) {
      const isPasswordValid = await bcrypt.compare(pass, user.password);
      if (isPasswordValid) {
        const { password, ...result } = user.toObject ? user.toObject() : user;
        return result;
      }
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    const newUser = { ...createUserDto, password: hashedPassword };
    return this.userService.createUser(newUser);
  }

  async findAll(paginationDto: PaginationDto) {
    return this.userService.findAll(paginationDto);
  }

  async findOneById(id: string) {
    return this.userService.findOneById(id);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  async deleteUser(id: string) {
    return this.userService.deleteUser(id);
  }
}
