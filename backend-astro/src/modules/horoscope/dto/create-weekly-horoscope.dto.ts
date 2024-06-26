import { IsString, IsDate, IsNotEmpty } from 'class-validator';

export class CreateWeeklyHoroscopeDto {
  @IsString()
  @IsNotEmpty()
  signCode: string;

  @IsString()
  @IsNotEmpty()
  prediction: string;

  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  endDate: Date;
}
