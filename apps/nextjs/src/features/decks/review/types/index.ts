export const Rate = [0, 1, 2, 3, 4, 5] as const;

export type TRate = typeof Rate[number];
