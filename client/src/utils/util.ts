export const getTimeAgo = (timestamp: Date) => {
  const currentTimestamp = Math.floor(Date.now() / 1000); // Convert to seconds

  const elapsedSeconds =
    currentTimestamp - Math.floor(new Date(timestamp).getTime() / 1000);

  if (elapsedSeconds < 60) {
    return `${elapsedSeconds}s`;
  } else if (elapsedSeconds < 3600) {
    const minutes = Math.floor(elapsedSeconds / 60);
    return `${minutes}m`;
  } else if (elapsedSeconds < 86400) {
    const hours = Math.floor(elapsedSeconds / 3600);
    return `${hours}h`;
  } else {
    const days = Math.floor(elapsedSeconds / 86400);
    return `${days}d`;
  }
};
