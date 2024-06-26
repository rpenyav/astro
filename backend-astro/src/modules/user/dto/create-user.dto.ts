import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  readonly birthDate?: Date;

  @IsString()
  readonly zodiacSign?: string;

  @IsString()
  readonly role?: string; // Añadir el campo role opcional
}
