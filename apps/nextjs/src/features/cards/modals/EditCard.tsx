import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { type TCard } from "@/features/cards";

import CardForm from "../components/CardForm";
import CardInfos from "../components/CardInfos";

export type EditCardProps = {
  card: TCard;
  onSuccess?: () => void;
};
export const EditCard = ({ card, onSuccess }: EditCardProps) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Modifier</DialogTitle>
      </DialogHeader>
      <CardInfos card={card} />
      <CardForm
        onSuccess={onSuccess}
        card={{ front: card.front, back: card.back, id: card.id }}
      />
    </>
  );
};
