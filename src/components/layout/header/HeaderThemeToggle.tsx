import Icon from "../../ui/Icon";
import { useTheme } from "../../../hooks/useTheme";
import { ICON_SIZE } from "./constants";

/** Icon hiện theme sẽ chuyển sang, không phải theme đang dùng */
export default function HeaderThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="app-header-icon-btn"
      aria-label={
        isDark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"
      }
      aria-pressed={isDark}
      onClick={toggleTheme}
    >
      {isDark ? (
        <Icon name="sun" size={ICON_SIZE.action} />
      ) : (
        <Icon name="moon" size={ICON_SIZE.action} />
      )}
    </button>
  );
}
