import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DeckForm from "@/features/decks/components/DeckForm";
import { useTranslation } from "next-i18next";

const CreateDeck = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation("deck");
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button>{t("new")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("new")}</DialogTitle>
          <DialogDescription>{t("create")}</DialogDescription>
        </DialogHeader>
        <DeckForm onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateDeck;
