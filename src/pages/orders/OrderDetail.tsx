import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Table from "../../components/ui/Table";
import { orderLineColumns } from "./orderColumns";
import type { Order, OrderLine } from "../../types/order";
import { formatCurrency, formatDateTime } from "../../utils/format";

const STATUS_VARIANT = {
  "Hoàn thành": "success",
  "Đang xử lý": "primary",
  "Đã hủy": "danger",
} as const;

interface OrderDetailProps {
  order: Order | null;
  lines: OrderLine[];
}

export default function OrderDetail({ order, lines }: OrderDetailProps) {
  if (!order) {
    return (
      <Card shadow bordered={false} padding="p-4">
        <div className="text-center text-secondary py-5">
          Chọn một đơn hàng để xem chi tiết
        </div>
      </Card>
    );
  }

  const subtotal = lines.reduce((sum, line) => sum + line.price, 0);
  const discount = lines.reduce((sum, line) => sum + line.discount, 0);
  const vat = 0;

  return (
    <Card shadow bordered={false} padding="p-4">
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h5 className="fw-bold mb-1">Chi tiết đơn {order.id}</h5>
          <div className="text-secondary small">
            {formatDateTime(order.createdAt)} · {order.customer}
          </div>
        </div>

        <Badge variant={STATUS_VARIANT[order.status]} size="sm">
          {order.status}
        </Badge>
      </div>

      <Table columns={orderLineColumns} data={lines} rowKey="name" />

      <dl className="mt-4 mb-0">
        <div className="d-flex justify-content-between mb-2">
          <dt className="fw-normal">Tổng</dt>
          <dd className="mb-0">{formatCurrency(subtotal)}</dd>
        </div>

        <div className="d-flex justify-content-between mb-2">
          <dt className="fw-normal">Giảm giá</dt>
          <dd className="mb-0">{formatCurrency(discount)}</dd>
        </div>

        <div className="d-flex justify-content-between mb-2 text-secondary">
          <dt className="fw-normal">VAT</dt>
          <dd className="mb-0">{formatCurrency(vat)}</dd>
        </div>

        <hr />

        <div className="d-flex justify-content-between align-items-center">
          <dt className="h5 mb-0">Tổng tiền</dt>
          <dd className="h4 text-danger fw-bold mb-0">
            {formatCurrency(subtotal - discount + vat)}
          </dd>
        </div>
      </dl>
    </Card>
  );
}
