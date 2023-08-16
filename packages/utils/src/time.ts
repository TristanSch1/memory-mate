export const millisecondsToSeconds = (milliseconds: number) =>
  milliseconds / 1000;

export const twoDigits = (n: number) => (n < 10 ? `0${n}` : `${n}`);

export const daysToMilliseconds = (days: number): number =>
  days * 24 * 60 * 60 * 1000;

export const millisecondsToDays = (milliseconds: number): number =>
  milliseconds / (24 * 60 * 60 * 1000);
