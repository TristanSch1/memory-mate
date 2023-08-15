import { api } from "@/utils/api";
import { useTranslation } from "next-i18next";

import { DeckCard } from "./DeckCard";

type Props = {
  search?: string;
};
export const DeckList = ({ search }: Props) => {
  const { t } = useTranslation("deck");
  const deckQuery = api.deck.all.useQuery({ search });
  if (deckQuery.status === "loading") {
    //TODO LOADER
    return <div>Chargement...</div>;
  }

  if (deckQuery.data?.length === 0) {
    return (
      <div className={"flex h-full w-full items-center justify-center"}>
        {t("noDeck")}
      </div>
    );
  }
  return (
    <div className={"space-y-4"}>
      {deckQuery.data?.map((deck) => {
        return <DeckCard deck={deck} key={deck.id} />;
      })}
    </div>
  );
};
