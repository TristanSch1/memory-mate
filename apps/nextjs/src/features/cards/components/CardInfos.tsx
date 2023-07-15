import dayjs from "dayjs";

import { type RouterOutputs } from "@memory-mate/api";

type Props = {
  card: NonNullable<RouterOutputs["card"]["byId"]>;
};

const InfoLine = ({ label, value }) => {
  return (
    <div className={"flex items-center justify-between"}>
      <span>{label}</span>
      <span className={"text-muted-foreground"}>{value}</span>
    </div>
  );
};

const CardInfos = ({ card }: Props) => {
  return (
    <div className={"space-y-1"}>
      <label className={"heading text-md"}>Infos</label>
      <InfoLine
        label={"Créé le"}
        value={dayjs(card.createdAt).format("DD/MM/YYYY")}
      />
      <InfoLine
        label={"Modifié le"}
        value={dayjs(card.updatedAt).format("DD/MM/YYYY")}
      />
      <InfoLine label={"Nombre de révisions"} value={card.reviews.length} />
    </div>
  );
};

export default CardInfos;
