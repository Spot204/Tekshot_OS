import Icon from "../../ui/Icon";
import HeaderThemeToggle from "./HeaderThemeToggle";
import { ICON_SIZE } from "./constants";

/** Quá số này thì hiện "9+" cho khỏi vỡ chấm tròn */
const MAX_BADGE_COUNT = 9;

interface HeaderActionsProps {
  /** 0 thì không vẽ chấm đỏ */
  notificationCount?: number;
}

export default function HeaderActions({
  notificationCount = 0,
}: HeaderActionsProps) {
  const hasBadge = notificationCount > 0;

  return (
    <>
      <button
        type="button"
        className="app-header-icon-btn"
        aria-label={
          hasBadge ? `Thông báo, ${notificationCount} chưa đọc` : "Thông báo"
        }
      >
        <Icon name="bell" size={ICON_SIZE.action} />
        {hasBadge && (
          <span className="app-header-badge" aria-hidden="true">
            {notificationCount > MAX_BADGE_COUNT
              ? `${MAX_BADGE_COUNT}+`
              : notificationCount}
          </span>
        )}
      </button>

      <button
        type="button"
        className="app-header-icon-btn d-none d-sm-inline-flex"
        aria-label="Trợ giúp"
      >
        <Icon name="question-circle" size={ICON_SIZE.action} />
      </button>

      <button
        type="button"
        className="app-header-icon-btn d-none d-sm-inline-flex"
        aria-label="Cấu hình"
      >
        <Icon name="gear" size={ICON_SIZE.action} />
      </button>

      <HeaderThemeToggle />
    </>
  );
}
