import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useModal } from "@/providers/ModalProvider";
import { useTranslation } from "next-i18next";

import { LangSelector, Logout } from "../components";

export const Settings = () => {
  const { t } = useTranslation("common");
  const { close } = useModal();
  return (
    <>
      <DialogHeader>
        <DialogTitle>{t("settings.title")}</DialogTitle>
      </DialogHeader>
      <LangSelector />
      <Logout />
    </>
  );
};
