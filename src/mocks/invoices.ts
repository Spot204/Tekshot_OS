import type { Invoice } from "../types/invoice";

/** Hóa đơn đầu vào — mua hàng từ nhà cung cấp */
export const inboundInvoices: Invoice[] = [
  { id: "NV00000112", orderId: "PO0000841", customer: "NCC Thực phẩm Minh Long", phone: "0281234567", issuedAt: "2026-07-28T08:30:00", total: 18500000, discount: 500000, tax: 1800000, grandTotal: 19800000, status: "Đã thanh toán" },
  { id: "NV00000111", orderId: "PO0000840", customer: "NCC Bao bì Tân Á", phone: "0287654321", issuedAt: "2026-07-27T14:10:00", total: 4200000, discount: 0, tax: 420000, grandTotal: 4620000, status: "Một phần" },
  { id: "NV00000110", orderId: "PO0000839", customer: "NCC Đồ uống Phương Nam", phone: "0903112233", issuedAt: "2026-07-26T09:45:00", total: 7650000, discount: 150000, tax: 750000, grandTotal: 8250000, status: "Đã thanh toán" },
  { id: "NV00000109", orderId: "PO0000838", customer: "NCC Rau củ Đà Lạt", phone: "0912445566", issuedAt: "2026-07-25T16:20:00", total: 3120000, discount: 0, tax: 312000, grandTotal: 3432000, status: "Chưa thanh toán" },
  { id: "NV00000108", orderId: "PO0000837", customer: "NCC Thiết bị bếp Hòa Phát", phone: "0243334455", issuedAt: "2026-07-24T11:05:00", total: 25400000, discount: 1400000, tax: 2400000, grandTotal: 26400000, status: "Một phần" },
  { id: "NV00000107", orderId: "PO0000836", customer: "NCC Thực phẩm Minh Long", phone: "0281234567", issuedAt: "2026-07-23T08:15:00", total: 16800000, discount: 0, tax: 1680000, grandTotal: 18480000, status: "Đã thanh toán" },
];

/** Hóa đơn đầu ra — bán hàng cho khách */
export const outboundInvoices: Invoice[] = [
  { id: "00000026", orderId: "DH0001248", customer: "Nguyễn Văn An", phone: "0901 234 567", issuedAt: "2026-07-28T10:15:00", total: 2450000, discount: 0, tax: 245000, grandTotal: 2695000, status: "Đã thanh toán" },
  { id: "00000025", orderId: "DH0001247", customer: "Trần Thị Bích", phone: "0902 345 678", issuedAt: "2026-07-28T09:22:00", total: 1800000, discount: 0, tax: 180000, grandTotal: 1980000, status: "Đã thanh toán" },
  { id: "00000024", orderId: "DH0001246", customer: "Công ty TNHH ABC", phone: "0312345678", issuedAt: "2026-07-27T16:45:00", total: 12500000, discount: 250000, tax: 1225000, grandTotal: 13475000, status: "Một phần" },
  { id: "00000023", orderId: "DH0001245", customer: "Lê Minh Tuấn", phone: "0903 456 789", issuedAt: "2026-07-27T11:05:00", total: 980000, discount: 0, tax: 98000, grandTotal: 1078000, status: "Chưa thanh toán" },
  { id: "00000022", orderId: "DH0001244", customer: "Phạm Thu Hà", phone: "0904 567 890", issuedAt: "2026-07-26T15:30:00", total: 3400000, discount: 100000, tax: 330000, grandTotal: 3630000, status: "Đã thanh toán" },
  { id: "00000021", orderId: "DH0001243", customer: "Công ty CP Hưng Thịnh", phone: "0243456789", issuedAt: "2026-07-25T13:50:00", total: 21000000, discount: 1000000, tax: 2000000, grandTotal: 22000000, status: "Một phần" },
  { id: "00000020", orderId: "DH0001242", customer: "Vũ Đức Nam", phone: "0905 678 901", issuedAt: "2026-07-24T10:05:00", total: 760000, discount: 0, tax: 76000, grandTotal: 836000, status: "Chưa thanh toán" },
];
