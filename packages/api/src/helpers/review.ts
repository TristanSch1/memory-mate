export const calculateEasinessFactor = (rate: number, easinessFactor = 2.5) => {
  const EF = easinessFactor + (0.1 - (5 - rate) * (0.08 + (5 - rate) * 0.02));
  return EF < 1.3 ? 1.3 : EF;
};

export const getInterval = (
  rate: number,
  easinessFactor: number,
  interval = 1,
  streak = 0,
) => {
  if (rate < 3) {
    return 1;
  }

  if (streak === 0) return 1;

  if (streak === 1) return 6;

  return Math.round(interval * easinessFactor);
};

export const getStreak = (rate: number, streak = 0) => {
  if (rate < 3) {
    return 0;
  }

  return streak + 1;
};
