export const getTimeDifference = (startTime, endTime) => {
  if (!startTime || !endTime) return "0h 0m";

  const diff = endTime - startTime;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}h ${minutes}m`;
};
