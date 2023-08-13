import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { api } from "@/utils/api";

import CardForm from "../components/CardForm";
import CardInfos from "../components/CardInfos";

type Props = {
  id: string;
  onSuccess?: () => void;
};
export const EditCard = ({ id, onSuccess }: Props) => {
  const { data: card, isLoading } = api.card.byId.useQuery(id || "");
  if (isLoading || !card?.id) {
    return null;
  }
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
