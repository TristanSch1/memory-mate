import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/providers/ModalProvider";
import { MoreVertical, TrashIcon } from "lucide-react";
import { useTranslation } from "next-i18next";
import { useStore } from "zustand";

import { useCardStore } from "./CardsProvider";

const CardActions = () => {
  const { t } = useTranslation("card");
  const cardStore = useCardStore();
  const { selectedCards } = useStore(cardStore, (state) => ({
    selectedCards: state.selectedCards,
  }));
  const { open } = useModal();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => open("deleteCard", { cardIds: selectedCards })}
          >
            <TrashIcon className={"mr-2 h-4 w-4"} />
            {t("delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CardActions;
