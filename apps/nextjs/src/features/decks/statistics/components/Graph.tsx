import { useState } from "react";
import { GRADE_COLORS } from "@/features/decks/review/config/colors";
import { Grade } from "@/features/decks/review/types";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { type RouterOutputs } from "@memory-mate/api";

type Props = {
  review: RouterOutputs["deckReview"]["recap"]["lastReview"];
};

export const Graph = ({ review }: Props) => {
  const [maxAmount, setMaxAmount] = useState(0);
  const data = Grade.map((grade) => {
    const amount = review.cardReviews.filter(
      (review) => review.grade === grade,
    ).length;
    if (amount > maxAmount) {
      setMaxAmount(amount);
    }
    return {
      name: grade,
      amount,
    };
  });
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} tickCount={maxAmount + 1} />
        <Bar dataKey={"amount"} minPointSize={3}>
          {data.map((entry, index) => (
            <Cell
              key={entry.name.toString() + index.toString()}
              fill={GRADE_COLORS[entry.name]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
