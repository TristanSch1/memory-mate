export const Rate = {
  BAD: 0,
  GOOD: 1,
  GREAT: 2,
} as const;

export type TRate = typeof Rate[keyof typeof Rate];
