import { useState } from "react";
import OrderStats from "./OrderStats";
import OrderList from "./OrderList";
import OrderDetail from "./OrderDetail";
import OrderActions from "./OrderActions";

import { orders, orderLines, orderStats } from "../../mocks/orders";

export default function OrdersPage() {
  const [selectedOrderId, setSelectedOrderId] = useState(orders[0]?.id ?? "");

  const selectedOrder =
    orders.find((order) => order.id === selectedOrderId) ?? null;

  return (
    <>
      <OrderStats stats={orderStats} />

      <div className="row g-2">
        <div className="col-xl-7">
          <OrderList
            orders={orders}
            selectedOrderId={selectedOrderId}
            onSelectOrder={setSelectedOrderId}
          />
        </div>

        <div className="col-xl-5">
          <OrderDetail order={selectedOrder} lines={orderLines} />
        </div>
      </div>
    </>
  );
}
