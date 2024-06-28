export interface Prediction {
  _id: string;
  signCode: string;
  prediction: string;
  date: string;
}

export interface CreatePrediction {
  signCode: string;
  prediction: string;
  date: string;
}
