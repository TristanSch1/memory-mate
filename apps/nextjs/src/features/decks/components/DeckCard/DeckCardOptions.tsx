import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import IconButton, { type IconButtonProps } from "@/components/ui/icon-button";
import { MoreVertical } from "lucide-react";

export const DeckCardOptions = (props: IconButtonProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IconButton {...props}>
          <MoreVertical
            className={"text-neutral-500 group-hover:text-neutral-950"}
          />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Test</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Modifier</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
