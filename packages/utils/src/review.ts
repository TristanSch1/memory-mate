import { millisecondsToSeconds, twoDigits } from "./time";

/**
 * Formats a duration in milliseconds to a human-readable format
 * @param duration Duration in milliseconds
 * @returns A string in the format of `hh:mm:ss`
 */
export const formatDuration = (duration: number) => {
  const durationInSeconds = Math.floor(millisecondsToSeconds(duration));
  const seconds = durationInSeconds % 60;
  const minutes = Math.floor((durationInSeconds / 60) % 60);
  const hours = Math.floor(durationInSeconds / 3600);
  return `${twoDigits(hours)}:${twoDigits(minutes)}:${twoDigits(seconds)}`;
};

/**
 * Formats a duration in milliseconds to a human-readable format
 * @param duration Duration in milliseconds
 * @returns A string in the format of `mm:ss`
 */
export const formatCardReviewDuration = (duration: number) => {
  const seconds = Math.floor(duration % 60);
  const minutes = Math.floor((duration / 60) % 60);
  return `${minutes}.${seconds}s`;
};
