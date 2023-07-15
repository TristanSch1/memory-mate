import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CardForm from "@/features/cards/components/CardForm";

const CreateCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <label className={"text-primary hover:text-primary/90 cursor-pointer"}>
          Ajouter une carte
        </label>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouvelle carte</DialogTitle>
          <DialogDescription>Créer une nouvelle carte</DialogDescription>
        </DialogHeader>
        <CardForm onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateCard;
