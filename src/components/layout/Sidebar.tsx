import React, { useState, useEffect } from "react";
import { Nav, Stack, Collapse } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ShoppingCart,
  Box,
  Warehouse,
  Wallet,
  Receipt,
  ChevronDown,
  Contact,
  ChartColumn,
  UserRound,
  Settings,
} from "lucide-react";

interface SubMenuItem {
  id: string;
  label: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: SubMenuItem[];
}

interface SidebarProps {
  setIsOpen?: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location.pathname.substring(1) || "don-hang";

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    "hang-hoa": true,
    "hoa-don": true,
  });

  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.children?.some((child) => child.id === activeTab)) {
        setOpenMenus((prev) => ({ ...prev, [item.id]: true }));
      }
    });
  }, [activeTab]);

  const toggleMenu = (menuId: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const menuItems: MenuItem[] = [
    { id: "don-hang", label: "Đơn hàng", icon: <ShoppingCart size={18} /> },
    {
      id: "hang-hoa",
      label: "Hàng hóa",
      icon: <Box size={18} />,
      children: [
        { id: "san-pham", label: "Sản phẩm" },
        { id: "Ingredient-Tool", label: "Vật tư" },
        { id: "Combo", label: "Combo" },
      ],
    },
    {
      id: "kho-hang",
      label: "Kho hàng",
      icon: <Warehouse size={18} />,
      children: [
        { id: "nguyen-lieu", label: "Nguyên liệu" },
        { id: "Tool", label: "Dụng cụ" },
        { id: "inventory", label: "Tồn kho" },
        { id: "ordering", label: "Gọi hàng" },
        { id: "inbound", label: "Nhập hàng" },
        { id: "outbound", label: "Xuất hàng" },
        { id: "history", label: "Lịch sử" },
      ],
    },
    {
      id: "so-quy",
      label: "Sổ quỹ",
      icon: <Wallet size={18} />,
      children: [
        { id: "wallet", label: "Sổ quỹ" },
        { id: "cash-receipt", label: "Phiếu thu chi" },
        { id: "shift-closing", label: "Danh sách chốt ca" },
      ],
    },
    {
      id: "hoa-don",
      label: "Hóa đơn",
      icon: <Receipt size={18} />,
      children: [
        { id: "invoice-in", label: "Hóa đơn đầu vào" },
        { id: "invoice-out", label: "Hóa đơn đầu ra" },
      ],
    },
    {
      id: "nhan-su",
      label: "Nhân sự",
      icon: <UserRound size={18} />,
      children: [
        { id: "employee", label: "Nhân viên" },
        { id: "attendance", label: "Chấm công" },
      ],
    },
    { id: "customer", label: "Khách hàng", icon: <Contact size={18} /> },
    { id: "report", label: "Báo cáo", icon: <ChartColumn size={18} /> },
    { id: "setting", label: "Cấu hình", icon: <Settings size={18} /> },
  ];

  return (
    <div
      className="bg-white border-end shadow-sm vh-100 d-flex flex-column"
      style={{
        width: "260px",
        position: "fixed",
        left: 0,
        top: "72px",
        height: "calc(100vh - 72px)",
        zIndex: 1000,
      }}
    >
      <div className="flex-grow-1 overflow-y-auto overflow-x-hidden pt-3 custom-sidebar-scroll">
        <Nav className="flex-column px-2 pb-4">
          {menuItems.map((item) => {
            const isParentActive = item.children?.some(
              (child) => child.id === activeTab,
            );
            const isOpen = !!openMenus[item.id];
            const isActive = activeTab === item.id || isParentActive;

            return (
              <div key={item.id} className="w-100 mb-1">
                <div
                  onClick={() => {
                    if (item.children) {
                      toggleMenu(item.id);
                    } else {
                      navigate(`/${item.id}`);
                      setIsOpen?.(false);
                    }
                  }}
                  className={`d-flex align-items-center justify-content-between p-3 rounded-3 cursor-pointer transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "text-dark hover-menu-item"
                  }`}
                  style={{
                    cursor: "pointer",
                    transition: "0.2s all ease",
                    userSelect: "none",
                  }}
                >
                  <Stack direction="horizontal" gap={3}>
                    <div className="flex-shrink-0">{item.icon}</div>
                    <span className="small fw-semibold">{item.label}</span>
                  </Stack>

                  {item.children && (
                    <span
                      style={{
                        transition: "transform 0.3s ease",
                        transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
                      }}
                    >
                      <ChevronDown size={14} />
                    </span>
                  )}
                </div>

                {item.children && (
                  <Collapse in={isOpen}>
                    <div>
                      <div className="mt-1 d-flex flex-column gap-1">
                        {item.children.map((child) => (
                          <div
                            key={child.id}
                            onClick={() => {
                              navigate(`/${child.id}`);
                              setIsOpen?.(false);
                            }}
                            className={`ps-5 py-2 mx-2 rounded-2 small cursor-pointer transition-all ${
                              activeTab === child.id
                                ? "bg-primary bg-opacity-10 text-primary fw-bold"
                                : "text-dark hover-menu-item fw-semibold"
                            }`}
                            style={{ cursor: "pointer", transition: "0.2s" }}
                          >
                            {child.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  </Collapse>
                )}
              </div>
            );
          })}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
