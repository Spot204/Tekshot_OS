import type { ShiftClosing, ShiftClosingRow } from "../../types/shift";

/**
 * Đối chiếu két tiền mặt:
 *   doanh thu   = tiền mặt bán hàng + chuyển khoản
 *   tổng tiền mặt = đầu ca + tiền mặt bán hàng - chi tiền mặt
 *   chênh lệch  = tiền thực tế đếm được - tổng tiền mặt
 */
export const toShiftRow = (shift: ShiftClosing): ShiftClosingRow => {
  const expectedCash = shift.openingCash + shift.cashSales - shift.cashOut;

  return {
    ...shift,
    revenue: shift.cashSales + shift.transferSales,
    expectedCash,
    variance: shift.countedCash - expectedCash,
  };
};
