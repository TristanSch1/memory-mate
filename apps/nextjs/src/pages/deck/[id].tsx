import { type NextPageWithLayout } from "@/pages/_app";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { type GetServerSidePropsContext, type InferGetServerSidePropsType } from "next";
import { appRouter } from "@memory-mate/api";
import superjson from "superjson";
import { createInnerTRPCContext } from "@memory-mate/api/src/trpc";
import { getServerSession } from "@memory-mate/auth";
import { api } from "@/utils/api";
import { authPage } from "@/utils/pages";
import TopBarLayout from "@/components/layout/TopBarLayout";
import { URLPath } from "@/routes";
import CardList from "@/features/cards/components/CardList";

const DeckPage: NextPageWithLayout = authPage(({ id }: InferGetServerSidePropsType<typeof getServerSideProps>) =>
{
  const { data: deck } = api.deck.byId.useQuery(id);

  if (!deck) return null;
  return (
    <TopBarLayout title={deck.name} backRoute={URLPath.home}>
      <CardList deckId={deck.id}/>
    </TopBarLayout>
  );
});

export const  getServerSideProps = async (
  { params,req,res }: GetServerSidePropsContext<{ id: string }>,
)=> {
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
}

export default DeckPage;
