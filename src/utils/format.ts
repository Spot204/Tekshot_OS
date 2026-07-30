/** Định dạng dùng chung — mọi chỗ hiển thị tiền/ngày đi qua đây */

const pad = (value: number) => String(value).padStart(2, "0");

/** 2450000 -> "2.450.000" */
export const formatNumber = (value: number): string =>
  new Intl.NumberFormat("vi-VN").format(value);

/** 2450000 -> "2.450.000đ" */
export const formatCurrency = (value: number): string =>
  `${formatNumber(value)}đ`;

/** ISO -> "28/07/2026" */
export const formatDate = (iso: string): string => {
  const date = new Date(iso);
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
};

/** ISO -> "10:15" */
export const formatTime = (iso: string): string => {
  const date = new Date(iso);
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

/** ISO -> "28/07/2026 10:15" */
export const formatDateTime = (iso: string): string =>
  `${formatDate(iso)} ${formatTime(iso)}`;

/** Mốc 00:00 của ngày chứa `value`, trả Date mới nên không sửa input */
const startOfDay = (value: Date | string): number => {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
};

/**
 * So sánh chỉ theo ngày, bỏ qua giờ.
 * `from`/`to` là Date đang nằm trong state nên tuyệt đối không mutate.
 */
export const isWithinRange = (
  iso: string,
  from: Date | null,
  to: Date | null,
): boolean => {
  const time = startOfDay(iso);
  if (from && time < startOfDay(from)) return false;
  if (to && time > startOfDay(to)) return false;
  return true;
};
