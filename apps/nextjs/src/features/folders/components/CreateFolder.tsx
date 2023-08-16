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
import { useTranslation } from "next-i18next";

import { FolderForm } from "./FolderForm";

export const CreateFolder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation("folder");
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
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
