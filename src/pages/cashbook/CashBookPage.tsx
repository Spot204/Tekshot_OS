import { useMemo, useState } from "react";
import { ReceiptText } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import TablePagination from "../../components/ui/TablePagination";
import CashBookStats from "./CashBookStats";
import CashBookFilters from "./CashBookFilters";
import type { CashBookFilterState } from "./CashBookFilters";
import { createCashBookColumns } from "./cashBookColumns";
import { summarize, toCashRows } from "./cashRows";
import { cashEntries, openingBalance } from "../../mocks/cashbook";
import { formatDate, isWithinRange } from "../../utils/format";

const INITIAL_FILTER: CashBookFilterState = {
  range: [new Date("2026-07-01"), new Date("2026-07-28")],
  flow: "",
  method: "",
  keyword: "",
};

export default function CashBookPage() {
  const [filter, setFilter] = useState(INITIAL_FILTER);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Số dư luỹ kế tính một lần trên toàn bộ dữ liệu, trước mọi bộ lọc
  const allRows = useMemo(
    () => toCashRows(cashEntries, openingBalance),
    [],
  );

  const [from, to] = filter.range;

  const inPeriod = useMemo(
    () => allRows.filter((row) => isWithinRange(row.at, from, to)),
    [allRows, from, to],
  );

  // Lọc/phân trang cắt mảng ở client — thay bằng request khi có API
  const filtered = useMemo(() => {
    const needle = filter.keyword.trim().toLowerCase();

    return inPeriod.filter((row) => {
      if (filter.flow && row.flow !== filter.flow) return false;
      if (filter.method && row.method !== filter.method) return false;
      if (!needle) return true;
      return [row.description, row.id].some((field) =>
        field.toLowerCase().includes(needle),
      );
    });
  }, [inPeriod, filter.flow, filter.method, filter.keyword]);

  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
  const summary = summarize(inPeriod);

  const columns = createCashBookColumns({
    onDetail: (row) => console.log("Chi tiết", row.id),
    onPrint: (row) => console.log("In phiếu", row.id),
  });

  // Đổi bộ lọc mà không về trang 1 thì bảng render rỗng
  const patchFilter = (patch: Partial<CashBookFilterState>) => {
    setFilter((prev) => ({ ...prev, ...patch }));
    setPage(1);
  };

  const periodLabel =
    from && to
      ? `Trong kỳ ${formatDate(from.toISOString())} - ${formatDate(to.toISOString())}`
      : "Toàn bộ thời gian";

  return (
    <>
      <div className="d-flex align-items-center gap-3 mb-2">
        <span className="cashbook-page-icon">
          <ReceiptText size={24} />
        </span>
        <h4 className="fw-bold mb-0">Sổ quỹ</h4>
        <Button variant="danger" className="fw-semibold">
          Chốt quỹ
        </Button>
      </div>

      <CashBookStats
        balance={allRows[0]?.balance ?? openingBalance}
        totalIn={summary.totalIn}
        totalOut={summary.totalOut}
        count={summary.count}
        updatedAt={allRows[0]?.at ?? null}
        periodLabel={periodLabel}
      />

      <CashBookFilters value={filter} onChange={patchFilter} />

      <Card shadow bordered={false} padding="p-4">
        <Table
          columns={columns}
          data={visible}
          rowKey="id"
          currentPage={page}
          pageSize={pageSize}
          emptyMessage="Không có giao dịch phù hợp"
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
            itemLabel="giao dịch"
          />
        </div>
      </Card>
    </>
  );
}
