const MINUTES_PER_DAY = 24 * 60;

/** "06:01" -> 361 */
export const toMinutes = (time: string): number => {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
};

/** 361 -> "06:01", tự quay vòng khi vượt quá nửa đêm */
export const fromMinutes = (minutes: number): string => {
  const wrapped = ((minutes % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;
  const hour = Math.floor(wrapped / 60);
  return `${String(hour).padStart(2, "0")}:${String(wrapped % 60).padStart(2, "0")}`;
};

export const addMinutes = (time: string, delta: number): string =>
  fromMinutes(toMinutes(time) + delta);

/** Số phút từ `from` đến `to`; ca tối vắt qua nửa đêm nên cộng bù 24h */
export const minutesBetween = (from: string, to: string): number => {
  const diff = toMinutes(to) - toMinutes(from);
  return diff < 0 ? diff + MINUTES_PER_DAY : diff;
};

/** 481 -> "8h 01m" */
export const formatDuration = (minutes: number): string =>
  `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, "0")}m`;
