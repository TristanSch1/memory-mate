import { api } from "@/utils/api";

type Props = {
  deckId: string;
};

const CardList = ({ deckId }: Props) => {
  const { data: cards } = api.card.all.useQuery({ deckId });
  return (
    <div>
      {cards?.map((card) => (
        <div key={card.id}>
          <h3>{card.front}</h3>
          <p>{card.back}</p>
        </div>
      ))}
    </div>
  );
};

export default CardList;
