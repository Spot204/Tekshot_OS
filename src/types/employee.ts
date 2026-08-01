export type EmployeeRole =
  "staff" | "manager" | "cashier" | "technician" | "admin";

/** Quyền cấp được từ form tạo tài khoản — không có "technician" */
export type PermissionId = Extract<
  EmployeeRole,
  "staff" | "cashier" | "manager" | "admin"
>;

export type ShiftId = "morning" | "afternoon" | "night" | "office";

export type DepartmentId = "sales" | "warehouse" | "technical" | "accounting";

export interface Employee {
  /** Mã nhân viên, vd NV0001 */
  id: string;
  name: string;
  phone: string;
  email: string;
  role: EmployeeRole;
  shift: ShiftId;
  department: DepartmentId;
  avatarUrl?: string;
  username?: string;
  /** Nhiều quyền; `role` là quyền cao nhất, dùng cho badge ở danh sách */
  permissions?: PermissionId[];
}
