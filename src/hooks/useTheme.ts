import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

/** Trùng khoá với script trong index.html */
export const THEME_STORAGE_KEY = "tekshot-theme";

const THEME_ATTRIBUTE = "data-bs-theme";

/** Đọc từ DOM, không tính lại từ localStorage — index.html đã set trước */
const readAppliedTheme = (): Theme =>
  document.documentElement.getAttribute(THEME_ATTRIBUTE) === "dark"
    ? "dark"
    : "light";

/** Bootstrap 5.3 đổi màu component qua data-bs-theme (thuần CSS) */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readAppliedTheme);

  useEffect(() => {
    document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Chế độ riêng tư chặn localStorage
    }
  }, [theme]);

  const toggleTheme = useCallback(
    () => setTheme((prev) => (prev === "dark" ? "light" : "dark")),
    [],
  );

  return { theme, toggleTheme };
}
