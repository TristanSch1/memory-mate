import { Loader } from "@/components/ui/loader";
import { api } from "@/utils/api";
import { useTranslation } from "next-i18next";

import { FolderCard } from "./FolderCard";

export const FoldersList = () => {
  const { t } = useTranslation("folder");
  const folderQuery = api.folder.all.useQuery();
  if (folderQuery.status === "loading") {
    return <Loader />;
  }

  if (folderQuery.data?.length === 0) {
    return (
      <div className={"flex h-full w-full items-center justify-center"}>
        {t("noFolder")}
      </div>
    );
  }
  return (
    <div>
      {folderQuery.data?.map((folder) => {
        return <FolderCard key={folder.id} folder={folder} />;
      })}
    </div>
  );
};
