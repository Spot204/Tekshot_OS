import { useEffect, useState } from "react";
import { Nav, Stack, Collapse } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import Icon from "../ui/Icon";
import { menuItems, findParentMenuId, isMenuPathActive } from "./menuItems";

interface SidebarProps {
  isOpen: boolean;
  /** Gọi sau khi điều hướng — dùng để đóng sidebar trên mobile */
  onNavigate: () => void;
}

const ROW_BASE =
  "d-flex align-items-center justify-content-between w-100 p-3 rounded-3 border-0 text-start text-decoration-none";

const Sidebar = ({ isOpen, onNavigate }: SidebarProps) => {
  const { pathname } = useLocation();

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>(() => {
    const parent = findParentMenuId(pathname);
    return parent ? { [parent]: true } : {};
  });

  // Vào URL trực tiếp (hoặc bấm back) thì mở sẵn nhóm chứa route đang active
  useEffect(() => {
    const parent = findParentMenuId(pathname);
    if (!parent) return;
    setOpenMenus((prev) => (prev[parent] ? prev : { ...prev, [parent]: true }));
  }, [pathname]);

  const toggleMenu = (menuId: string) => {
    setOpenMenus((prev) => ({ ...prev, [menuId]: !prev[menuId] }));
  };

  return (
    <aside
      className={clsx(
        "app-sidebar border-end d-flex flex-column position-fixed start-0",
        isOpen && "is-open",
      )}
    >
      <div className="flex-grow-1 overflow-y-auto overflow-x-hidden  custom-sidebar-scroll">
        <Nav className="flex-column px-2 pb-4">
          {menuItems.map((item) => {
            // Nhóm cha không phải link — chỉ đóng/mở, và sáng lên khi con active
            if (item.children) {
              const isOpenGroup = !!openMenus[item.id];
              const hasActiveChild = item.children.some((child) =>
                isMenuPathActive(pathname, child.id),
              );

              return (
                <div key={item.id} className="w-100 mb-1">
                  <button
                    type="button"
                    aria-expanded={isOpenGroup}
                    onClick={() => toggleMenu(item.id)}
                    className={clsx(
                      ROW_BASE,
                      hasActiveChild
                        ? "bg-primary text-white shadow-sm"
                        : "bg-transparent text-body hover-menu-item",
                    )}
                  >
                    <Stack direction="horizontal" gap={3}>
                      <span className="flex-shrink-0 d-flex">{item.icon}</span>
                      <span className="small fw-semibold">{item.label}</span>
                    </Stack>

                    <span
                      className={clsx(
                        "menu-chevron d-flex",
                        !isOpenGroup && "is-collapsed",
                      )}
                    >
                      <Icon name="chevron-down" size={14} />
                    </span>
                  </button>

                  <Collapse in={isOpenGroup}>
                    <div>
                      <div className="mt-1 d-flex flex-column gap-1">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.id}
                            to={`/${child.id}`}
                            onClick={onNavigate}
                            className={({ isActive }) =>
                              clsx(
                                "ps-5 py-2 mx-2 rounded-2 small text-decoration-none",
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
                <Stack direction="horizontal" gap={3}>
                  <span className="flex-shrink-0 d-flex">{item.icon}</span>
                  <span className="small fw-semibold">{item.label}</span>
                </Stack>
              </NavLink>
            );
          })}
        </Nav>
      </div>
    </aside>
  );
};

export default Sidebar;
