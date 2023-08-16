import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import { appConfig } from "@/_config";
import TopBarLayout from "@/components/layout/TopBarLayout";
import { Review, ReviewContainer, ReviewProvider } from "@/features/decks";
import { URLPath } from "@/routes";
import { api } from "@/utils/api";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import superjson from "superjson";

import { appRouter } from "@memory-mate/api";
import { createInnerTRPCContext } from "@memory-mate/api/src/trpc";
import { getServerSession } from "@memory-mate/auth";
import { prisma } from "@memory-mate/db";

const ReviewPage = ({
  deckId,
  deckReview,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: deck } = api.deck.forReview.useQuery({ deckId });

  if (!deck || !deckReview) {
    return <p>Error not found</p>;
  }

  return (
    <TopBarLayout
      headerProps={{ title: deck.name, backRoute: URLPath.deck(deckId) }}
    >
      <ReviewProvider deck={deck} deckReview={deckReview}>
        <ReviewContainer>
          <Review />
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
}: GetServerSidePropsContext<{ deckId: string; reviewId: string }>) => {
  const session = await getServerSession({ req, res });
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session }),
    transformer: superjson,
  });
  const deckId = params?.deckId;
  const reviewId = params?.reviewId;
  if (!deckId || !reviewId) {
    return {
      notFound: true,
    };
  }

  await helpers.deck.forReview.prefetch({ deckId: deckId });

  const deckReview = await prisma.deckReview.findUnique({
    where: { id: reviewId },
  });
  return {
    props: {
      trpcState: helpers.dehydrate(),
      deckId,
      deckReview: JSON.parse(JSON.stringify(deckReview)),
      ...(await serverSideTranslations(locale ?? appConfig.defaultLocale, [
        "common",
        "review",
      ])),
    },
  };
};

export default ReviewPage;
