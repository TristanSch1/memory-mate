export const millisecondsToSeconds = (milliseconds: number) =>
  milliseconds / 1000;

export const twoDigits = (n: number) => (n < 10 ? `0${n}` : `${n}`);
