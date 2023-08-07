import { useEffect, useState } from "react";
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";
import { appConfig } from "@/_config";
import TopBarLayout from "@/components/layout/TopBarLayout";
import { Loader } from "@/components/ui/loader";
import { ReviewPageBody, ReviewProvider } from "@/features/decks/review";
import { ReviewContainer } from "@/features/decks/review/components/ReviewContainer";
import { URLPath } from "@/routes";
import { api, type RouterOutputs } from "@/utils/api";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import superjson from "superjson";

import { appRouter } from "@memory-mate/api";
import { createInnerTRPCContext } from "@memory-mate/api/src/trpc";
import { getServerSession } from "@memory-mate/auth";

const ReviewPage = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [deckReview, setDeckReview] = useState<
    RouterOutputs["deckReview"]["create"] | null
  >(null);
  const { data: deck } = api.deck.forReview.useQuery({ deckId: id });
  const { mutate } = api.deckReview.create.useMutation({
    onSuccess(data) {
      setDeckReview(data);
    },
  });
  const { push } = useRouter();
  useEffect(() => {
    if (!deck) return;
    if (deck.cards.length === 0) {
      void push(URLPath.deck(id));
    }

    mutate({ deckId: id, duration: 0 });
  }, []);
  if (!deck) {
    return <p>Error not found</p>;
  }

  if (!deckReview) {
    return <Loader />;
  }
  return (
    <TopBarLayout title={deck.name} backRoute={URLPath.deck(id)}>
      <ReviewProvider deck={deck} deckReview={deckReview}>
        <ReviewContainer>
          <ReviewPageBody />
        </ReviewContainer>
      </ReviewProvider>
    </TopBarLayout>
  );
};

export const getServerSideProps = async ({
  params,
  req,
  res,
  locale,
}: GetServerSidePropsContext<{ id: string }>) => {
  const session = await getServerSession({ req, res });
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session }),
    transformer: superjson,
  });
  const id = params?.id as string;
  await helpers.deck.forReview.prefetch({ deckId: id });
  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
      ...(await serverSideTranslations(locale ?? appConfig.defaultLocale, [
        "common",
        "review",
      ])),
    },
  };
};

export default ReviewPage;
