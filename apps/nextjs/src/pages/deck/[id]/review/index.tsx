import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import { appConfig } from "@/_config";
import TopBarLayout from "@/components/layout/TopBarLayout";
import {
  ReviewContainer,
  ReviewPageBody,
  ReviewProvider,
} from "@/features/decks";
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
  id,
  deckReview,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: deck } = api.deck.forReview.useQuery({ deckId: id });

  if (!deck || !deckReview) {
    return <p>Error not found</p>;
  }

  return (
    <TopBarLayout
      headerProps={{ title: deck.name, backRoute: URLPath.deck(id) }}
    >
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
  const deckId = params?.id as string;
  await helpers.deck.forReview.prefetch({ deckId: deckId });

  const deckReview = await prisma.deckReview.create({
    data: {
      deckId: deckId,
      duration: 0,
      gradeAvg: 0,
    },
  });
  return {
    props: {
      trpcState: helpers.dehydrate(),
      id: deckId,
      deckReview: JSON.parse(JSON.stringify(deckReview)),
      ...(await serverSideTranslations(locale ?? appConfig.defaultLocale, [
        "common",
        "review",
      ])),
    },
  };
};

export default ReviewPage;
