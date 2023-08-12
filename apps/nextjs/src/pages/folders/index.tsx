import { MainLayout } from "@/components/layout";
import { CreateFolder } from "@/features/folders/components/CreateFolder";
import { FoldersList } from "@/features/folders/components/FoldersList";
import { type NextPageWithLayout } from "@/pages/_app";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

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

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "folder"])),
    },
  };
}

export default FoldersPage;
