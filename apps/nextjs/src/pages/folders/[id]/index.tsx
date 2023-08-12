import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import { appConfig } from "@/_config";
import TopBarLayout from "@/components/layout/TopBarLayout";
import { FolderDecks, FolderProvider } from "@/features/folders";
import { type NextPageWithLayout } from "@/pages/_app";
import { api } from "@/utils/api";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import superjson from "superjson";

import { appRouter } from "@memory-mate/api";
import { createInnerTRPCContext } from "@memory-mate/api/src/trpc";
import { getServerSession } from "@memory-mate/auth";

const FolderPage: NextPageWithLayout = ({
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { t } = useTranslation("folder");
  const { data: folder } = api.folder.byId.useQuery(id);
  if (!folder) return null;
  return (
    <TopBarLayout headerProps={{ title: folder.name }}>
      <FolderProvider value={{ folderId: id }}>
        <div className={"space-y-4"}>
          <h1 className={"heading text-2xl"}>{t("decks")}</h1>
          <FolderDecks decks={folder.decks} />
        </div>
      </FolderProvider>
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
  await helpers.folder.byId.prefetch(id);
  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
      ...(await serverSideTranslations(locale ?? appConfig.defaultLocale, [
        "common",
        "folder",
        "deck",
      ])),
    },
  };
};

export default FolderPage;
