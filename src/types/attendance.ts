export interface AttendanceRecord {
  employeeId: string;
  /** Ngày chấm công, dạng YYYY-MM-DD */
  date: string;
  /** "06:01", null khi chưa chấm công */
  checkIn: string | null;
  checkOut: string | null;
}
