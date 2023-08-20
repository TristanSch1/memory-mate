import { env } from "@/env.mjs";

export const LOCALES = ["en", "fr"] as const;
export type TLang = typeof LOCALES[number];
export const appConfig = {
  defaultLocale: "fr" as TLang,
  tinyMceApiKey: env.NEXT_PUBLIC_TINY_MCE_API_KEY,
};
