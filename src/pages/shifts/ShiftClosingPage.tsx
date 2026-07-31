import { useMemo, useState } from "react";
import { ReceiptText } from "lucide-react";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import TablePagination from "../../components/ui/TablePagination";
import ShiftFilters from "./ShiftFilters";
import type { ShiftFilterState } from "./ShiftFilters";
import { createShiftColumns, shiftSortSpec } from "./shiftColumns";
import { toShiftRow } from "./shiftRows";
import { useTableSort } from "../../hooks/useTableSort";
import { shiftClosings } from "../../mocks/shifts";
import { isWithinRange } from "../../utils/format";

const INITIAL_FILTER: ShiftFilterState = {
  from: new Date("2026-07-01"),
  to: new Date("2026-07-28"),
  employeeId: "",
  keyword: "",
};

export default function ShiftClosingPage() {
  const [filter, setFilter] = useState(INITIAL_FILTER);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Mới nhất lên đầu; useTableSort chỉ can thiệp khi người dùng bấm cột
  const rows = useMemo(
    () =>
      shiftClosings
        .map(toShiftRow)
        .sort((a, b) => b.startedAt.localeCompare(a.startedAt)),
    [],
  );

  // Lọc/phân trang cắt mảng ở client — thay bằng request khi có API
  const filtered = useMemo(() => {
    const needle = filter.keyword.trim().toLowerCase();

    return rows.filter((shift) => {
      if (!isWithinRange(shift.startedAt, filter.from, filter.to)) return false;
      if (filter.employeeId && shift.employeeId !== filter.employeeId)
        return false;
      if (!needle) return true;
      return [shift.id, shift.note].some((field) =>
        field.toLowerCase().includes(needle),
      );
    });
  }, [rows, filter]);

  const { sort, sorted, onSortChange } = useTableSort(filtered, shiftSortSpec);
  const visible = sorted.slice((page - 1) * pageSize, page * pageSize);

  // Đổi bộ lọc mà không về trang 1 thì bảng render rỗng
  const patchFilter = (patch: Partial<ShiftFilterState>) => {
    setFilter((prev) => ({ ...prev, ...patch }));
    setPage(1);
  };

  const columns = createShiftColumns({
    onDetail: (shift) => console.log("Chi tiết chốt ca", shift.id),
  });

  return (
    <>
      <div className="d-flex align-items-center gap-3 mb-4">
        <span className="cashbook-page-icon">
          <ReceiptText size={24} />
        </span>
        <h4 className="fw-bold mb-0">Danh sách chốt ca</h4>
      </div>

      <ShiftFilters value={filter} onChange={patchFilter} />

      <Card shadow bordered={false} padding="p-4">
        <Table
          columns={columns}
          data={visible}
          rowKey="id"
          currentPage={page}
          pageSize={pageSize}
          sort={sort}
          onSortChange={onSortChange}
          emptyMessage="Không có lượt chốt ca phù hợp"
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
            itemLabel="chốt ca"
          />
        </div>
      </Card>
    </>
  );
}
