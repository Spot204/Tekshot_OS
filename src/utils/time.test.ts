import { describe, it, expect } from "vitest";
import {
  toMinutes,
  fromMinutes,
  addMinutes,
  minutesBetween,
  formatDuration,
} from "./time";

describe("toMinutes / fromMinutes", () => {
  it("đổi qua lại giữ nguyên giá trị", () => {
    expect(toMinutes("06:01")).toBe(361);
    expect(fromMinutes(361)).toBe("06:01");
  });

  it("đệm số 0 cho giờ và phút một chữ số", () => {
    expect(fromMinutes(5)).toBe("00:05");
  });

  it("quay vòng khi vượt quá nửa đêm", () => {
    expect(fromMinutes(24 * 60)).toBe("00:00");
    expect(fromMinutes(25 * 60 + 30)).toBe("01:30");
    expect(fromMinutes(-30)).toBe("23:30");
  });
});

describe("addMinutes", () => {
  it("cộng qua mốc giờ", () => {
    expect(addMinutes("08:45", 30)).toBe("09:15");
  });

  it("cộng vắt qua nửa đêm", () => {
    expect(addMinutes("23:30", 45)).toBe("00:15");
  });
});

describe("minutesBetween", () => {
  it("tính ca ban ngày", () => {
    expect(minutesBetween("08:00", "17:00")).toBe(540);
  });

  // Ca đêm là chỗ dễ ra số âm nhất
  it("ca đêm vắt qua nửa đêm là 7h57m, không phải âm 16 tiếng", () => {
    expect(minutesBetween("22:00", "05:57")).toBe(477);
    expect(formatDuration(minutesBetween("22:00", "05:57"))).toBe("7h 57m");
  });

  it("vào và ra cùng giờ thì bằng 0", () => {
    expect(minutesBetween("09:00", "09:00")).toBe(0);
  });
});

describe("formatDuration", () => {
  it("đệm 0 cho phần phút", () => {
    expect(formatDuration(481)).toBe("8h 01m");
  });

  it("dưới một giờ vẫn hiện 0h", () => {
    expect(formatDuration(45)).toBe("0h 45m");
  });
});
