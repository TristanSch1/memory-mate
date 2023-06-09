import Head from "next/head";
import { type NextPageWithLayout } from "@/pages/_app";
import CreateDeck from "@/features/decks/components/CreateDeck";
import DeckList from "@/features/decks/components/DeckList";
import { MainLayout } from "@/components/layout";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={"flex items-center justify-between mb-8"}>
        <h1 className={"text-5xl"}>Decks</h1>
        <CreateDeck />
      </div>
      <DeckList />
    </>
  );
};

Home.auth = true;

Home.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
