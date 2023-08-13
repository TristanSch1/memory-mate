import "../styles/globals.css";

import {
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
} from "react";
import { type NextPage } from "next";
import { type AppProps } from "next/app";
import { ModalProvider } from "@/providers/ModalProvider";
import { api } from "@/utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { type Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { appWithTranslation } from "next-i18next";
import { ThemeProvider } from "next-themes";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
  auth?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  session: Session | null;
};

dayjs.extend(relativeTime);
const MyApp = ({ Component, session, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => page);
  const ComponentWithLayout = getLayout(<Component {...pageProps} />);
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        {Component.auth ? (
          <Auth>
            <ModalProvider>{ComponentWithLayout}</ModalProvider>
          </Auth>
        ) : (
          ComponentWithLayout
        )}
      </ThemeProvider>
    </SessionProvider>
  );
};

const Auth = ({ children }: PropsWithChildren) => {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default api.withTRPC(appWithTranslation(MyApp));
