import type { VoucherLine } from "../../types/cashbook";

export const emptyLine = (id: string): VoucherLine => ({
  id,
  content: "",
  unit: "",
  quantity: 0,
  amount: 0,
  note: "",
});

/** Số nhập vào ô tiền/số lượng; chuỗi rỗng hoặc rác đều về 0 */
export const toNumber = (value: string): number =>
  Number(value.replace(/[^\d]/g, "")) || 0;
