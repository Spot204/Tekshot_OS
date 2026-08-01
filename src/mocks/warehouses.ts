import type { StockMovement, Warehouse } from "../types/warehouse";

/** Dữ liệu mẫu — thay bằng service fetch khi có API */

export const warehouses: Warehouse[] = [
  {
    id: "KHO-001",
    name: "Kho chính",
    kind: "store",
    status: "active",
    productCount: 1245,
    createdBy: "Alex Nguyen",
    createdAt: "2026-07-27T10:15",
  },
  {
    id: "KHO-002",
    name: "Kho Chi nhánh 1",
    kind: "store",
    status: "active",
    productCount: 856,
    createdBy: "Alex Nguyen",
    createdAt: "2026-07-27T09:42",
  },
  {
    id: "KHO-003",
    name: "Kho Chi nhánh 2",
    kind: "store",
    status: "active",
    productCount: 645,
    createdBy: "Alex Nguyen",
    createdAt: "2026-07-27T09:30",
  },
  {
    id: "KHO-004",
    name: "Kho online",
    kind: "online",
    status: "active",
    productCount: 321,
    createdBy: "Alex Nguyen",
    createdAt: "2026-07-27T08:55",
  },
  {
    id: "KHO-005",
    name: "Kho dự phòng",
    kind: "backup",
    status: "paused",
    productCount: 98,
    createdBy: "Alex Nguyen",
    createdAt: "2026-07-27T08:20",
  },
  {
    id: "KHO-006",
    name: "Kho nguyên liệu",
    kind: "material",
    status: "active",
    productCount: 76,
    createdBy: "Alex Nguyen",
    createdAt: "2026-07-27T07:45",
  },
];

type Row = [
  kind: StockMovement["kind"],
  at: string,
  warehouseId: string,
  partner: string,
  amount: number,
  createdBy: string,
  toWarehouseId?: string,
];

const RAW: Row[] = [
  [
    "in",
    "2026-07-28T10:30",
    "KHO-001",
    "Công ty TNHH Thực phẩm ABC",
    12_450_000,
    "admin",
  ],
  [
    "out",
    "2026-07-27T15:45",
    "KHO-001",
    "Bán hàng trực tiếp",
    3_250_000,
    "admin",
  ],
  [
    "in",
    "2026-07-27T09:20",
    "KHO-002",
    "Công ty CP Đầu tư Foodtek",
    8_750_000,
    "nhanvien1",
  ],
  ["adjust", "2026-07-26T11:10", "KHO-001", "", -1_200_000, "admin"],
  [
    "out",
    "2026-07-25T16:05",
    "KHO-001",
    "Bán hàng trực tiếp",
    2_870_000,
    "nhanvien2",
  ],
  ["transfer", "2026-07-24T10:15", "KHO-001", "", 0, "admin", "KHO-003"],
  ["adjust", "2026-07-23T14:30", "KHO-002", "", -650_000, "nhanvien1"],
  [
    "out",
    "2026-07-22T09:40",
    "KHO-003",
    "Bán hàng trực tiếp",
    1_950_000,
    "nhanvien2",
  ],
  [
    "in",
    "2026-07-21T08:15",
    "KHO-001",
    "Công ty TNHH Bao bì Việt",
    5_400_000,
    "admin",
  ],
  [
    "out",
    "2026-07-20T17:20",
    "KHO-002",
    "Bán hàng trực tiếp",
    4_120_000,
    "nhanvien1",
  ],
  ["transfer", "2026-07-19T13:00", "KHO-002", "", 0, "admin", "KHO-004"],
  [
    "in",
    "2026-07-18T09:50",
    "KHO-006",
    "Công ty CP Nguyên liệu Sài Gòn",
    9_300_000,
    "nhanvien2",
  ],
  ["adjust", "2026-07-17T15:35", "KHO-003", "", 480_000, "admin"],
  [
    "out",
    "2026-07-16T11:25",
    "KHO-001",
    "Bán hàng trực tiếp",
    6_780_000,
    "nhanvien1",
  ],
  [
    "in",
    "2026-07-15T08:40",
    "KHO-004",
    "Công ty TNHH Thực phẩm ABC",
    7_150_000,
    "admin",
  ],
  [
    "out",
    "2026-07-14T16:55",
    "KHO-004",
    "Bán hàng trực tiếp",
    2_340_000,
    "nhanvien2",
  ],
];

/** PN/PX/DC/CK theo loại phiếu */
const PREFIX: Record<StockMovement["kind"], string> = {
  in: "PN",
  out: "PX",
  adjust: "DC",
  transfer: "CK",
};

export const stockMovements: StockMovement[] = RAW.map(
  ([kind, at, warehouseId, partner, amount, createdBy, toWarehouseId], i) => {
    const [year, month, day] = at.slice(0, 10).split("-");
    return {
      id: `${PREFIX[kind]}-${day}${month}${year}-${String(i + 1).padStart(3, "0")}`,
      kind,
      warehouseId,
      toWarehouseId,
      partner,
      createdAt: at,
      amount,
      createdBy,
    };
  },
);
