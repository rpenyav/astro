// src/utils/getZodiacSignLabel.ts
import { ZodiacSignCode, zodiacSignLiterals } from "../constants/zodiacSigns";

export const getZodiacSignLabel = (
  signCode: string,
  language: string = "es"
): string => {
  const sign = Object.keys(ZodiacSignCode).find(
    (key) => ZodiacSignCode[key as keyof typeof ZodiacSignCode] === signCode
  ) as ZodiacSignCode | undefined;

  if (sign && zodiacSignLiterals[sign]) {
    return zodiacSignLiterals[sign][language] || signCode;
  }

  return signCode; // Return the code itself if no label is found
};
