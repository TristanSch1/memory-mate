import { MainLayout } from "@/components/layout";
import { CreateFolder, FoldersList } from "@/features/folders";
import { type NextPageWithLayout } from "@/pages/_app";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import superjson from "superjson";

import { appRouter } from "@memory-mate/api";
import { createInnerTRPCContext } from "@memory-mate/api/src/trpc";
import { getServerSession } from "@memory-mate/auth";

const FoldersPage: NextPageWithLayout = () => {
  const { t } = useTranslation("folder");
  return (
    <>
      <div className={"mb-8 flex items-center justify-between"}>
        <div className={"space-y-4"}>
          <h1 className={"heading text-5xl capitalize"}>{t("page.title")}</h1>
          <p className={"text-foreground/70"}>{t("page.description")}</p>
        </div>
        <CreateFolder />
      </div>
      <FoldersList />
    </>
  );
};

FoldersPage.auth = true;

FoldersPage.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};

export async function getServerSideProps({ req, res, locale }) {
  const session = await getServerSession({ req, res });
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session }),
    transformer: superjson,
  });

  await helpers.deck.all.prefetch();
  return {
    props: {
      trpcState: helpers.dehydrate(),
      ...(await serverSideTranslations(locale, ["common", "folder"])),
    },
  };
}

export default FoldersPage;
