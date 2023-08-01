import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteCards from "@/features/cards/components/DeleteCards";
import { MoreVertical, TrashIcon } from "lucide-react";
import { useTranslation } from "next-i18next";

const CardActions = () => {
  const { t } = useTranslation("card");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setDeleteDialogOpen(true)}>
            <TrashIcon className={"mr-2 h-4 w-4"} />
            {t("delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteCards open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} />
    </>
  );
};

export default CardActions;
