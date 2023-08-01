import { type Dispatch, type SetStateAction } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useCardStore } from "@/features/cards/components/CardsProvider";
import { api } from "@/utils/api";
import { useTranslation } from "next-i18next";
import { useStore } from "zustand";

type Props = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

const DeleteCards = ({ open, onOpenChange }: Props) => {
  const { t } = useTranslation("card");
  const store = useCardStore();
  const { selectedCards } = useStore(store, (state) => ({
    selectedCards: state.selectedCards,
  }));

  const utils = api.useContext();
  const deleteCards = api.card.deleteMany.useMutation({
    onSuccess: async () => {
      await utils.card.all.invalidate();
      store.setState({ selectedCards: [] });
      onOpenChange(false);
    },
  });

  const handleDelete = () => {
    deleteCards.mutate(selectedCards);
  };
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t("delete.title", { count: selectedCards.length })}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t("delete.description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("delete.cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            {t("delete.configm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCards;
