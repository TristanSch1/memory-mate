import { useRouter } from "next/router";
import { LOCALES } from "@/_config";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "next-i18next";

export const LangSelector = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const changeLang = (lang: string) => {
    void router.push(router.pathname, router.asPath, { locale: lang });
  };
  return (
    <div>
      <Label>{t("settings.lang")}</Label>
      <Select defaultValue={router.locale} onValueChange={(v) => changeLang(v)}>
        <SelectTrigger>
          <SelectValue placeholder={t("settings.selectLang")} />
        </SelectTrigger>
        <SelectContent>
          {LOCALES.map((locale) => {
            return (
              <SelectItem key={locale} value={locale}>
                {t(`settings.locales.${locale}`)}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};
