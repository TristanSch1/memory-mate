import { useRouter } from "next/router";
import { URLPath } from "@/routes";
import { api } from "@/utils/api";

export const useStartReview = (deckId: string) => {
  const router = useRouter();
  const { mutate } = api.deckReview.create.useMutation({
    onSuccess(deckReview) {
      void router.push(URLPath.review(deckId, deckReview.id));
    },
  });

  const startReview = () => {
    try {
      const deckReview = mutate({ deckId, duration: 0 });
      return deckReview;
    } catch (e) {
      console.error(e);
    }
  };

  return { startReview };
};
