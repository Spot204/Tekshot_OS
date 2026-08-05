import { describe, it, expect } from "vitest";
import { toCashRows, summarize } from "./cashRows";
import type { CashEntry } from "../../types/cashbook";

const entry = (over: Partial<CashEntry> & Pick<CashEntry, "id" | "at">) =>
  ({
    flow: "in",
    description: "",
    method: "cash",
    amount: 0,
    performedBy: "NV01",
    status: "completed",
    ...over,
  }) as CashEntry;

describe("toCashRows", () => {
  it("cộng dồn số dư theo thứ tự thời gian dù dữ liệu vào lộn xộn", () => {
    const rows = toCashRows(
      [
        entry({
          id: "P2",
          at: "2026-07-02T09:00:00",
          flow: "out",
          amount: 300,
        }),
        entry({
          id: "P1",
          at: "2026-07-01T09:00:00",
          flow: "in",
          amount: 1000,
        }),
        entry({ id: "P3", at: "2026-07-03T09:00:00", flow: "in", amount: 50 }),
      ],
      500,
    );

    // trả về mới nhất trước
    expect(rows.map((r) => r.id)).toEqual(["P3", "P2", "P1"]);
    expect(rows.map((r) => r.balance)).toEqual([1250, 1200, 1500]);
  });

  it("phiếu đã huỷ không được tính vào số dư", () => {
    const rows = toCashRows(
      [
        entry({
          id: "P1",
          at: "2026-07-01T09:00:00",
          flow: "in",
          amount: 1000,
        }),
        entry({
          id: "P2",
          at: "2026-07-02T09:00:00",
          flow: "in",
          amount: 9999,
          status: "cancelled",
        }),
      ],
      0,
    );

    expect(rows).toHaveLength(1);
    expect(rows[0].balance).toBe(1000);
  });

  it("không sửa mảng gốc", () => {
    const entries = [
      entry({ id: "P2", at: "2026-07-02T09:00:00" }),
      entry({ id: "P1", at: "2026-07-01T09:00:00" }),
    ];

    toCashRows(entries, 0);

    expect(entries.map((e) => e.id)).toEqual(["P2", "P1"]);
  });
});

describe("summarize", () => {
  it("tách tổng thu và tổng chi", () => {
    const rows = toCashRows(
      [
        entry({
          id: "P1",
          at: "2026-07-01T09:00:00",
          flow: "in",
          amount: 1000,
        }),
        entry({
          id: "P2",
          at: "2026-07-02T09:00:00",
          flow: "out",
          amount: 400,
        }),
        entry({ id: "P3", at: "2026-07-03T09:00:00", flow: "in", amount: 250 }),
      ],
      0,
    );

    expect(summarize(rows)).toEqual({ totalIn: 1250, totalOut: 400, count: 3 });
  });
});
