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

export type DeleteCardsProps = {
  cardIds: string[];
  onSuccess?: () => void;
};

export const DeleteCards = ({ cardIds, onSuccess }: DeleteCardsProps) => {
  const { t } = useTranslation("common");
  const utils = api.useContext();
  const deleteCards = api.card.deleteMany.useMutation({
    onSuccess: async () => {
      await utils.card.all.invalidate();
      onSuccess?.();
    },
  });

  const handleDelete = () => {
    deleteCards.mutate(cardIds);
  };
  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>
          {t("card.delete.title", { count: cardIds.length })}
        </AlertDialogTitle>
        <AlertDialogDescription>
          {t("card.delete.description")}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>{t("card.delete.cancel")}</AlertDialogCancel>
        <AlertDialogAction onClick={handleDelete}>
          {t("card.delete.confirm")}
        </AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
};
