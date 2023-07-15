import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CardForm from "@/features/cards/components/CardForm";
import CardInfos from "@/features/cards/components/CardInfos";
import { useCardStore } from "@/features/cards/components/CardsProvider";
import { api } from "@/utils/api";
import { useStore } from "zustand";

const CardEdit = () => {
  const store = useCardStore();
  const { editingCardId, setEditingCardId } = useStore(store, (state) => ({
    setEditingCardId: state.setEditingCardId,
    editingCardId: state.editingCardId,
  }));
  const { data: card, isLoading } = api.card.byId.useQuery(editingCardId || "");
  if (isLoading || !card) {
    return null;
  }
  return (
    <Dialog
      open={!!card}
      onOpenChange={(open) => {
        if (!open) {
          setEditingCardId(null);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier</DialogTitle>
        </DialogHeader>
        <CardInfos card={card} />
        <CardForm
          onSuccess={() => setEditingCardId(null)}
          card={{ front: card.front, back: card.back, id: card.id }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CardEdit;
