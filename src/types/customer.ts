export interface Customer {
  id: string;
  name: string;
  /** null khi khách chưa để lại số — bảng hiển thị dấu gạch */
  phone: string | null;
  address: string;
  orderCount: number;
  totalPaid: number;
}
