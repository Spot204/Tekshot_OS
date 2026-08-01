import { describe, it, expect } from "vitest";
import { toShiftRow } from "./shiftRows";
import type { ShiftClosing } from "../../types/shift";

const shift = (over: Partial<ShiftClosing> = {}): ShiftClosing => ({
  id: "CC-01072026-001",
  startedAt: "2026-07-01T06:00:00",
  closedAt: "2026-07-01T14:00:00",
  employeeId: "NV01",
  openingCash: 1_000_000,
  cashSales: 3_000_000,
  transferSales: 2_000_000,
  cashOut: 500_000,
  countedCash: 3_500_000,
  note: "",
  ...over,
});

describe("toShiftRow", () => {
  it("doanh thu gộp cả tiền mặt lẫn chuyển khoản", () => {
    expect(toShiftRow(shift()).revenue).toBe(5_000_000);
  });

  it("tiền mặt đáng lẽ có = đầu ca + bán tiền mặt - chi tiền mặt", () => {
    expect(toShiftRow(shift()).expectedCash).toBe(3_500_000);
  });

  it("đếm khớp thì không chênh lệch", () => {
    expect(toShiftRow(shift()).variance).toBe(0);
  });

  it("đếm dư ra thì chênh lệch dương", () => {
    expect(toShiftRow(shift({ countedCash: 3_550_000 })).variance).toBe(50_000);
  });

  it("đếm thiếu thì chênh lệch âm", () => {
    expect(toShiftRow(shift({ countedCash: 3_400_000 })).variance).toBe(
      -100_000,
    );
  });

  // Chuyển khoản không nằm trong két nên không được ảnh hưởng tới đối chiếu
  it("chuyển khoản không làm đổi tiền mặt đáng lẽ có", () => {
    const row = toShiftRow(shift({ transferSales: 99_000_000 }));

    expect(row.expectedCash).toBe(3_500_000);
    expect(row.variance).toBe(0);
  });
});
