import type { CashEntry, CashFlow, PaymentMethod } from "../types/cashbook";

/** Dữ liệu mẫu — thay bằng service fetch khi có API */

/** Số dư đầu kỳ; số dư từng dòng suy ra từ đây, không lưu sẵn */
export const openingBalance = 0;

type Row = [
  at: string,
  flow: CashFlow,
  description: string,
  method: PaymentMethod,
  amount: number,
  performedBy: string,
];

/** Xếp cũ trước mới sau để cộng dồn số dư theo đúng thứ tự phát sinh */
const RAW: Row[] = [
  ["2026-07-01T08:10", "in", "Thu tiền bán hàng", "cash", 1_850_000, "admin"],
  ["2026-07-02T09:05", "out", "Chi mua nguyên liệu", "cash", 620_000, "admin"],
  ["2026-07-03T14:20", "in", "Thu tiền bán hàng", "qr", 940_000, "nhanvien1"],
  [
    "2026-07-05T10:00",
    "out",
    "Chi tiền điện tháng 6",
    "transfer",
    1_180_000,
    "admin",
  ],
  [
    "2026-07-06T17:35",
    "in",
    "Thu tiền bán hàng",
    "cash",
    1_320_000,
    "nhanvien1",
  ],
  [
    "2026-07-08T08:45",
    "out",
    "Chi lương bán thời gian",
    "transfer",
    2_400_000,
    "admin",
  ],
  [
    "2026-07-09T15:10",
    "in",
    "Thu tiền khách đặt cọc",
    "transfer",
    2_000_000,
    "admin",
  ],
  ["2026-07-10T19:25", "in", "Thu tiền bán hàng", "qr", 780_000, "nhanvien2"],
  [
    "2026-07-12T09:30",
    "out",
    "Chi mua vật tư đóng gói",
    "cash",
    340_000,
    "nhanvien1",
  ],
  ["2026-07-13T11:15", "in", "Thu tiền bán hàng", "cash", 1_560_000, "admin"],
  [
    "2026-07-15T16:40",
    "out",
    "Chi phí vận chuyển",
    "cash",
    280_000,
    "nhanvien2",
  ],
  [
    "2026-07-16T08:20",
    "in",
    "Thu tiền bán hàng",
    "transfer",
    2_150_000,
    "admin",
  ],
  [
    "2026-07-18T13:05",
    "out",
    "Chi bảo trì thiết bị",
    "transfer",
    1_500_000,
    "admin",
  ],
  ["2026-07-19T18:50", "in", "Thu tiền bán hàng", "qr", 1_070_000, "nhanvien1"],
  [
    "2026-07-20T10:35",
    "out",
    "Chi mua nguyên liệu",
    "cash",
    890_000,
    "nhanvien1",
  ],
  [
    "2026-07-21T15:55",
    "in",
    "Thu tiền bán hàng",
    "cash",
    1_240_000,
    "nhanvien2",
  ],
  [
    "2026-07-22T09:40",
    "out",
    "Chi tiền nước tháng 6",
    "transfer",
    410_000,
    "admin",
  ],
  ["2026-07-23T20:15", "in", "Thu tiền bán hàng", "qr", 1_680_000, "admin"],
  [
    "2026-07-24T11:30",
    "out",
    "Chi mua văn phòng phẩm",
    "cash",
    195_000,
    "nhanvien2",
  ],
  [
    "2026-07-25T14:45",
    "in",
    "Thu tiền bán hàng",
    "cash",
    1_430_000,
    "nhanvien1",
  ],
  ["2026-07-26T18:05", "in", "Thu tiền bán hàng", "qr", 850_000, "admin"],
  [
    "2026-07-27T11:20",
    "out",
    "Chi phí vận chuyển",
    "cash",
    250_000,
    "nhanvien1",
  ],
  [
    "2026-07-27T16:45",
    "in",
    "Thu tiền khách đặt cọc",
    "transfer",
    1_500_000,
    "nhanvien1",
  ],
  ["2026-07-28T09:15", "out", "Chi mua hàng hóa", "cash", 1_250_000, "admin"],
  ["2026-07-28T09:30", "in", "Thu tiền bán hàng", "cash", 2_707_000, "admin"],
];

/** PT-ddMMyy-nnn cho phiếu thu, PC- cho phiếu chi */
const buildId = (at: string, flow: CashFlow, index: number): string => {
  const [year, month, day] = at.slice(0, 10).split("-");
  const prefix = flow === "in" ? "PT" : "PC";
  return `${prefix}-${day}${month}${year.slice(2)}-${String(index + 1).padStart(3, "0")}`;
};

/** Vài phiếu đã hủy để thấy trạng thái; chúng không tính vào số dư */
const CANCELLED_INDEXES = new Set([5, 12]);

export const cashEntries: CashEntry[] = RAW.map(
  ([at, flow, description, method, amount, performedBy], index) => ({
    id: buildId(at, flow, index),
    at,
    flow,
    description,
    method,
    amount,
    performedBy,
    status: CANCELLED_INDEXES.has(index) ? "cancelled" : "completed",
  }),
);
