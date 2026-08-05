import { useEffect, useState } from "react";
import { Nav, Collapse } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import Icon from "../ui/Icon";
import { menuItems, findParentMenuId, isMenuPathActive } from "./menuItems";
import { ChevronDown } from "react-bootstrap-icons";

interface SidebarProps {
  isOpen: boolean;
  /** Gọi sau khi điều hướng — dùng để đóng sidebar trên mobile */
  onNavigate: () => void;
}

const ROW_BASE =
  "d-flex align-items-center w-100 p-3 rounded-3 border-0 text-start text-decoration-none";

const Sidebar = ({ isOpen, onNavigate }: SidebarProps) => {
  const { pathname } = useLocation();

  // Chỉ 1 nhóm được mở tại 1 thời điểm - luôn đồng bộ theo route đang active
  const [openMenuId, setOpenMenuId] = useState<string | null>(
    () => findParentMenuId(pathname) ?? null,
  );

  useEffect(() => {
    setOpenMenuId(findParentMenuId(pathname) ?? null);
  }, [pathname]);

  const toggleMenu = (menuId: string) => {
    setOpenMenuId((prev) => (prev === menuId ? null : menuId));
  };

  // Desktop: hover vào "cửa sổ" sidebar là mở rộng nó (đè lên nội dung), rời chuột là thu hẹp lại.
  // Nội dung bên trong (app-sidebar-inner) không hề đổi kích thước theo - luôn render y hệt nhau.
  const [isHovered, setIsHovered] = useState(false);
  const expanded = isOpen || isHovered;

  return (
    <aside
      className={clsx(
        "app-sidebar border-end position-fixed start-0",
        isOpen && "is-open",
        expanded && "is-expanded",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        // Rời chuột: bỏ mọi thao tác bấm tay trong lúc hover, chỉ giữ đúng nhóm khớp trang đang xem
        setOpenMenuId(findParentMenuId(pathname) ?? null);
      }}
    >
      {/* Nội dung thật - LUÔN full width, KHÔNG bao giờ co giãn/reflow. .app-sidebar (ngoài) mới là thứ co giãn để clip. */}
      <div className="app-sidebar-inner d-flex flex-column">
        <div className="flex-grow-1 overflow-y-auto overflow-x-hidden custom-sidebar-scroll">
          <Nav className="flex-column px-2 pb-4">
            {menuItems.map((item) => {
              if (item.children) {
                const isOpenGroup = openMenuId === item.id;
                const hasActiveChild = item.children.some((child) =>
                  isMenuPathActive(pathname, child.id),
                );

                return (
                  <div key={item.id} className="w-100 mb-1">
                    <button
                      type="button"
                      aria-expanded={isOpenGroup}
                      title={!expanded ? item.label : undefined}
                      onClick={() => toggleMenu(item.id)}
                      className={clsx(
                        ROW_BASE,
                        hasActiveChild
                          ? "bg-primary text-white shadow-sm"
                          : "bg-transparent text-body hover-menu-item",
                      )}
                    >
                      <span
                        className="flex-shrink-0 d-flex align-items-center justify-content-center"
                        style={{ width: 20 }}
                      >
                        {item.icon}
                      </span>

                      <span className={clsx("small fw-semibold ms-3 flex-grow-1 text-truncate", !expanded && "opacity-0")}>
                        {item.label}
                      </span>

                      <span
                        className={clsx(
                          "menu-chevron d-flex ms-2 flex-shrink-0",
                          !isOpenGroup && "is-collapsed",
                          !expanded && "opacity-0",
                        )}
                      >
                        <ChevronDown size={14} />
                      </span>
                    </button>

                    <Collapse in={expanded && isOpenGroup}>
                      <div>
                        <div className="mt-1 d-flex flex-column gap-1">
                          {item.children.map((child) => (
                            <NavLink
                              key={child.id}
                              to={`/${child.id}`}
                              onClick={onNavigate}
                              className={({ isActive }) =>
                                clsx(
                                  "ps-5 py-2 mx-2 rounded-2 small text-decoration-none text-truncate",
                                  isActive
                                    ? "bg-primary bg-opacity-10 text-primary fw-bold"
                                    : "text-body hover-menu-item fw-semibold",
                                )
                              }
                            >
                              {child.label}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    </Collapse>
                  </div>
                );
              }

              return (
                <NavLink
                  key={item.id}
                  to={`/${item.id}`}
                  onClick={onNavigate}
                  title={!expanded ? item.label : undefined}
                  className={({ isActive }) =>
                    clsx(
                      ROW_BASE,
                      "mb-1",
                      isActive
                        ? "bg-primary text-white shadow-sm"
                        : "text-body hover-menu-item",
                    )
                  }
                >
                  <span
                    className="flex-shrink-0 d-flex align-items-center justify-content-center"
                    style={{ width: 20 }}
                  >
                    {item.icon}
                  </span>
                  <span className={clsx("small fw-semibold ms-3 flex-grow-1 text-truncate", !expanded && "opacity-0")}>
                    {item.label}
                  </span>
                </NavLink>
              );
            })}
          </Nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;