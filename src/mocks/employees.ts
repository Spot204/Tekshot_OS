import type {
  DepartmentId,
  Employee,
  EmployeeRole,
  ShiftId,
} from "../types/employee";

/** Dữ liệu mẫu — thay bằng service fetch khi có API */

type Row = [
  name: string,
  role: EmployeeRole,
  shift: ShiftId,
  department: DepartmentId,
  slug: string,
];

const RAW: Row[] = [
  ["Nguyễn Kiều Linh", "staff", "morning", "sales", "linh.nguyen"],
  ["Vũ Thu Hương", "manager", "afternoon", "sales", "huong.vu"],
  ["Trần Minh Đức", "cashier", "night", "warehouse", "duc.tran"],
  ["Phạm Thị Hạnh", "staff", "morning", "sales", "hanh.pham"],
  ["Lê Hoàng Nam", "technician", "office", "technical", "nam.le"],
  ["Đỗ Thanh Tùng", "staff", "afternoon", "warehouse", "tung.do"],
  ["Bùi Ngọc Ánh", "cashier", "morning", "accounting", "anh.bui"],
  ["Hoàng Văn Kiên", "staff", "night", "warehouse", "kien.hoang"],
  ["Ngô Thị Mai", "manager", "office", "accounting", "mai.ngo"],
  ["Đặng Quốc Bảo", "technician", "afternoon", "technical", "bao.dang"],
  ["Lý Thu Trang", "staff", "morning", "sales", "trang.ly"],
  ["Trịnh Minh Khoa", "cashier", "afternoon", "accounting", "khoa.trinh"],
  ["Phan Thị Yến", "staff", "night", "warehouse", "yen.phan"],
  ["Võ Hoài Nam", "staff", "office", "sales", "nam.vo"],
  ["Dương Khánh Ly", "manager", "morning", "sales", "ly.duong"],
  ["Tạ Anh Quân", "technician", "night", "technical", "quan.ta"],
  ["Chu Thị Nhung", "cashier", "office", "accounting", "nhung.chu"],
  ["Mai Đức Thịnh", "staff", "afternoon", "warehouse", "thinh.mai"],
];

export const employees: Employee[] = RAW.map(
  ([name, role, shift, department, slug], i) => ({
    id: `NV${String(i + 1).padStart(4, "0")}`,
    name,
    role,
    shift,
    department,
    phone: `09${String(i + 1).padStart(2, "0")} ${String(234 + i)} ${String(567 + i)}`,
    email: `${slug}@foodtek.vn`,
  }),
);
