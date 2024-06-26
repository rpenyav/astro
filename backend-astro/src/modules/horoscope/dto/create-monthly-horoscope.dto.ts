import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateMonthlyHoroscopeDto {
  @IsString()
  @IsNotEmpty()
  signCode: string;

  @IsString()
  @IsNotEmpty()
  prediction: string;

  @IsNumber()
  @IsNotEmpty()
  month: number;
}
