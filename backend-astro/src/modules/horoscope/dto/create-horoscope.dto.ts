export class CreateHoroscopeDto {
  readonly sign: string;
  readonly daily: string;
  readonly weekly?: string;
  readonly monthly?: string;
}
