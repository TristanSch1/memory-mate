import { useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DeckFinder } from "@/features/decks";
import { useFolder } from "@/features/folders";
import { api } from "@/utils/api";

type Props = {
  children: ReactNode;
  onSuccess?: () => void;
};

export const FolderAddDeck = ({ children, onSuccess }: Props) => {
  const [open, setOpen] = useState(false);
  const { folderId } = useFolder();
  const utils = api.useContext();

  const { mutate } = api.folder.addDeck.useMutation({
    onSuccess: async () => {
      await utils.folder.byId.invalidate(folderId);
      onSuccess?.();
    },
  });

  const handleSelect = (deckId: string) => {
    try {
      mutate({ deckId, folderId });
      setOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DeckFinder onSelect={handleSelect} />
      </DialogContent>
    </Dialog>
  );
};
