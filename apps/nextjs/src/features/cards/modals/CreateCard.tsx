import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/providers/ModalProvider";
import { useTranslation } from "next-i18next";

import CardForm from "../components/CardForm";

export type CreateCardProps = {
  deckId: string;
};
export const CreateCard = (props: CreateCardProps) => {
  const { t } = useTranslation("card");
  const { close } = useModal();
  return (
    <>
      <DialogHeader>
        <DialogTitle>{t("create.title")}</DialogTitle>
        <DialogDescription>{t("create.description")}</DialogDescription>
      </DialogHeader>
      <CardForm onSuccess={close} deckId={props.deckId} />
    </>
  );
};
