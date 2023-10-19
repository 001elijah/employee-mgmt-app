export const getTimeDifference = (startTime, endTime) => {
  if (!startTime || !endTime) return "0h 0m";

  console.log("startTime", startTime);
  console.log("endTime", endTime);

  const diff = endTime - startTime;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  console.log("diff", diff);
  console.log("hours", hours);
  console.log("minutes", minutes);

  return `${hours}h ${minutes}m`;
};
