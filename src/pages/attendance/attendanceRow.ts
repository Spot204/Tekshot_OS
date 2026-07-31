import type { AttendanceRecord } from "../../types/attendance";
import type { Employee } from "../../types/employee";
import { minutesBetween } from "../../utils/time";

/** Một dòng bảng = nhân viên ghép với bản ghi chấm công của ngày đang xem */
export interface AttendanceRow {
  /** = mã nhân viên, dùng làm rowKey */
  id: string;
  employee: Employee;
  checkIn: string | null;
  checkOut: string | null;
  workedMinutes: number;
  present: boolean;
}

export const toAttendanceRows = (
  employees: Employee[],
  records: AttendanceRecord[],
): AttendanceRow[] => {
  const byEmployee = new Map(records.map((r) => [r.employeeId, r]));

  return employees.map((employee) => {
    const record = byEmployee.get(employee.id);
    const { checkIn = null, checkOut = null } = record ?? {};

    return {
      id: employee.id,
      employee,
      checkIn,
      checkOut,
      // Chưa ra ca thì chưa tính giờ, không đoán bằng giờ hiện tại
      workedMinutes:
        checkIn && checkOut ? minutesBetween(checkIn, checkOut) : 0,
      present: Boolean(checkIn),
    };
  });
};
