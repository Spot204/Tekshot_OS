import Icon from "../components/ui/Icon";
import type { ReactNode } from "react";
import type { BadgeVariant } from "../components/ui/Badge";
import type {
  DepartmentId,
  EmployeeRole,
  PermissionId,
  ShiftId,
} from "../types/employee";

/** Cấu hình hiển thị của miền nhân sự — dùng chung cho trang nhân viên và chấm công */

export const ROLES: Record<
  EmployeeRole,
  { label: string; variant: BadgeVariant }
> = {
  staff: { label: "Nhân viên", variant: "primary" },
  manager: { label: "Quản lý", variant: "purple" },
  cashier: { label: "Thu ngân", variant: "success" },
  technician: { label: "Kỹ thuật", variant: "info" },
  admin: { label: "Administrator", variant: "dark" },
};

/** Thẻ chọn quyền trong form tạo tài khoản, xếp theo thứ tự quyền tăng dần */
export const PERMISSIONS: {
  id: PermissionId;
  label: string;
  description: string;
  icon: ReactNode;
}[] = [
  {
    id: "staff",
    label: "Nhân viên",
    description: "Thực hiện bán hàng, thao tác đơn hàng",
    icon: <Icon name="people" size={22} />,
  },
  {
    id: "cashier",
    label: "Thu ngân",
    description: "Thanh toán đơn hàng và quản lý giao dịch",
    icon: <Icon name="receipt" size={22} />,
  },
  {
    id: "manager",
    label: "Quản lý cửa hàng",
    description: "Quản lý kho, nhân viên và báo cáo",
    icon: <Icon name="shop" size={22} />,
  },
  {
    id: "admin",
    label: "Administrator",
    description: "Toàn quyền cấu hình hệ thống",
    icon: <Icon name="shield-check" size={22} />,
  },
];

/** Badge ở danh sách chỉ hiện một vai trò, lấy quyền cao nhất đã chọn */
export const primaryRole = (permissions: PermissionId[]): EmployeeRole =>
  [...PERMISSIONS]
    .reverse()
    .find((permission) => permissions.includes(permission.id))?.id ?? "staff";

export const SHIFTS: Record<
  ShiftId,
  { label: string; from: string; to: string; icon: ReactNode; color: string }
> = {
  morning: {
    label: "Ca sáng",
    from: "06:00",
    to: "14:00",
    icon: <Icon name="sun" size={16} />,
    color: "var(--chart-accent)",
  },
  afternoon: {
    label: "Ca chiều",
    from: "14:00",
    to: "22:00",
    icon: <Icon name="sun" size={16} />,
    color: "var(--chart-accent)",
  },
  night: {
    label: "Ca tối",
    from: "22:00",
    to: "06:00",
    icon: <Icon name="moon" size={16} />,
    color: "var(--chart-brand)",
  },
  office: {
    label: "Hành chính",
    from: "08:00",
    to: "17:00",
    icon: <Icon name="briefcase" size={16} />,
    color: "var(--chart-brand)",
  },
};

export const DEPARTMENTS: Record<DepartmentId, string> = {
  sales: "Bán hàng",
  warehouse: "Kho hàng",
  technical: "Kỹ thuật",
  accounting: "Kế toán",
};

const options = (entries: [string, string][], allLabel: string) => [
  { value: "", label: allLabel },
  ...entries.map(([value, label]) => ({ value, label })),
];

export const ROLE_OPTIONS = options(
  Object.entries(ROLES).map(([id, { label }]) => [id, label]),
  "Tất cả vai trò",
);

export const SHIFT_OPTIONS = options(
  Object.entries(SHIFTS).map(([id, { label }]) => [id, label]),
  "Tất cả ca làm",
);

export const DEPARTMENT_OPTIONS = options(
  Object.entries(DEPARTMENTS),
  "Tất cả phòng ban",
);
