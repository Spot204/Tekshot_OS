import Icon from "../../ui/Icon";
import HeaderBrand from "./HeaderBrand";
import HeaderSearch from "./HeaderSearch";
import HeaderActions from "./HeaderActions";
import HeaderUser from "./HeaderUser";
import { ICON_SIZE } from "./constants";
import { currentUser, unreadNotifications } from "../../../mocks/user";

interface HeaderProps {
  /** Nút chỉ hiện ở mobile */
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="app-header position-fixed top-0 start-0 end-0 d-flex align-items-center">
      <button
        type="button"
        className="app-header-icon-btn d-lg-none ms-2 flex-shrink-0"
        aria-label="Mở menu"
        onClick={onToggleSidebar}
      >
        <Icon name="list" size={ICON_SIZE.action} />
      </button>

      <HeaderBrand />

      {/* Vẫn chiếm chỗ khi ô tìm kiếm ẩn dưới md */}
      <div className="flex-grow-1 d-flex justify-content-center px-2 px-xl-4">
        <HeaderSearch />
      </div>

      <div className="d-flex align-items-center gap-1 flex-shrink-0 pe-2 pe-lg-4">
        <HeaderActions notificationCount={unreadNotifications} />
        <HeaderUser {...currentUser} />
      </div>
    </header>
  );
}
