import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import TopBarLayout from "@/components/layout/TopBarLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardTabContent from "@/features/cards/components/CardTabContent";
import { DeckProvider } from "@/features/decks/stores/DeckProvider";
import { type NextPageWithLayout } from "@/pages/_app";
import { URLPath } from "@/routes";
import { api } from "@/utils/api";
import { authPage } from "@/utils/pages";
import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";

import { appRouter } from "@memory-mate/api";
import { createInnerTRPCContext } from "@memory-mate/api/src/trpc";
import { getServerSession } from "@memory-mate/auth";

const DeckPage: NextPageWithLayout = authPage(
  ({ id }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { data: deck } = api.deck.byId.useQuery(id);

    if (!deck) return null;
    return (
      <TopBarLayout title={deck.name} backRoute={URLPath.home}>
        <DeckProvider id={deck.id}>
          <Tabs defaultValue={"review"}>
            <TabsList className={"w-full"}>
              <TabsTrigger value={"review"}>Révision</TabsTrigger>
              <TabsTrigger value={"cards"}>Cartes</TabsTrigger>
            </TabsList>
            <TabsContent value={"review"}>
              <div className={"flex items-center justify-between"}>
                <h2 className={"heading text-2xl"}>Révision</h2>
                <label>{}</label>
              </div>
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
    },
  };
};

export default DeckPage;
