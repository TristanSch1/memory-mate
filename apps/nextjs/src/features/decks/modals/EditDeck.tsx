import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/providers/ModalProvider";
import { useTranslation } from "next-i18next";

import { type RouterOutputs } from "@memory-mate/api";

import { DeckForm } from "../components/DeckForm";

export type EditDeckProps = {
  deck: RouterOutputs["deck"]["create"];
};

export const EditDeck = ({ deck }: EditDeckProps) => {
  const { t } = useTranslation("deck");
  const { close } = useModal();
  return (
    <>
      <DialogHeader>
        <DialogTitle>{t("edit")}</DialogTitle>
        <DialogDescription>{t("edit")}</DialogDescription>
      </DialogHeader>
      <DeckForm
        onSuccess={close}
        data={{ ...deck, description: deck.description ?? undefined }}
      />
    </>
  );
};
