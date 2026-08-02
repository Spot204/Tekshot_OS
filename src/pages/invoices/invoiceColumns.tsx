import type { Column } from "../../components/ui/Table";
import type { BadgeVariant } from "../../components/ui/Badge";
import Badge from "../../components/ui/Badge";
import RowActions from "../../components/ui/RowActions";
import type { Invoice, InvoiceStatus } from "../../types/invoice";
import { formatCurrency, formatDate, formatTime } from "../../utils/format";

const STATUS_VARIANT: Record<InvoiceStatus, BadgeVariant> = {
  "Đã thanh toán": "success",
  "Một phần": "warning",
  "Chưa thanh toán": "danger",
};

export const INVOICE_STATUS_OPTIONS = (
  Object.keys(STATUS_VARIANT) as InvoiceStatus[]
).map((status) => ({ value: status, label: status }));

interface InvoiceColumnHandlers {
  onView: (invoice: Invoice) => void;
  onPrint: (invoice: Invoice) => void;
  onCancel: (invoice: Invoice) => void;
}

export const createInvoiceColumns = ({
  onView,
  onPrint,
  onCancel,
}: InvoiceColumnHandlers): Column<Invoice>[] => [
  {
    id: "id",
    header: "Số hóa đơn",
    render: (invoice) => (
      <button
        type="button"
        className="btn btn-link p-0 text-decoration-none text-start"
        onClick={() => onView(invoice)}
      >
        <span className="fw-bold d-block">{invoice.id}</span>
      </button>
    ),
  },
  { id: "orderId", header: "Mã đơn", accessor: "orderId" },
  {
    id: "customer",
    header: "Khách hàng",
    render: (invoice) => (
      <div>
        <div className="fw-semibold">{invoice.customer}</div>
        <small className="text-secondary">{invoice.phone}</small>
      </div>
    ),
  },
  {
    id: "issuedAt",
    header: "Ngày hóa đơn",
    render: (invoice) => (
      <div>
        <div className="fw-semibold">{formatDate(invoice.issuedAt)}</div>
        <small className="text-secondary">{formatTime(invoice.issuedAt)}</small>
      </div>
    ),
  },
  {
    id: "total",
    header: "Tổng tiền",
    align: "end",
    render: (invoice) => formatCurrency(invoice.total),
  },
  {
    id: "discount",
    header: "Giảm giá",
    align: "end",
    render: (invoice) => formatCurrency(invoice.discount),
  },
  {
    id: "tax",
    header: "Tiền thuế",
    align: "end",
    render: (invoice) => formatCurrency(invoice.tax),
  },
  {
    id: "grandTotal",
    header: "Tổng tiền TT",
    align: "end",
    render: (invoice) => (
      <span className="fw-bold">{formatCurrency(invoice.grandTotal)}</span>
    ),
  },
  {
    id: "status",
    header: "Trạng thái",
    render: (invoice) => (
      <Badge variant={STATUS_VARIANT[invoice.status]} size="sm">
        {invoice.status}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Thao tác",
    align: "center",
    width: "100px",
    render: (invoice) => (
      <RowActions
        actions={[
          {
            label: "Xem chi tiết",
            icon: "eye",
            onClick: () => onView(invoice),
          },
          {
            label: "In hóa đơn",
            icon: "printer",
            onClick: () => onPrint(invoice),
          },
          {
            label: "Hủy hóa đơn",
            icon: "x-circle",
            danger: true,
            dividerBefore: true,
            onClick: () => onCancel(invoice),
          },
        ]}
      />
    ),
  },
];
