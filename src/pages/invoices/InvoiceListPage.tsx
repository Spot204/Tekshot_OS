import { useMemo, useState } from "react";
import { Collapse } from "react-bootstrap";
import { FileText, Plus, Send, Filter, RotateCcw } from "lucide-react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import TablePagination from "../../components/ui/TablePagination";
import Input from "../../components/ui/Input";
import ComboBox from "../../components/ui/ComboBox";
import DateInput from "../../components/ui/DateInput";
import { createInvoiceColumns, INVOICE_STATUS_OPTIONS } from "./invoiceColumns";
import type { Invoice } from "../../types/invoice";
import { isWithinRange } from "../../utils/format";

export interface InvoiceListPageProps {
  title: string;
  subtitle: string;
  invoices: Invoice[];
  /** Nhãn nút tạo mới, khác nhau giữa hóa đơn đầu vào và đầu ra */
  createLabel: string;
  submitLabel: string;
}

/** Thân chung của hai trang hóa đơn (đầu vào / đầu ra) */
export default function InvoiceListPage({
  title,
  subtitle,
  invoices,
  createLabel,
  submitLabel,
}: InvoiceListPageProps) {
  const [showFilter, setShowFilter] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return invoices.filter((invoice) => {
      if (status && invoice.status !== status) return false;
      if (!isWithinRange(invoice.issuedAt, fromDate, toDate)) return false;
      if (!keyword) return true;

      return (
        invoice.id.toLowerCase().includes(keyword) ||
        invoice.orderId.toLowerCase().includes(keyword) ||
        invoice.customer.toLowerCase().includes(keyword)
      );
    });
  }, [invoices, search, status, fromDate, toDate]);

  // Cắt ở client vì dữ liệu đang là mock; khi có API thì đổi chỗ này thành request
  const visible = useMemo(
    () => filtered.slice((page - 1) * pageSize, page * pageSize),
    [filtered, page, pageSize],
  );

  const columns = useMemo(
    () =>
      createInvoiceColumns({
        onView: (invoice) => console.log("Xem hóa đơn:", invoice.id),
        onPrint: (invoice) => console.log("In hóa đơn:", invoice.id),
        onCancel: (invoice) => console.log("Hủy hóa đơn:", invoice.id),
      }),
    [],
  );

  const resetFilter = () => {
    setSearch("");
    setStatus("");
    setFromDate(null);
    setToDate(null);
    setPage(1);
  };

  /** Mọi thay đổi bộ lọc đều phải quay về trang 1, nếu không sẽ ra bảng rỗng */
  const withPageReset =
    <T,>(setter: (value: T) => void) =>
    (value: T) => {
      setter(value);
      setPage(1);
    };

  return (
    <>
      {/* ================= Tiêu đề + hành động ================= */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-2">
        <div className="d-flex align-items-center gap-3">
          <div className="p-3 rounded-3 app-surface shadow-sm text-warning">
            <FileText size={28} />
          </div>
          <div>
            <h4 className="fw-bold mb-0">{title}</h4>
            <p className="text-secondary small mb-0">{subtitle}</p>
          </div>
        </div>

        <div className="d-flex gap-2">
          <Button
            customVariant="secondary"
            onClick={() => console.log(createLabel)}
          >
            <Plus size={18} className="me-1" />
            {createLabel}
          </Button>
          <Button
            customVariant="primary"
            onClick={() => console.log(submitLabel)}
          >
            <Send size={18} className="me-1" />
            {submitLabel}
          </Button>
        </div>
      </div>

      {/* ================= Bộ lọc ================= */}
      <Card shadow bordered={false} padding="p-3" className="mb-2">
        <div className="d-flex justify-content-end gap-2">
          <Button
            customVariant="secondary"
            onClick={() => setShowFilter((open) => !open)}
          >
            <Filter size={18} className="me-1" /> Bộ lọc
          </Button>
          <Button
            variant="link"
            className="text-decoration-none text-body d-flex align-items-center"
            onClick={resetFilter}
          >
            <RotateCcw size={18} className="me-1" /> Đặt lại
          </Button>
        </div>

        <Collapse in={showFilter}>
          <div>
            <div className="row g-3 mt-4 border-top pt-4">
              <div className="col-md-6 col-xl-3">
                <DateInput
                  selected={fromDate}
                  onChange={withPageReset(setFromDate)}
                  placeholder="Từ ngày"
                />
              </div>

              <div className="col-md-6 col-xl-3">
                <DateInput
                  selected={toDate}
                  onChange={withPageReset(setToDate)}
                  placeholder="Đến ngày"
                />
              </div>

              <div className="col-md-6 col-xl-2">
                <ComboBox
                  options={INVOICE_STATUS_OPTIONS}
                  placeholder="Tất cả trạng thái"
                  value={status}
                  onChange={(e) => withPageReset(setStatus)(e.target.value)}
                  aria-label="Lọc theo trạng thái"
                />
              </div>

              <div className="col-md-6 col-xl-4">
                <Input
                  placeholder="Tìm theo số hóa đơn, khách hàng, mã đơn..."
                  value={search}
                  onChange={(e) => withPageReset(setSearch)(e.target.value)}
                  leftIcon={<i className="bi bi-search" />}
                />
              </div>
            </div>
          </div>
        </Collapse>
      </Card>

      {/* ================= Bảng ================= */}
      <Card shadow bordered={false} padding="p-3">
        <Table
          columns={columns}
          data={visible}
          rowKey="id"
          showIndex
          currentPage={page}
          pageSize={pageSize}
          emptyMessage="Không tìm thấy hóa đơn phù hợp"
        />

        <div className="mt-4">
          <TablePagination
            page={page}
            pageSize={pageSize}
            total={filtered.length}
            onPageChange={setPage}
            onPageSizeChange={withPageReset(setPageSize)}
            itemLabel="hóa đơn"
          />
        </div>
      </Card>
    </>
  );
}
