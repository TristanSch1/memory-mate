import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FolderForm } from "@/features/folders/components/FolderForm";
import { useTranslation } from "next-i18next";

export const CreateFolder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation("folder");
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button>{t("new")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("new")}</DialogTitle>
          <DialogDescription>{t("create")}</DialogDescription>
        </DialogHeader>
        <FolderForm onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
