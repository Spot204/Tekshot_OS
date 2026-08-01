import { describe, it, expect } from "vitest";
import {
  formatNumber,
  formatCurrency,
  formatCompact,
  formatPercent,
  formatDate,
  isWithinRange,
} from "./format";

describe("format tiền và số", () => {
  it("nhóm hàng nghìn theo kiểu Việt Nam", () => {
    // Intl dùng khoảng trắng hẹp cho vi-VN ở một số môi trường, nên so theo chữ số
    expect(formatNumber(2450000).replace(/\D/g, "")).toBe("2450000");
    expect(formatCurrency(2450000).endsWith("đ")).toBe(true);
  });

  it("rút gọn cho nhãn trục biểu đồ", () => {
    expect(formatCompact(100_000_000)).toBe("100M");
    expect(formatCompact(2_500)).toBe("2.5K");
    expect(formatCompact(999)).toBe("999");
  });

  it("chỉ thêm dấu + cho số dương", () => {
    expect(formatPercent(16.8)).toBe("+16.8%");
    expect(formatPercent(-4.2)).toBe("-4.2%");
    expect(formatPercent(0)).toBe("0%");
  });
});

describe("formatDate", () => {
  it("đệm 0 cho ngày và tháng", () => {
    expect(formatDate("2026-07-05T10:15:00")).toBe("05/07/2026");
  });
});

describe("isWithinRange", () => {
  const iso = "2026-07-15T10:00:00";

  it("không có biên nào thì luôn nằm trong khoảng", () => {
    expect(isWithinRange(iso, null, null)).toBe(true);
  });

  it("loại ngày trước mốc from và sau mốc to", () => {
    expect(isWithinRange(iso, new Date(2026, 6, 20), null)).toBe(false);
    expect(isWithinRange(iso, null, new Date(2026, 6, 10))).toBe(false);
  });

  it("so theo ngày nên trùng ngày biên vẫn tính là trong khoảng", () => {
    expect(
      isWithinRange(iso, new Date(2026, 6, 15), new Date(2026, 6, 15)),
    ).toBe(true);
  });

  // from/to đến thẳng từ state của component, sửa vào là hỏng bộ lọc
  it("không được sửa Date truyền vào", () => {
    const from = new Date(2026, 6, 1, 13, 45, 30);
    const to = new Date(2026, 6, 31, 8, 15, 10);
    const fromTime = from.getTime();
    const toTime = to.getTime();

    isWithinRange(iso, from, to);

    expect(from.getTime()).toBe(fromTime);
    expect(to.getTime()).toBe(toTime);
  });
});
