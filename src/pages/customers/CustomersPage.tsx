import { useMemo, useState } from "react";
import Icon from "../../components/ui/Icon";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Table from "../../components/ui/Table";
import TablePagination from "../../components/ui/TablePagination";
import DateInput from "../../components/ui/DateInput";
import { useTableSort } from "../../hooks/useTableSort";
import { customerColumns } from "./customerColumns";
import { customers } from "../../mocks/customers";

const matches = (haystack: string | null, keyword: string) =>
  (haystack ?? "").toLowerCase().includes(keyword);

export default function CustomersPage() {
  const [keyword, setKeyword] = useState("");
  const [day, setDay] = useState<Date | null>(new Date("2026-07-27"));
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Lọc/phân trang cắt mảng ở client — thay bằng request khi có API
  const filtered = useMemo(() => {
    const needle = keyword.trim().toLowerCase();
    if (!needle) return customers;
    return customers.filter(
      (customer) =>
        matches(customer.name, needle) ||
        matches(customer.phone, needle) ||
        matches(customer.address, needle),
    );
  }, [keyword]);

  const { sort, sorted, onSortChange } = useTableSort(
    filtered,
    customerColumns,
  );
  const visible = sorted.slice((page - 1) * pageSize, page * pageSize);

  // Đổi bộ lọc mà không về trang 1 thì bảng render rỗng
  const search = (value: string) => {
    setKeyword(value);
    setPage(1);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-2">
        <div className="d-flex align-items-center gap-3">
          <div className="customer-page-icon">
            <Icon name="people" size={28} />
          </div>
          <div>
            <h4 className="fw-bold mb-0">Khách hàng</h4>
            <p className="text-secondary small mb-0">
              Quản lý thông tin và lịch sử mua hàng của khách hàng.
            </p>
          </div>
        </div>

        <div style={{ width: 260 }}>
          <DateInput selected={day} onChange={setDay} showWeekday />
        </div>
      </div>

      <Card shadow bordered={false} padding="p-4" className="mb-2">
        <label htmlFor="customer-search" className="form-label fw-semibold">
          Tìm kiếm
        </label>
        <Input
          id="customer-search"
          placeholder="Tìm theo họ tên, SĐT, email..."
          value={keyword}
          onChange={(event) => search(event.target.value)}
          leftIcon={<Icon name="search" size={18} />}
        />
      </Card>

      <Card shadow bordered={false} padding="p-4">
        <div className="d-flex align-items-center gap-2 mb-3">
          <span className="customer-list-icon">
            <Icon name="people" size={18} />
          </span>
          <h2 className="h6 fw-semibold mb-0">
            Danh sách khách hàng ({filtered.length})
          </h2>
        </div>

        <Table
          columns={customerColumns}
          data={visible}
          rowKey="id"
          showIndex
          currentPage={page}
          pageSize={pageSize}
          sort={sort}
          onSortChange={onSortChange}
          emptyMessage="Không tìm thấy khách hàng phù hợp"
        />

        <div className="mt-4">
          <TablePagination
            page={page}
            pageSize={pageSize}
            total={filtered.length}
            onPageChange={setPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setPage(1);
            }}
            itemLabel="khách hàng"
          />
        </div>
      </Card>
    </>
  );
}
