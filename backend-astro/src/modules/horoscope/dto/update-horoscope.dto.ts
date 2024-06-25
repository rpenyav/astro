import { PartialType } from '@nestjs/mapped-types';
import { CreateHoroscopeDto } from './create-horoscope.dto';

export class UpdateHoroscopeDto extends PartialType(CreateHoroscopeDto) {}
