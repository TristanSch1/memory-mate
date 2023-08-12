import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { api } from "@/utils/api";
import _ from "lodash";
import { useTranslation } from "next-i18next";

type DeckFinderProps = {
  onSelect?: (deckId: string) => void;
};
export const DeckFinder = ({ onSelect }: DeckFinderProps) => {
  const { t } = useTranslation("deck");
  const [search, setSearch] = useState("");
  const { data: decks } = api.deck.all.useQuery({ search });
  return (
    <Command>
      <CommandInput
        placeholder={t("search")}
        onValueChange={(v) => {
          _.debounce(() => {
            setSearch(v);
          }, 500);
        }}
      />
      <CommandEmpty>No framework found.</CommandEmpty>
      <CommandGroup>
        {decks?.map((deck) => (
          <CommandItem
            key={deck.id}
            onSelect={(value) => {
              onSelect?.(value);
            }}
            value={deck.id}
          >
            {deck.name}
          </CommandItem>
        ))}
      </CommandGroup>
    </Command>
  );
};
