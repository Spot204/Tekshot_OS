import type { Column } from "../../components/ui/Table";
import type { BadgeVariant } from "../../components/ui/Badge";
import Badge from "../../components/ui/Badge";
import RowActions from "../../components/ui/RowActions";
import OrderActions from "./OrderActions";

import type {
  Order,
  OrderLine,
  OrderStatus,
  PaymentMethod,
} from "../../types/order";
import {
  formatCurrency,
  formatDateTime,
  formatNumber,
} from "../../utils/format";

const STATUS_VARIANT: Record<OrderStatus, BadgeVariant> = {
  "Hoàn thành": "success",
  "Đang xử lý": "primary",
  "Đã hủy": "danger",
};

const PAYMENT_VARIANT: Record<PaymentMethod, BadgeVariant> = {
  "Tiền mặt": "info",
  "Chuyển khoản": "info",
};

interface OrderColumnHandlers {
  onEdit: (order: Order) => void;
  onDelete: (order: Order) => void;
  onPrint: (order: Order) => void;
  onCreate: (order: Order) => void;
  onCancel: (order: Order) => void;
}

/** Factory vì cột "Thao tác" cần handler từ trang. Cột đó chỉ có `id`, không `accessor`. */
export const createOrderColumns = ({
  onEdit,
  onDelete,
  onPrint,
  onCreate,
  onCancel,
}: OrderColumnHandlers): Column<Order>[] => [
  {
    id: "id",
    header: "Mã đơn hàng",
    render: (order) => (
      <div>
        <div className="fw-bold">{order.id}</div>
        <small className="text-secondary">
          {formatDateTime(order.createdAt)}
        </small>
      </div>
    ),
  },
  {
    id: "customer",
    header: "Khách hàng",
    render: (order) => (
      <div>
        <div className="fw-semibold mb-1">{order.customer}</div>
        <Badge variant={PAYMENT_VARIANT[order.payment]} size="sm">
          {order.payment}
        </Badge>
      </div>
    ),
  },
  {
    id: "status",
    header: "Trạng thái",
    render: (order) => (
      <Badge variant={STATUS_VARIANT[order.status]} size="sm">
        {order.status}
      </Badge>
    ),
  },
  {
    id: "total",
    header: "Tổng tiền",
    align: "end",
    render: (order) => (
      <span className="fw-bold">{formatCurrency(order.total)}</span>
    ),
  },
  {
    id: "actions",
    header: "Thao tác",
    align: "center",
    width: "100px",
    render: (order) => (
      <RowActions
        actions={[
          {
            label: "In",
            icon: "pencil",
            onClick: () => onPrint(order),
          },
          {
            label: "Tạo hóa đơn",
            icon: "pencil",
            onClick: () => onCreate(order),
          },
          {
            label: "Sửa đơn",
            icon: "pencil",
            onClick: () => onEdit(order),
          },
          {
            label: "Hủy đơn",
            icon: "pencil",
            onClick: () => onCancel(order),
          },
          {
            label: "Xóa",
            icon: "trash",
            danger: true,
            dividerBefore: true,
            onClick: () => onDelete(order),
          },
        ]}
      />
    ),
  },
];

export const orderLineColumns: Column<OrderLine>[] = [
  { id: "name", header: "Sản phẩm", accessor: "name" },
  {
    id: "quantity",
    header: "SL",
    align: "center",
    render: (line) => formatNumber(line.quantity),
  },
  {
    id: "topping",
    header: "Topping",
    align: "center",
    render: (line) => formatNumber(line.topping),
  },
  {
    id: "discount",
    header: "Giảm",
    align: "center",
    render: (line) => formatCurrency(line.discount),
  },
  {
    id: "price",
    header: "Thành tiền",
    align: "end",
    render: (line) => (
      <span className="fw-semibold">{formatCurrency(line.price)}</span>
    ),
  },
];
