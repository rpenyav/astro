import { IsString, IsDate, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateDailyHoroscopeDto {
  @IsString()
  @IsNotEmpty()
  signCode: string;

  @IsString()
  @IsNotEmpty()
  prediction: string;

  @IsDateString()
  @IsNotEmpty()
  date: string;
}
