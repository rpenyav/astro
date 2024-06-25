import { PartialType } from '@nestjs/mapped-types';
import { CreateAstroChartDto } from './create-astro-chart.dto';

export class UpdateAstroChartDto extends PartialType(CreateAstroChartDto) {}
