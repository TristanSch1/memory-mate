import { createContext, useContext, useState, type ReactNode } from "react";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  CreateCard,
  DeleteCards,
  EditCard,
  type CreateCardProps,
  type DeleteCardsProps,
  type EditCardProps,
} from "@/features/cards";
import { CreateDeck, EditDeck, type EditDeckProps } from "@/features/decks";
import {
  DeleteDeck,
  type DeleteDeckProps,
} from "@/features/decks/modals/DeleteDeck";
import {
  CreateOrEditFolder,
  DeleteFolder,
  type CreateOrEditFolderProps,
  type DeleteFolderProps,
} from "@/features/folders";

export type ModalName =
  | "createCard"
  | "deleteCard"
  | "editCard"
  | "createDeck"
  | "editDeck"
  | "deleteDeck"
  | "folderForm"
  | "deleteFolder";

type Modal = {
  type: "alert" | "dialog";
  content: (props?: any) => ReactNode;
};

const MODALS: { [key in ModalName]: Modal } = {
  createCard: {
    type: "dialog",
    content: (props: CreateCardProps) => <CreateCard {...props} />,
  },
  deleteCard: {
    type: "alert",
    content: (props: DeleteCardsProps) => <DeleteCards {...props} />,
  },
  editCard: {
    type: "dialog",
    content: (props: EditCardProps) => <EditCard {...props} />,
  },
  createDeck: {
    type: "dialog",
    content: () => <CreateDeck />,
  },
  editDeck: {
    type: "dialog",
    content: (props: EditDeckProps) => <EditDeck {...props} />,
  },
  deleteDeck: {
    type: "alert",
    content: (props: DeleteDeckProps) => <DeleteDeck {...props} />,
  },
  folderForm: {
    type: "dialog",
    content: (props: CreateOrEditFolderProps) => (
      <CreateOrEditFolder {...props} />
    ),
  },
  deleteFolder: {
    type: "alert",
    content: (props: DeleteFolderProps) => <DeleteFolder {...props} />,
  },
};
interface ModalState {
  modal: { name: ModalName; props?: any } | null;
  open: (modalName: ModalName, props?: any) => void;
  close: () => void;
}

const ModalContext = createContext<ModalState>({
  modal: null,
  open: () => void {},
  close: () => void {},
});

type Props = {
  children: ReactNode;
};

export const ModalProvider = ({ children }: Props) => {
  const [modal, setModal] = useState<ModalState["modal"]>(null);
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setModal(null);
    }
  };

  const open = (modalName: ModalName, props?: any) => {
    setModal({ name: modalName, props });
  };

  const close = () => {
    setModal(null);
  };

  return (
    <ModalContext.Provider value={{ modal, open, close }}>
      <Dialog
        open={!!modal && MODALS[modal.name].type === "dialog"}
        onOpenChange={handleOpenChange}
      >
        <DialogContent>
          {modal && MODALS[modal.name].content(modal.props)}
        </DialogContent>
      </Dialog>
      <AlertDialog
        open={!!modal && MODALS[modal.name].type === "alert"}
        onOpenChange={handleOpenChange}
      >
        <AlertDialogContent>
          {modal && MODALS[modal.name].content(modal.props)}
        </AlertDialogContent>
      </AlertDialog>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const ctx = useContext(ModalContext);

  if (!ctx) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return ctx;
};
