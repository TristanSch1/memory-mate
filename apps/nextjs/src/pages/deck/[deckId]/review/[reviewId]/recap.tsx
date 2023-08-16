import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import { appConfig } from "@/_config";
import TopBarLayout from "@/components/layout/TopBarLayout";
import { ReviewRecap } from "@/features/decks/";
import { URLPath } from "@/routes";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import superjson from "superjson";

import { appRouter } from "@memory-mate/api";
import { createInnerTRPCContext } from "@memory-mate/api/src/trpc";
import { getServerSession } from "@memory-mate/auth";

const ReviewRecapPage = ({
  deckId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t } = useTranslation("review");
  return (
    <TopBarLayout
      headerProps={{ title: t("recap.title"), backRoute: URLPath.deck(deckId) }}
    >
      <ReviewRecap deckId={deckId} />
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

  await helpers.deckReview.recap.prefetch({ deckId: deckId });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      deckId,
      ...(await serverSideTranslations(locale ?? appConfig.defaultLocale, [
        "common",
        "review",
      ])),
    },
  };
};

export default ReviewRecapPage;
