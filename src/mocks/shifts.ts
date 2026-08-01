import type { ShiftClosing } from "../types/shift";

/** Dữ liệu mẫu — thay bằng service fetch khi có API */

type Row = [
  day: string,
  slot: 0 | 1,
  employeeId: string,
  openingCash: number,
  cashSales: number,
  transferSales: number,
  cashOut: number,
  /** Lệch so với số đáng lẽ phải có; 0 là khớp két */
  drift: number,
  note: string,
];

const SLOTS = [
  { from: "08:00", to: "16:00" },
  { from: "16:00", to: "23:30" },
];

const RAW: Row[] = [
  ["2026-07-20", 0, "NV0001", 2_000_000, 11_400_000, 2_600_000, 0, 0, ""],
  ["2026-07-20", 1, "NV0002", 1_500_000, 12_800_000, 4_100_000, 200_000, 0, ""],
  ["2026-07-21", 0, "NV0004", 2_000_000, 9_800_000, 3_200_000, 0, 0, ""],
  [
    "2026-07-21",
    1,
    "NV0006",
    1_500_000,
    13_500_000,
    5_200_000,
    0,
    -50_000,
    "Thiếu tiền lẻ",
  ],
  ["2026-07-22", 0, "NV0007", 2_000_000, 10_600_000, 2_900_000, 150_000, 0, ""],
  ["2026-07-22", 1, "NV0012", 1_000_000, 12_100_000, 4_600_000, 0, 0, ""],
  ["2026-07-23", 0, "NV0011", 2_500_000, 12_400_000, 3_100_000, 0, 0, ""],
  [
    "2026-07-23",
    1,
    "NV0018",
    1_000_000,
    14_900_000,
    5_800_000,
    300_000,
    100_000,
    "Khách trả dư, chưa trả lại",
  ],
  ["2026-07-24", 0, "NV0001", 2_000_000, 9_200_000, 2_400_000, 0, 0, ""],
  ["2026-07-24", 1, "NV0002", 1_500_000, 13_100_000, 4_900_000, 0, 0, ""],
  [
    "2026-07-25",
    0,
    "NV0004",
    1_500_000,
    9_200_000,
    3_000_000,
    50_000,
    -50_000,
    "Chưa rõ nguyên nhân",
  ],
  ["2026-07-25", 1, "NV0006", 1_300_000, 7_800_000, 3_550_000, 0, 0, ""],
  ["2026-07-26", 0, "NV0007", 2_500_000, 9_500_000, 4_300_000, 0, 0, ""],
  ["2026-07-26", 1, "NV0012", 1_000_000, 14_200_000, 3_700_000, 0, 0, ""],
  ["2026-07-27", 0, "NV0011", 2_000_000, 10_250_000, 4_500_000, 0, 0, ""],
  [
    "2026-07-27",
    1,
    "NV0018",
    1_000_000,
    8_600_000,
    4_000_000,
    100_000,
    100_000,
    "Thừa quỹ",
  ],
  ["2026-07-28", 0, "NV0001", 2_000_000, 12_500_000, 2_750_000, 0, 0, ""],
  [
    "2026-07-28",
    1,
    "NV0002",
    1_500_000,
    13_200_000,
    5_700_000,
    0,
    0,
    "Chốt ca cuối tháng",
  ],
];

const buildId = (day: string, index: number): string => {
  const [year, month, date] = day.split("-");
  return `CC-${date}${month}${year}-${String(index + 1).padStart(3, "0")}`;
};

export const shiftClosings: ShiftClosing[] = RAW.map(
  (
    [
      day,
      slot,
      employeeId,
      openingCash,
      cashSales,
      transferSales,
      cashOut,
      drift,
      note,
    ],
    index,
  ) => ({
    id: buildId(day, index),
    startedAt: `${day}T${SLOTS[slot].from}`,
    closedAt: `${day}T${SLOTS[slot].to}`,
    employeeId,
    openingCash,
    cashSales,
    transferSales,
    cashOut,
    // Tiền đếm được = số đáng lẽ phải có + độ lệch, để chênh lệch ra đúng ý đồ
    countedCash: openingCash + cashSales - cashOut + drift,
    note,
  }),
);
