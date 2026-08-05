import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/ui/Icon";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import TablePagination from "../../components/ui/TablePagination";
import { createOrderColumns } from "./orderColumns";
import type { Order } from "../../types/order";
import OrderOCR from "./OrdersOCR";
import OrderActions from "./OrderActions";
import InvoiceOutPage from "../invoices/InvoiceOutPage";

import DateInput from "../../components/ui/DateInput";
import ComboBox from "../../components/ui/ComboBox";

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
  const [isOcrOpen, setIsOcrOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeAction, setActiveAction] = useState<
    null | "edit" | "create" | "print" | "cancel" | "delete"
  >(null);
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);

  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [status, setStatus] = useState("");

  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return orders;
    return orders.filter(
      (order) =>
        order.id.toLowerCase().includes(keyword) ||
        order.customer.toLowerCase().includes(keyword),
    );
  }, [orders, search]);

  const STATUS_OPTIONS = [
    { value: "", label: "- Tất cả -" },
    { value: "processing", label: "Đang xử lý" },
    { value: "completed", label: "Hoàn thành" },
    { value: "cancelled", label: "Đã hủy" },
  ];

  // Cắt ở client vì dữ liệu đang là mock; khi có API thì đổi chỗ này thành request
  const visible = useMemo(
    () => filtered.slice((page - 1) * pageSize, page * pageSize),
    [filtered, page, pageSize],
  );

  const columns = useMemo(
    () =>
      createOrderColumns({
        onPrint: (order) => {
          console.log("In đơn:", order.id);
          setIsEditOpen(true);
          setActiveAction("print");
        },
        onCreate: (order) => {
          console.log("Tạo hóa đơn cho đơn:", order.id);
          navigate("/invoice-out", { state: { orderId: order.id } });
        },
        onCancel: (order) => {
          console.log("Hủy đơn:", order.id);
          setIsEditOpen(true);
          setActiveAction("cancel");
        },
        onEdit: (order) => {
          console.log("Sửa đơn:", order.id);
          setIsEditOpen(true);
          setActiveAction("edit");
        },
        onDelete: (order) => {
          console.log("Xóa đơn:", order.id);
          setIsEditOpen(true);
          setActiveAction("delete");
        },
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
    <>
      <Card shadow bordered={false} padding="p-3">
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
          actions={
            <>
              <Button
                customVariant="secondary"
                size="sm"
                onClick={() => setIsOcrOpen(true)}
              >
                <Icon name="printer" className="me-1" />
                Tạo đơn OCR
              </Button>
              <div className="position-relative d-inline-block">
                <Button
                  customVariant="secondary"
                  size="sm"
                  onClick={() => setShowFilter((prev) => !prev)}
                >
                  <Icon name="funnel" className="me-1" />
                  Lọc
                </Button>

                {showFilter && (
                  <Card
                    className="position-absolute"
                    style={{
                      top: "110%",
                      right: 0, // nếu muốn sang trái của nút thì đổi thành left: 0
                      width: 320,
                      zIndex: 1000,
                    }}
                    padding="p-3"
                  >
                    <div className="d-flex flex-column gap-3">
                      <DateInput
                        selected={fromDate}
                        onChange={setFromDate}
                        placeholder="Từ ngày"
                      />

                      <DateInput
                        selected={toDate}
                        onChange={setToDate}
                        placeholder="Đến ngày"
                      />

                      <ComboBox
                        options={STATUS_OPTIONS}
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        placeholder="- Tất cả -"
                      />
                    </div>
                  </Card>
                )}
              </div>
            </>
          }
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
      {isOcrOpen && <OrderOCR onClose={() => setIsOcrOpen(false)} />}
      {isEditOpen && (
        <OrderActions
          mode={activeAction}
          onClose={() => {
            setIsEditOpen(false);
            setActiveAction(null);
          }}
        />
      )}
    </>
  );
}
