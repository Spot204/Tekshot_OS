import type { Customer } from "../types/customer";

/** Dữ liệu mẫu — thay bằng service fetch khi có API */
export const customers: Customer[] = [
  {
    id: "KH-01",
    name: "C Hoan",
    phone: null,
    address: "Hà Nội",
    orderCount: 0,
    totalPaid: 3_060_000,
  },
  {
    id: "KH-02",
    name: "Nguyễn Thị Mỹ Linh",
    phone: null,
    address: "Hà Nội",
    orderCount: 2,
    totalPaid: 8_049_000,
  },
  {
    id: "KH-03",
    name: "Trần Thị Hiền",
    phone: null,
    address: "Hà Nội",
    orderCount: 0,
    totalPaid: 0,
  },
  {
    id: "KH-04",
    name: "Trần Thị Hiền",
    phone: "0981444836",
    address: "Hà Nội",
    orderCount: 0,
    totalPaid: 0,
  },
  {
    id: "KH-05",
    name: "Ý Nhi",
    phone: null,
    address: "Hà Nội",
    orderCount: 0,
    totalPaid: 10_275_000,
  },
  {
    id: "KH-06",
    name: "Ý Nhi; Trần Thị Hiền",
    phone: null,
    address: "Hà Nội",
    orderCount: 0,
    totalPaid: 1_330_000,
  },
];
