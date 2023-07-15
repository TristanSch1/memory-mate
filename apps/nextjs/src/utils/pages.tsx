import { MainLayout } from "@/components/layout";
import { type NextPageWithLayout } from "@/pages/_app";

export const authPage = (page: NextPageWithLayout) => {
  page.auth = true;
  return page;
};

export const authPathWithLayout = (page: NextPageWithLayout) => {
  page.getLayout = (page) => {
    return <MainLayout>{page}</MainLayout>;
  };

  return authPage(page);
};
