import DeckForm from "@/features/decks/components/DeckForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const CreateDeck = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
      <Button>Nouveau deck</Button>
      </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Nouveau deck
            </DialogTitle>
            <DialogDescription>
              Créer un nouveau deck
            </DialogDescription>
          </DialogHeader>
          <DeckForm onSuccess={() => setIsOpen(false)}/>
        </DialogContent>
      </Dialog>
  );
};

export default CreateDeck;
