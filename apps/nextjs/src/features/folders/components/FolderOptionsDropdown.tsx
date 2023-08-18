import { useRouter } from "next/router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import IconButton, { type IconButtonProps } from "@/components/ui/icon-button";
import { type TFolder } from "@/features/folders";
import { useModal } from "@/providers/ModalProvider";
import { URLPath } from "@/routes";
import { Pencil, Trash } from "lucide-react";
import { useTranslation } from "next-i18next";

type Props = IconButtonProps & {
  folder: TFolder;
};
export const FolderOptionsDropdown = ({
  folder,
  children,
  ...props
}: Props) => {
  const { t } = useTranslation("folder");
  const { push } = useRouter();
  const { open, close } = useModal();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IconButton {...props}>{children}</IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => open("folderForm", { folder, onSuccess: close })}
        >
          <Pencil className={"mr-2 h-4 w-4"} />
          <span>{t("menu.edit")}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={"text-destructive"}
          onClick={() =>
            open("deleteFolder", {
              folder,
              onSuccess: () => {
                void push(URLPath.folders);
              },
            })
          }
        >
          <Trash className={"mr-2 h-4 w-4"} />
          <span>{t("menu.delete")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
