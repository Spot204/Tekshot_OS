import { useMemo, useState } from "react";
import { ReceiptText } from "lucide-react";
import clsx from "clsx";
import type { CashEntry, CashFlow } from "../../types/cashbook";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import TablePagination from "../../components/ui/TablePagination";
import VoucherFilters from "./VoucherFilters";
import type { VoucherFilterState } from "./VoucherFilters";
import VoucherFormModal from "./VoucherFormModal";
import type { VoucherDraft } from "./VoucherFormModal";
import { createVoucherColumns, voucherSortSpec } from "./voucherColumns";
import { useTableSort } from "../../hooks/useTableSort";
import { cashEntries } from "../../mocks/cashbook";
import { currentUser } from "../../mocks/user";
import { isWithinRange } from "../../utils/format";

const TABS: { id: "" | CashFlow; label: string }[] = [
  { id: "", label: "Tất cả" },
  { id: "in", label: "Phiếu thu" },
  { id: "out", label: "Phiếu chi" },
];

const INITIAL_FILTER: VoucherFilterState = {
  range: [new Date("2026-07-01"), new Date("2026-07-28")],
  flow: "",
  status: "",
  keyword: "",
};

const buildId = (flow: CashFlow, count: number) => {
  const now = new Date();
  const stamp = [now.getDate(), now.getMonth() + 1]
    .map((part) => String(part).padStart(2, "0"))
    .join("");
  const prefix = flow === "in" ? "PT" : "PC";
  return `${prefix}-${stamp}${String(now.getFullYear()).slice(2)}-${String(count).padStart(3, "0")}`;
};

/** Mặc định mới nhất lên đầu; useTableSort chỉ can thiệp khi người dùng bấm cột */
const newestFirst = (entries: CashEntry[]) =>
  [...entries].sort((a, b) => b.at.localeCompare(a.at));

export default function VoucherListPage() {
  const [rows, setRows] = useState<CashEntry[]>(() => newestFirst(cashEntries));
  const [tab, setTab] = useState<"" | CashFlow>("");
  const [filter, setFilter] = useState(INITIAL_FILTER);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [from, to] = filter.range;

  // Lọc/phân trang cắt mảng ở client — thay bằng request khi có API
  const filtered = useMemo(() => {
    const needle = filter.keyword.trim().toLowerCase();
    // Tab và ô "Loại phiếu" cùng lọc một trường; tab thắng khi đang chọn
    const flow = tab || filter.flow;

    return rows.filter((voucher) => {
      if (!isWithinRange(voucher.at, from, to)) return false;
      if (flow && voucher.flow !== flow) return false;
      if (filter.status && voucher.status !== filter.status) return false;
      if (!needle) return true;
      return [voucher.id, voucher.description].some((field) =>
        field.toLowerCase().includes(needle),
      );
    });
  }, [rows, tab, filter, from, to]);

  const { sort, sorted, onSortChange } = useTableSort(
    filtered,
    voucherSortSpec,
  );
  const visible = sorted.slice((page - 1) * pageSize, page * pageSize);

  // Đổi bộ lọc mà không về trang 1 thì bảng render rỗng
  const patchFilter = (patch: Partial<VoucherFilterState>) => {
    setFilter((prev) => ({ ...prev, ...patch }));
    setPage(1);
  };

  const cancel = (voucher: CashEntry) =>
    setRows((prev) =>
      prev.map((row) =>
        row.id === voucher.id ? { ...row, status: "cancelled" } : row,
      ),
    );

  const create = (draft: VoucherDraft) => {
    const voucher: CashEntry = {
      id: buildId(draft.flow, rows.length + 1),
      at: new Date().toISOString(),
      flow: draft.flow,
      description: draft.title,
      method: draft.method,
      amount: draft.total,
      performedBy: currentUser.name,
      status: "completed",
      lines: draft.lines,
    };

    setRows((prev) => [voucher, ...prev]);
    setPage(1);

    // Phiếu mới mang ngày hôm nay; không nới khoảng lọc thì tạo xong nó biến mất
    const created = new Date(voucher.at);
    setFilter((prev) => {
      const [start, end] = prev.range;
      if (end && created <= end) return prev;
      return { ...prev, range: [start, created] };
    });
  };

  const columns = createVoucherColumns({
    onDetail: (voucher) => console.log("Chi tiết", voucher.id),
    onCancel: cancel,
  });

  return (
    <>
      <div className="d-flex align-items-center gap-3 mb-2">
        <span className="cashbook-page-icon">
          <ReceiptText size={24} />
        </span>
        <h4 className="fw-bold mb-0">Phiếu thu chi</h4>
      </div>

      <div className="app-tabs mb-2" role="tablist">
        {TABS.map((item) => (
          <button
            key={item.id || "all"}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            className={clsx("app-tab", tab === item.id && "is-active")}
            onClick={() => {
              setTab(item.id);
              setPage(1);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <VoucherFilters
        value={filter}
        onChange={patchFilter}
        onCreate={() => setShowForm(true)}
      />

      <Card shadow bordered={false} padding="p-4">
        <Table
          columns={columns}
          data={visible}
          rowKey="id"
          currentPage={page}
          pageSize={pageSize}
          sort={sort}
          onSortChange={onSortChange}
          emptyMessage="Không có phiếu phù hợp"
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
            itemLabel="phiếu"
          />
        </div>
      </Card>

      <VoucherFormModal
        show={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={create}
      />
    </>
  );
}
