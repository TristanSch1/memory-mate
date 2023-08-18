import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { type TFolder } from "@/features/folders";
import { api } from "@/utils/api";
import { useTranslation } from "next-i18next";

export type DeleteFolderProps = {
  folder: TFolder;
  onSuccess?: () => void;
};
export const DeleteFolder = ({ folder, onSuccess }: DeleteFolderProps) => {
  const { t } = useTranslation("common");
  const utils = api.useContext();
  const deleteFolder = api.folder.delete.useMutation({
    onSuccess: async () => {
      await utils.folder.all.invalidate();
      onSuccess?.();
    },
  });

  const handleDelete = () => {
    deleteFolder.mutate(folder.id);
  };
  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>{t("folder.delete.title")}</AlertDialogTitle>
        <AlertDialogDescription>
          {t("folder.delete.description")}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>{t("folder.delete.cancel")}</AlertDialogCancel>
        <AlertDialogAction onClick={handleDelete}>
          {t("folder.delete.confirm")}
        </AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
};
