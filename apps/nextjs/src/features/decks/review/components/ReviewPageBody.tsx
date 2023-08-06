import { useReview } from "@/features/decks/review";
import { ReviewRecap } from "@/features/decks/review/components/ReviewRecap";

import { Review } from "./Review";

export const ReviewPageBody = () => {
  const { reviewState } = useReview();

  if (reviewState === "REVIEWING") {
    return <ReviewRecap />;
  }

  return <Review />;
};
