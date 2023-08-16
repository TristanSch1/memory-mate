import { millisecondsToDays } from "@memory-mate/utils";

export const calculateEasinessFactor = (
  grade: number,
  easinessFactor = 2.5,
) => {
  const EF = easinessFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  return EF < 1.3 ? 1.3 : EF;
};

export const dueDateToInterval = (dueDate: Date) => {
  const now = new Date();
  const diff = dueDate.getTime() - now.getTime();

  return Math.round(millisecondsToDays(diff));
};

/**
 * Calculates interval in days for next review based on grade, easiness factor, interval and streak
 * @param grade
 * @param easinessFactor
 * @param interval
 * @param streak
 */
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

/**
 * Calculates grade average progress in percentage
 * @param current - current grade average
 * @param to - grade average to
 * @returns grade average progress in percentage
 */
export const getGradeAverageProgress = (current: number, to: number) => {
  if (current === 0) return 100;
  const progress = (to * 100) / current;

  return parseFloat((progress - 100).toFixed(2));
};

export const formatGradeAverage = (gradeAverage: number) => {
  return parseFloat(gradeAverage.toFixed(2));
};
