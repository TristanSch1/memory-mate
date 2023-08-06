export const Grade = [0, 1, 2, 3, 4, 5] as const;

export type TGrade = typeof Grade[number];

export type TReviewState = "REVIEWING" | "FINISHED";
