import { useState } from "react";

import { Button } from "~/components/Button/Button";
import Modal from "~/components/Modal/Modal";
import DeckForm from "~/features/decks/components/DeckForm";

const CreateDeck = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  return (
    <>
      <Button onClick={openModal}>Nouveau deck</Button>
      <Modal isOpen={isOpen} closeModal={closeModal} title={"Créez un nouveau deck"}>
        <DeckForm />
      </Modal>
    </>
  );
};

export default CreateDeck;
