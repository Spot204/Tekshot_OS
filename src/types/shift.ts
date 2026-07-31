/** Số liệu gốc của một lần chốt ca; doanh thu/tổng tiền mặt/chênh lệch tính ra */
export interface ShiftClosing {
  /** Mã chốt ca, vd CC-28072026-001 */
  id: string;
  startedAt: string;
  closedAt: string;
  employeeId: string;
  /** Tiền mặt có sẵn trong két đầu ca */
  openingCash: number;
  cashSales: number;
  transferSales: number;
  /** Tiền mặt chi ra trong ca */
  cashOut: number;
  /** Tiền mặt đếm được lúc chốt */
  countedCash: number;
  note: string;
}

export interface ShiftClosingRow extends ShiftClosing {
  revenue: number;
  /** Số tiền mặt đáng lẽ phải có trong két */
  expectedCash: number;
  /** Dương = thừa, âm = thiếu */
  variance: number;
}
