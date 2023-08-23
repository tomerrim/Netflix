export const convertDurationToSeconds = (duration) => {
  const parts = duration.split(" ");
  let totalSeconds = 0;

  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === "hours" || parts[i] === "hour") {
      totalSeconds += parseInt(parts[i - 1]) * 3600;
    }
    if (parts[i] === "min") {
      totalSeconds += parseInt(parts[i - 1]) * 60;
    }
  }

  return totalSeconds;
};

export const shorter = (item) => {
  return item && item.length > 250 ? item.substring(0, 250) + "..." : item;
};
