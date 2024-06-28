// src/constants/zodiacSigns.ts
export enum ZodiacSignCode {
  Capricornio = "cap",
  Leo = "leo",
  Cancer = "can",
  Virgo = "vir",
  Geminis = "gem",
  Aries = "ari",
  Libra = "lib",
  Piscis = "pis",
  Tauro = "tau",
  Sagitario = "sag",
  Escorpio = "esc",
  Acuario = "acu",
}

type LanguageObject = {
  [key in ZodiacSignCode]: {
    [language: string]: string;
  };
};

export const zodiacSignLiterals: LanguageObject = {
  [ZodiacSignCode.Capricornio]: {
    es: "Capricornio",
    en: "Capricorn",
  },
  [ZodiacSignCode.Leo]: {
    es: "Leo",
    en: "Leo",
  },
  [ZodiacSignCode.Cancer]: {
    es: "Cáncer",
    en: "Cancer",
  },
  [ZodiacSignCode.Virgo]: {
    es: "Virgo",
    en: "Virgo",
  },
  [ZodiacSignCode.Geminis]: {
    es: "Géminis",
    en: "Gemini",
  },
  [ZodiacSignCode.Aries]: {
    es: "Aries",
    en: "Aries",
  },
  [ZodiacSignCode.Libra]: {
    es: "Libra",
    en: "Libra",
  },
  [ZodiacSignCode.Piscis]: {
    es: "Piscis",
    en: "Pisces",
  },
  [ZodiacSignCode.Tauro]: {
    es: "Tauro",
    en: "Taurus",
  },
  [ZodiacSignCode.Sagitario]: {
    es: "Sagitario",
    en: "Sagittarius",
  },
  [ZodiacSignCode.Escorpio]: {
    es: "Escorpio",
    en: "Scorpio",
  },
  [ZodiacSignCode.Acuario]: {
    es: "Acuario",
    en: "Aquarius",
  },
};
