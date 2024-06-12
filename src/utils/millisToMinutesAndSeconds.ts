export function millisToMinutesAndSeconds(milliseconds: number) {
  const minutes = Math.floor(milliseconds / 60_000);
  const seconds = ((milliseconds % 60_000) / 1000).toFixed(0);
  if (seconds == "60") return `${minutes + 1}:00`;
  return `${String(minutes).padStart(2, "0")}:${seconds.padStart(2, "0")}`;
}
