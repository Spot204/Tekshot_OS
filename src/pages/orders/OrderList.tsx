import { useMemo, useState } from "react";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import TablePagination from "../../components/ui/TablePagination";
import { createOrderColumns } from "./orderColumns";
import type { Order } from "../../types/order";

interface OrderListProps {
  orders: Order[];
  selectedOrderId: string;
  onSelectOrder: (orderId: string) => void;
}

export default function OrderList({
  orders,
  selectedOrderId,
  onSelectOrder,
}: OrderListProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return orders;
    return orders.filter(
      (order) =>
        order.id.toLowerCase().includes(keyword) ||
        order.customer.toLowerCase().includes(keyword),
    );
  }, [orders, search]);

  // Cắt ở client vì dữ liệu đang là mock; khi có API thì đổi chỗ này thành request
  const visible = useMemo(
    () => filtered.slice((page - 1) * pageSize, page * pageSize),
    [filtered, page, pageSize],
  );

  const columns = useMemo(
    () =>
      createOrderColumns({
        onEdit: (order) => console.log("Sửa đơn:", order.id),
        onDelete: (order) => console.log("Xóa đơn:", order.id),
      }),
    [],
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setPage(1);
  };

  return (
    <Card shadow bordered={false} padding="p-4">
      <Table
        columns={columns}
        data={visible}
        rowKey="id"
        title="Danh sách đơn hàng"
        showIndex
        currentPage={page}
        pageSize={pageSize}
        searchValue={search}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Tìm theo mã đơn, khách hàng..."
        emptyMessage="Không tìm thấy đơn hàng phù hợp"
        activeRowKey={selectedOrderId}
        onRowClick={(order) => onSelectOrder(order.id)}
      />

      <div className="mt-4">
        <TablePagination
          page={page}
          pageSize={pageSize}
          total={filtered.length}
          onPageChange={setPage}
          onPageSizeChange={handlePageSizeChange}
          itemLabel="đơn hàng"
        />
      </div>
    </Card>
  );
}
