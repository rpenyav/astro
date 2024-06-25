export function getZodiacSign(date: Date): string {
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // Los meses en JavaScript son de 0-11

  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return 'Acuario';
  } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
    return 'Piscis';
  } else if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return 'Aries';
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return 'Tauro';
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return 'Géminis';
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return 'Cáncer';
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return 'Leo';
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return 'Virgo';
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return 'Libra';
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return 'Escorpio';
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return 'Sagitario';
  } else {
    return 'Capricornio';
  }
}
