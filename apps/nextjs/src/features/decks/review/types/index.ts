export const GRADES = [0, 1, 2, 3, 4, 5] as const;

export type TGrade = typeof GRADES[number];

export type TReviewState = "REVIEWING" | "FINISHED";
