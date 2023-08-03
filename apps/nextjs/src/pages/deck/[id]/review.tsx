import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import { appConfig } from "@/_config";
import TopBarLayout from "@/components/layout/TopBarLayout";
import { Review, ReviewProvider } from "@/features/decks/review";
import { ReviewContainer } from "@/features/decks/review/components/ReviewContainer";
import { URLPath } from "@/routes";
import { api } from "@/utils/api";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import superjson from "superjson";

import { appRouter } from "@memory-mate/api";
import { createInnerTRPCContext } from "@memory-mate/api/src/trpc";
import { getServerSession } from "@memory-mate/auth";

const ReviewPage = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: deck } = api.deck.forReview.useQuery({ deckId: id });

  if (!deck) {
    return <p>Error not found</p>;
  }
  return (
    <TopBarLayout title={deck.name} backRoute={URLPath.deck(id)}>
      <ReviewContainer>
        <ReviewProvider deck={deck}>
          <Review />
        </ReviewProvider>
      </ReviewContainer>
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
