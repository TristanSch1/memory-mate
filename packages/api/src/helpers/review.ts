export const calculateEasinessFactor = (
  grade: number,
  easinessFactor = 2.5,
) => {
  const EF = easinessFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  return EF < 1.3 ? 1.3 : EF;
};

export const getInterval = (
  grade: number,
  easinessFactor: number,
  interval = 1,
  streak = 0,
) => {
  if (grade < 3) {
    return 1;
  }

  if (streak === 0) return 1;

  if (streak === 1) return 6;

  return Math.round(interval * easinessFactor);
};

export const getStreak = (grade: number, streak = 0) => {
  if (grade < 3) {
    return 0;
  }

  return streak + 1;
};
