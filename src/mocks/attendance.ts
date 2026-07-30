import type { AttendanceRecord } from "../types/attendance";
import { SHIFTS } from "../constants/employee";
import { addMinutes } from "../utils/time";
import { employees } from "./employees";

/** Dữ liệu mẫu — thay bằng service fetch khi có API */

/** Băm ổn định: cùng nhân viên + ngày luôn cho cùng kết quả qua các lần render */
const hash = (seed: string): number =>
  [...seed].reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0, 7);

/** Sinh bản ghi cho mọi nhân viên trong một ngày, để chuyển ngày luôn có dữ liệu */
export const attendanceFor = (date: string): AttendanceRecord[] =>
  employees.map((employee) => {
    const seed = hash(employee.id + date);
    const shift = SHIFTS[employee.shift];

    // Cứ khoảng 1/9 lượt thì chưa chấm công
    if (seed % 9 === 0) {
      return { employeeId: employee.id, date, checkIn: null, checkOut: null };
    }

    return {
      employeeId: employee.id,
      date,
      checkIn: addMinutes(shift.from, seed % 6),
      checkOut: addMinutes(shift.to, (seed >> 3) % 7),
    };
  });
