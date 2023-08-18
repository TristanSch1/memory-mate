import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { type TFolder } from "@/features/folders";
import { useTranslation } from "next-i18next";

import { FolderForm } from "../components/FolderForm";

export type CreateOrEditFolderProps = {
  folder?: TFolder;
  onSuccess?: () => void;
};
export const CreateOrEditFolder = ({
  folder,
  onSuccess,
}: CreateOrEditFolderProps) => {
  const { t } = useTranslation("common");
  const mode = folder ? "edit" : "create";
  return (
    <>
      <DialogHeader>
        <DialogTitle>{t(`folder.${mode}.title`)}</DialogTitle>
      </DialogHeader>
      <FolderForm onSuccess={onSuccess} data={folder} />
    </>
  );
};
