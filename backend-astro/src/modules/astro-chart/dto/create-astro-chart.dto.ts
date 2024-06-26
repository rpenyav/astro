import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsDateString,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAstroChartDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @Matches(/^\d{2}\/\d{2}\/\d{4}$/, {
    message: 'dateOfBirth must be in the format dd/mm/yyyy',
  })
  dateOfBirth: string;

  @IsString()
  @IsNotEmpty()
  timeOfBirth: string;

  @IsString()
  @IsNotEmpty()
  placeOfBirth: string;

  chartData: Record<string, any>;
}
