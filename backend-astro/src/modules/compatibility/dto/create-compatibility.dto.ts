import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateCompatibilityDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  readonly sign1: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  readonly sign2: string;

  @IsString()
  @IsNotEmpty()
  readonly love: string;

  @IsString()
  @IsNotEmpty()
  readonly friendship: string;

  @IsString()
  @IsNotEmpty()
  readonly business: string;
}
