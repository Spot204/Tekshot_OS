import type { ReactNode } from "react";
import {
  ShoppingCart,
  Box,
  Warehouse,
  Wallet,
  Receipt,
  Contact,
  ChartColumn,
  UserRound,
  Settings,
} from "lucide-react";

export interface SubMenuItem {
  /** Vừa là id, vừa là path: điều hướng tới `/${id}` */
  id: string;
  label: string;
}

export interface MenuItem extends SubMenuItem {
  icon: ReactNode;
  children?: SubMenuItem[];
}

/**
 * Nguồn duy nhất cho menu sidebar.
 *
 * `id` được dùng trực tiếp làm URL (`/${id}`), nên mỗi id ở đây cần có
 * một <Route> tương ứng trong AppRouter — nếu không sẽ rơi vào route
 * catch-all và hiện trang "đang phát triển".
 *
 * Khai báo ngoài component để không tạo lại mảng mỗi lần render.
 */
export const menuItems: MenuItem[] = [
  { id: "order", label: "Đơn hàng", icon: <ShoppingCart size={18} /> },
  {
    id: "hang-hoa",
    label: "Hàng hóa",
    icon: <Box size={18} />,
    children: [
      { id: "san-pham", label: "Sản phẩm" },
      { id: "vat-tu", label: "Vật tư" },
      { id: "combo", label: "Combo" },
    ],
  },
  {
    id: "kho-hang",
    label: "Kho hàng",
    icon: <Warehouse size={18} />,
    children: [
      { id: "nguyen-lieu", label: "Nguyên liệu" },
      { id: "dung-cu", label: "Dụng cụ" },
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

/**
 * Path có đang trỏ vào menu id này không.
 * Khớp cả route con (`/invoice-in/123`) để sau này thêm trang chi tiết
 * thì sidebar vẫn highlight đúng.
 */
export const isMenuPathActive = (pathname: string, id: string): boolean =>
  pathname === `/${id}` || pathname.startsWith(`/${id}/`);

/** Id của nhóm cha chứa path đang active, null nếu không thuộc nhóm nào */
export const findParentMenuId = (pathname: string): string | null =>
  menuItems.find((item) =>
    item.children?.some((child) => isMenuPathActive(pathname, child.id)),
  )?.id ?? null;
