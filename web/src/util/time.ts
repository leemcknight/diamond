export function gameDuration(totalMinutes?: number): string {
  if (totalMinutes) {
    const hours = totalMinutes / 60;
    const minutes = 0;
    return `${String(hours)}:${String(minutes)}`;
  } else return "unknown";
}
