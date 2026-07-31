import { useMemo, useState } from "react";
import { PackageSearch, Search } from "lucide-react";
import clsx from "clsx";
import type { Column } from "../../components/ui/Table";
import type { ReorderRow } from "./orderingRows";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import ComboBox from "../../components/ui/ComboBox";
import Table from "../../components/ui/Table";
import Badge from "../../components/ui/Badge";
import OrderingSummary from "./OrderingSummary";
import { groupBySupplier, toReorderRows } from "./orderingRows";
import { useTableSort } from "../../hooks/useTableSort";
import { STOCK_LEVELS } from "../../constants/stockItem";
import { materials, supplies } from "../../mocks/stockItems";
import { toNumber } from "../vouchers/voucherLine";
import { formatCurrency, formatNumber } from "../../utils/format";

const TABS = [
  { id: "need", label: "Cần gọi hàng" },
  { id: "all", label: "Tất cả vật phẩm" },
];

const SOURCE_OPTIONS = [
  { value: "", label: "Tất cả loại" },
  { value: "supply", label: "Vật tư" },
  { value: "material", label: "Nguyên liệu" },
];

const SORT = [
  { id: "name", accessor: "name" as const },
  { id: "stock", accessor: "stock" as const },
];

export default function OrderingPage() {
  const [tab, setTab] = useState("need");
  const [keyword, setKeyword] = useState("");
  const [source, setSource] = useState("");
  const [supplier, setSupplier] = useState("");
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [note, setNote] = useState("");

  const rows = useMemo(() => toReorderRows(supplies, materials), []);

  const supplierOptions = useMemo(
    () => [
      { value: "", label: "Tất cả nhà cung cấp" },
      ...[...new Set(rows.map((row) => row.supplier))].sort().map((value) => ({
        value,
        label: value,
      })),
    ],
    [rows],
  );

  const filtered = useMemo(() => {
    const needle = keyword.trim().toLowerCase();

    return rows.filter((row) => {
      if (tab === "need" && row.level === "ok") return false;
      if (source && row.source !== source) return false;
      if (supplier && row.supplier !== supplier) return false;
      if (!needle) return true;
      return [row.name, row.id, row.supplier].some((field) =>
        field.toLowerCase().includes(needle),
      );
    });
  }, [rows, tab, source, supplier, keyword]);

  const { sort, sorted, onSortChange } = useTableSort(filtered, SORT);

  const toggle = (row: ReorderRow) =>
    setPicked((prev) => {
      const next = { ...prev };
      if (row.id in next) delete next[row.id];
      // Bỏ tick rồi tick lại thì lấy lại số gợi ý, tối thiểu 1
      else next[row.id] = Math.max(row.suggested, 1);
      return next;
    });

  const setQuantity = (row: ReorderRow, quantity: number) =>
    setPicked((prev) =>
      quantity <= 0
        ? Object.fromEntries(Object.entries(prev).filter(([id]) => id !== row.id))
        : { ...prev, [row.id]: quantity },
    );

  const groups = useMemo(
    () =>
      groupBySupplier(
        rows
          .filter((row) => row.id in picked)
          .map((row) => ({ row, quantity: picked[row.id] })),
      ),
    [rows, picked],
  );

  const needCount = rows.filter((row) => row.level !== "ok").length;
  const outCount = rows.filter((row) => row.level === "out").length;
  const suggestedValue = rows.reduce(
    (sum, row) => sum + row.price * row.suggested,
    0,
  );

  const columns: Column<ReorderRow>[] = [
    {
      id: "pick",
      header: "",
      width: "44px",
      render: (row) => (
        <input
          type="checkbox"
          className="form-check-input"
          checked={row.id in picked}
          onChange={() => toggle(row)}
          aria-label={`Chọn ${row.name}`}
        />
      ),
    },
    {
      id: "name",
      header: "Vật phẩm",
      accessor: "name",
      sortable: true,
      render: (row) => (
        <div className="min-w-0">
          <div className="fw-semibold text-truncate">{row.name}</div>
          <div className="text-secondary small">
            {row.id} · {row.location}
          </div>
        </div>
      ),
    },
    {
      id: "source",
      header: "Loại",
      render: (row) => (
        <Badge variant={row.source === "supply" ? "primary" : "purple"} size="sm">
          {row.source === "supply" ? "Vật tư" : "Nguyên liệu"}
        </Badge>
      ),
    },
    {
      id: "stock",
      header: "Tồn / Định mức",
      accessor: "stock",
      sortable: true,
      align: "end",
      render: (row) => (
        <span className="text-nowrap">
          <span
            className={clsx("fw-semibold", row.level !== "ok" && "text-danger")}
          >
            {formatNumber(row.stock)}
          </span>
          <span className="text-secondary small">
            {" / "}
            {formatNumber(row.minStock)} {row.unit}
          </span>
        </span>
      ),
    },
    {
      id: "level",
      header: "Trạng thái",
      render: (row) => (
        <Badge variant={STOCK_LEVELS[row.level].variant} size="sm">
          {STOCK_LEVELS[row.level].label}
        </Badge>
      ),
    },
    {
      id: "quantity",
      header: "Số lượng gọi",
      align: "center",
      width: "130px",
      render: (row) => (
        <Input
          size="sm"
          inputMode="numeric"
          className="text-center"
          aria-label={`Số lượng gọi ${row.name}`}
          value={String(picked[row.id] ?? row.suggested)}
          onChange={(e) => setQuantity(row, toNumber(e.target.value))}
        />
      ),
    },
    {
      id: "supplier",
      header: "Nhà cung cấp",
      accessor: "supplier",
    },
    {
      id: "cost",
      header: "Thành tiền",
      align: "end",
      render: (row) => (
        <span className="text-nowrap">
          {formatCurrency(row.price * (picked[row.id] ?? row.suggested))}
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="d-flex align-items-center gap-3 mb-2">
        <span className="warehouse-page-icon">
          <PackageSearch size={24} />
        </span>
        <div>
          <h4 className="fw-bold mb-0">Gọi hàng</h4>
          <p className="text-secondary small mb-0">Kho hàng · Gọi hàng</p>
        </div>
      </div>

      <div className="row g-2 mb-2">
        <div className="col-md-4">
          <Card shadow bordered={false} padding="p-4">
            <div className="text-secondary small">Cần gọi thêm</div>
            <div className="h4 fw-bold mb-0" style={{ color: "var(--warning)" }}>
              {formatNumber(needCount)}
            </div>
          </Card>
        </div>
        <div className="col-md-4">
          <Card shadow bordered={false} padding="p-4">
            <div className="text-secondary small">Đã hết hàng</div>
            <div className="h4 fw-bold mb-0" style={{ color: "var(--danger)" }}>
              {formatNumber(outCount)}
            </div>
          </Card>
        </div>
        <div className="col-md-4">
          <Card shadow bordered={false} padding="p-4">
            <div className="text-secondary small">Giá trị gọi hàng gợi ý</div>
            <div className="h4 fw-bold mb-0">{formatCurrency(suggestedValue)}</div>
          </Card>
        </div>
      </div>

      <div className="row g-2">
        <div className="col-xl-8">
          <Card shadow bordered={false} padding="p-4">
            <div className="app-tabs mb-3" role="tablist">
              {TABS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={tab === item.id}
                  className={clsx("app-tab", tab === item.id && "is-active")}
                  onClick={() => setTab(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="row g-3 mb-3">
              <div className="col-lg-5">
                <Input
                  placeholder="Tìm theo tên, mã, nhà cung cấp..."
                  aria-label="Tìm kiếm vật phẩm"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  leftIcon={<Search size={18} />}
                />
              </div>
              <div className="col-lg-3">
                <ComboBox
                  options={SOURCE_OPTIONS}
                  aria-label="Loại vật phẩm"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                />
              </div>
              <div className="col-lg-4">
                <ComboBox
                  options={supplierOptions}
                  aria-label="Nhà cung cấp"
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                />
              </div>
            </div>

            <Table
              columns={columns}
              data={sorted}
              rowKey="id"
              sort={sort}
              onSortChange={onSortChange}
              emptyMessage="Không có vật phẩm nào cần gọi thêm"
            />
          </Card>
        </div>

        <div className="col-xl-4">
          <OrderingSummary
            groups={groups}
            note={note}
            onNoteChange={setNote}
            onRemove={(row) => setQuantity(row, 0)}
            onCancel={() => {
              setPicked({});
              setNote("");
            }}
            onSubmit={() => {
              console.log("Tạo đơn gọi hàng", { groups, note });
              setPicked({});
              setNote("");
            }}
          />
        </div>
      </div>
    </>
  );
}
