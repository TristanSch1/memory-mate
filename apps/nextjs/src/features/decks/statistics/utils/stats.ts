import { GRADES } from "../../review/types";

type TObjWithGrade = {
  grade: number;
};
export const getStatsForGraph = (data: TObjWithGrade[]) => {
  const stats = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  GRADES.forEach((grade) => {
    stats[grade] = data.filter((item) => item.grade === grade).length;
  });

  return stats;
};
