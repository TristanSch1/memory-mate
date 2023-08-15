import { Input } from "@/components/ui/input";
import _ from "lodash";
import { Search } from "lucide-react";
import { useTranslation } from "next-i18next";

type Props = {
  onChange: (value: string) => void;
};
export const DeckSearchBar = ({ onChange }: Props) => {
  const { t } = useTranslation("deck");
  const handleChange = _.debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
    500,
  );
  return (
    <div className={"relative"}>
      <Input
        className={"pl-10"}
        placeholder={t("search")}
        onChange={handleChange}
      />
      <Search
        className={"text-muted-foreground absolute left-2 top-2"}
        size={24}
      />
    </div>
  );
};
