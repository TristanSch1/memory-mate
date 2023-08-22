import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTranslation } from "next-i18next";

import { LangSelector, Logout } from "../components";

export const Settings = () => {
  const { t } = useTranslation("common");
  return (
    <div className={"space-y-4"}>
      <DialogHeader>
        <DialogTitle>{t("settings.title")}</DialogTitle>
      </DialogHeader>
      <LangSelector />
      <Logout />
    </div>
  );
};
