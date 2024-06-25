export class CreateAstroChartDto {
  readonly userId: string;
  readonly dateOfBirth: Date;
  readonly timeOfBirth: string;
  readonly placeOfBirth: string;
  readonly chartData: any; // JSON or any other structure for chart data
}
