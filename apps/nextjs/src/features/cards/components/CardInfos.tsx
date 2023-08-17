import { type TCard } from "@/features/cards";
import dayjs from "dayjs";

type Props = {
  card: TCard;
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
      <InfoLine
        label={"Nombre de révisions"}
        value={card._count?.reviews ?? "0"}
      />
    </div>
  );
};

export default CardInfos;
