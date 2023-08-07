import { Grade } from "@/features/decks/review/types";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { type RouterOutputs } from "@memory-mate/api";

type Props = {
  review: RouterOutputs["deckReview"]["recap"]["lastReview"];
};

export const Graph = ({ review }: Props) => {
  const data = Grade.map((grade) => ({
    name: grade,
    value: review.cardReviews.filter((review) => review.grade === grade).length,
  }));
  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={"value"} fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};
