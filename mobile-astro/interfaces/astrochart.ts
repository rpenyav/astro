// interfaces.ts
export interface AstroChart {
  _id: string;
  userId: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  chartData: Record<string, any>;
}

export interface CreateAstroChart {
  userId: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  chartData: Record<string, any>;
}
