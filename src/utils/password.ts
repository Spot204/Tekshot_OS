export interface PasswordStrength {
  /** 0 = trống, 1..4 = số vạch sáng */
  score: number;
  label: string;
  /** Tên token màu, dùng cho cả vạch lẫn chữ */
  color: string;
}

const RULES = [
  (value: string) => value.length >= 8,
  (value: string) => /[a-z]/.test(value) && /[A-Z]/.test(value),
  (value: string) => /\d/.test(value),
  (value: string) => /[^A-Za-z0-9]/.test(value),
];

const LEVELS: Omit<PasswordStrength, "score">[] = [
  { label: "Quá yếu", color: "var(--danger)" },
  { label: "Yếu", color: "var(--danger)" },
  { label: "Trung bình", color: "var(--warning)" },
  { label: "Khá", color: "var(--chart-brand)" },
  { label: "Mạnh", color: "var(--success)" },
];

/** Đếm tiêu chí đạt: độ dài, hoa+thường, chữ số, ký tự đặc biệt */
export const getPasswordStrength = (value: string): PasswordStrength => {
  const score = value ? RULES.filter((rule) => rule(value)).length : 0;
  return { score, ...LEVELS[score] };
};
