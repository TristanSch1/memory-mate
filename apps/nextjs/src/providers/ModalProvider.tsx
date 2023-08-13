import { createContext, useContext, useState, type ReactNode } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CreateCard, type CreateCardProps } from "@/features/cards";
import { CreateDeck } from "@/features/decks";

const MODALS = ["createCard", "createDeck"] as const;
export type ModalName = typeof MODALS[number];

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

const MODAL_CONTENT: {
  [key in ModalName]: (props?: any) => ReactNode;
} = {
  createCard: (props: CreateCardProps) => <CreateCard {...props} />,
  createDeck: () => <CreateDeck />,
};

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
      <Dialog open={!!modal} onOpenChange={handleOpenChange}>
        <DialogContent>
          {modal && MODAL_CONTENT[modal.name](modal.props)}
        </DialogContent>
      </Dialog>
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
