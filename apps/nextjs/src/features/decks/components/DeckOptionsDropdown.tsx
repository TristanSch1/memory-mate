import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import IconButton, { type IconButtonProps } from "@/components/ui/icon-button";
import { useModal } from "@/providers/ModalProvider";
import { Pencil, Trash, WalletCards } from "lucide-react";
import { useTranslation } from "next-i18next";

type Props = IconButtonProps & {
  deckId: string;
};
export const DeckOptionsDropdown = ({ deckId, children, ...props }: Props) => {
  const { t } = useTranslation("deck");
  const { open } = useModal();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IconButton {...props}>{children}</IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => open("createCard", { deckId })}>
          <WalletCards className={"mr-2 h-4 w-4"} />
          <span>{t("deckCard.menu.addCard")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Pencil className={"mr-2 h-4 w-4"} />
          <span>{t("deckCard.menu.edit")}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className={"text-destructive"}>
          <Trash className={"mr-2 h-4 w-4"} />
          <span>{t("deckCard.menu.delete")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
