import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsOptional()
  @IsDateString()
  readonly birthDate?: Date;

  @IsOptional()
  @IsString()
  readonly zodiacSign?: string;
}
