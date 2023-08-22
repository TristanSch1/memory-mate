import { signOut } from "next-auth/react";
import { useTranslation } from "next-i18next";

export const Logout = () => {
  const { t } = useTranslation("common");
  return (
    <p onClick={() => void signOut()} className={"text-destructive"}>
      {t("settings.logout")}
    </p>
  );
};
