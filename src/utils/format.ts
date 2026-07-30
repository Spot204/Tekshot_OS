/** Định dạng dùng chung — mọi chỗ hiển thị tiền/ngày đi qua đây */

const pad = (value: number) => String(value).padStart(2, "0");

/** 2450000 -> "2.450.000" */
export const formatNumber = (value: number): string =>
  new Intl.NumberFormat("vi-VN").format(value);

/** 2450000 -> "2.450.000đ" */
export const formatCurrency = (value: number): string =>
  `${formatNumber(value)}đ`;

/** 100000000 -> "100M". Dùng cho nhãn trục biểu đồ, không dùng cho số liệu. */
export const formatCompact = (value: number): string => {
  if (Math.abs(value) >= 1_000_000_000) return `${value / 1_000_000_000}B`;
  if (Math.abs(value) >= 1_000_000) return `${value / 1_000_000}M`;
  if (Math.abs(value) >= 1_000) return `${value / 1_000}K`;
  return String(value);
};

/** 16.8 -> "+16.8%", -4.2 -> "-4.2%" */
export const formatPercent = (value: number): string =>
  `${value > 0 ? "+" : ""}${value}%`;

/** ISO -> "2 phút trước" */
export const formatRelativeTime = (iso: string): string => {
  const seconds = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return `${Math.floor(seconds)} giây trước`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} phút trước`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} giờ trước`;
  return `${Math.floor(seconds / 86400)} ngày trước`;
};

/** ISO -> "28/07/2026" */
export const formatDate = (iso: string): string => {
  const date = new Date(iso);
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
};

const WEEKDAYS = [
  "Chủ Nhật",
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ Bảy",
];

/** -> "Thứ Hai, 27/07/2026" */
export const formatDateWithWeekday = (value: Date | string): string => {
  const date = new Date(value);
  return `${WEEKDAYS[date.getDay()]}, ${formatDate(date.toISOString())}`;
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

/** So sánh theo ngày, bỏ giờ. Không mutate `from`/`to` — chúng nằm trong state. */
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
