import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { GRADE_COLORS } from "../../review/config/colors";
import { type TGrade } from "../../review/types";

export type GraphProps = {
  stats: { [key in TGrade]: number };
};

export const Graph = ({ stats }: GraphProps) => {
  const { data, maxAmount } = useMemo(() => {
    let maxAmount = 0;
    const data = Object.entries(stats).map(([name, amount]) => {
      if (amount > maxAmount) {
        maxAmount = amount;
      }
      return { name, amount };
    });

    return { data, maxAmount };
  }, [stats]);
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
