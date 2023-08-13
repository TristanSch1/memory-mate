import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";
import { appConfig } from "@/_config";
import TopBarLayout from "@/components/layout/TopBarLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardTabContent } from "@/features/cards";
import {
  DeckOptionsDropdown,
  DeckProvider,
  DeckReviewTabContent,
} from "@/features/decks";
import { type NextPageWithLayout } from "@/pages/_app";
import { URLPath } from "@/routes";
import { api } from "@/utils/api";
import { authPage } from "@/utils/pages";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { MoreHorizontal } from "lucide-react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import superjson from "superjson";

import { appRouter } from "@memory-mate/api";
import { createInnerTRPCContext } from "@memory-mate/api/src/trpc";
import { getServerSession } from "@memory-mate/auth";

const DeckPage: NextPageWithLayout = authPage(
  ({ id }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { t } = useTranslation("deck");
    const { query } = useRouter();
    const defaultTab = query.tab as string;
    const { data: deck } = api.deck.byId.useQuery(id);
    if (!deck) return null;
    return (
      <TopBarLayout
        headerProps={{
          title: deck.name,
          backRoute: URLPath.home,
          renderRight: () => (
            <DeckOptionsDropdown deck={deck}>
              <MoreHorizontal
                className={"text-neutral-500 group-hover:text-neutral-950"}
              />
            </DeckOptionsDropdown>
          ),
        }}
      >
        <DeckProvider deckId={deck.id} cardCount={deck._count.cards}>
          <Tabs defaultValue={defaultTab ?? "review"}>
            <TabsList className={"w-full"}>
              <TabsTrigger value={"review"}>{t("review.title")}</TabsTrigger>
              <TabsTrigger value={"cards"}>{t("cards")}</TabsTrigger>
            </TabsList>
            <TabsContent value={"review"}>
              <DeckReviewTabContent />
            </TabsContent>
            <TabsContent value={"cards"}>
              <CardTabContent />
            </TabsContent>
          </Tabs>
        </DeckProvider>
      </TopBarLayout>
    );
  },
);

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
  await helpers.deck.byId.prefetch(id);
  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
      ...(await serverSideTranslations(locale ?? appConfig.defaultLocale, [
        "common",
        "card",
        "deck",
      ])),
    },
  };
};

export default DeckPage;
