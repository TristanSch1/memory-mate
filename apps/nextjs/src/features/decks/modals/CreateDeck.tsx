import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/providers/ModalProvider";
import { useTranslation } from "next-i18next";

import { DeckForm } from "../components/DeckForm";

export const CreateDeck = () => {
  const { t } = useTranslation("deck");
  const { close } = useModal();
  return (
    <>
      <DialogHeader>
        <DialogTitle>{t("new")}</DialogTitle>
        <DialogDescription>{t("create")}</DialogDescription>
      </DialogHeader>
      <DeckForm onSuccess={close} />
    </>
  );
};
