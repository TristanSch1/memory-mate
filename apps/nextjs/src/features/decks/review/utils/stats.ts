import { type GraphProps } from "@/features/decks";

import { type RouterOutputs } from "@memory-mate/api";

import { GRADES } from "../types";

export const getReviewStats = (
  review: RouterOutputs["deckReview"]["recap"]["lastReview"],
): GraphProps["stats"] => {
  const stats = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };
  GRADES.forEach((grade) => {
    stats[grade] = review.cardReviews.filter(
      (review) => review.grade === grade,
    ).length;
  });

  return stats;
};
