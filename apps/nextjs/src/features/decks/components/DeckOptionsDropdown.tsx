import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import IconButton, { type IconButtonProps } from "@/components/ui/icon-button";
import { Pencil, Trash } from "lucide-react";
import { useTranslation } from "next-i18next";

export const DeckOptionsDropdown = ({
  children,
  ...props
}: IconButtonProps) => {
  const { t } = useTranslation("deck");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IconButton {...props}>{children}</IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
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
