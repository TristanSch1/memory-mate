import Head from "next/head";
import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { DeckList } from "@/features/decks";
import { type NextPageWithLayout } from "@/pages/_app";
import { useModal } from "@/providers/ModalProvider";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Home: NextPageWithLayout = () => {
  const { t } = useTranslation();
  const { open } = useModal();
  const handleNew = () => {
    open("createDeck");
  };
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={"mb-8 flex items-center justify-between"}>
        <h1 className={"page-title"}>{t("deck")}</h1>
        <Button onClick={handleNew}>{t("new")}</Button>
      </div>
      <DeckList />
    </>
  );
};

Home.auth = true;

Home.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "deck"])),
    },
  };
}

export default Home;
