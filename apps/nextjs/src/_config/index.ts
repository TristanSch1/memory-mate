import { env } from "@/env.mjs";

export type TLang = "en" | "fr";
export const appConfig = {
  defaultLocale: "fr" as TLang,
  tinyMceApiKey: env.NEXT_PUBLIC_TINY_MCE_API_KEY,
};
