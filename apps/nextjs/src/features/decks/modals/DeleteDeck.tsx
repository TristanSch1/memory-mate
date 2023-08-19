import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { api } from "@/utils/api";
import { useTranslation } from "next-i18next";

export type DeleteDeckProps = {
  deckId: string;
  onSuccess?: () => void;
};
export const DeleteDeck = ({ deckId, onSuccess }: DeleteDeckProps) => {
  const { t } = useTranslation("common");
  const utils = api.useContext();
  const deleteFolder = api.deck.delete.useMutation({
    onSuccess: async () => {
      await utils.deck.all.invalidate();
      onSuccess?.();
    },
  });

  const handleDelete = () => {
    deleteFolder.mutate(deckId);
  };
  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>{t("deck.delete.title")}</AlertDialogTitle>
        <AlertDialogDescription>
          {t("deck.delete.description")}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>{t("deck.delete.cancel")}</AlertDialogCancel>
        <AlertDialogAction onClick={handleDelete}>
          {t("deck.delete.confirm")}
        </AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
};
