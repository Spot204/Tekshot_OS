import type { Column } from "../../components/ui/Table";
import type { Customer } from "../../types/customer";
import Avatar from "../../components/ui/Avatar";
import { formatNumber } from "../../utils/format";

/** Cột tiền dùng formatNumber vì tiêu đề đã ghi rõ đơn vị (VND) */
export const customerColumns: Column<Customer>[] = [
  {
    id: "name",
    header: "Họ và tên",
    accessor: "name",
    sortable: true,
    render: (customer) => (
      <span className="d-inline-flex align-items-center gap-2">
        <Avatar name={customer.name} />
        <span className="fw-semibold">{customer.name}</span>
      </span>
    ),
  },
  {
    id: "phone",
    header: "Số điện thoại",
    accessor: "phone",
    sortable: true,
    render: (customer) =>
      customer.phone ?? <span className="text-secondary">—</span>,
  },
  {
    id: "address",
    header: "Địa chỉ",
    accessor: "address",
    sortable: true,
  },
  {
    id: "orderCount",
    header: "Tổng đơn hàng",
    accessor: "orderCount",
    sortable: true,
  },
  {
    id: "totalPaid",
    header: "Tổng tiền thanh toán (VND)",
    accessor: "totalPaid",
    sortable: true,
    render: (customer) => formatNumber(customer.totalPaid),
  },
];
