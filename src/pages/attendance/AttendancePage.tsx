import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Download,
  Fingerprint,
  MoreVertical,
  Settings,
  Table2,
} from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import TablePagination from "../../components/ui/TablePagination";
import DateInput from "../../components/ui/DateInput";
import AttendanceFilters from "./AttendanceFilters";
import type { AttendanceFilterState } from "./AttendanceFilters";
import {
  createAttendanceColumns,
  attendanceSortSpec,
} from "./attendanceColumns";
import { toAttendanceRows } from "./attendanceRow";
import { useTableSort } from "../../hooks/useTableSort";
import { attendanceFor } from "../../mocks/attendance";
import { employees } from "../../mocks/employees";
import { formatDateWithWeekday } from "../../utils/format";

const EMPTY_FILTER: AttendanceFilterState = {
  keyword: "",
  department: "",
  shift: "",
  status: "",
};

/** Date -> "2026-07-27" theo giờ địa phương, không qua toISOString (lệch UTC) */
const toIsoDate = (date: Date): string =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;

const shiftDay = (date: Date, days: number): Date => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

export default function AttendancePage() {
  const [day, setDay] = useState<Date>(new Date("2026-07-27"));
  const [filter, setFilter] = useState(EMPTY_FILTER);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const rows = useMemo(
    () => toAttendanceRows(employees, attendanceFor(toIsoDate(day))),
    [day],
  );

  // Lọc/phân trang cắt mảng ở client — thay bằng request khi có API
  const filtered = useMemo(() => {
    const needle = filter.keyword.trim().toLowerCase();

    return rows.filter((row) => {
      const { employee } = row;
      if (filter.department && employee.department !== filter.department)
        return false;
      if (filter.shift && employee.shift !== filter.shift) return false;
      if (filter.status === "present" && !row.present) return false;
      if (filter.status === "absent" && row.present) return false;
      if (!needle) return true;

      return [employee.name, employee.id].some((field) =>
        field.toLowerCase().includes(needle),
      );
    });
  }, [rows, filter]);

  const { sort, sorted, onSortChange } = useTableSort(
    filtered,
    attendanceSortSpec,
  );
  const visible = sorted.slice((page - 1) * pageSize, page * pageSize);

  // Đổi bộ lọc mà không về trang 1 thì bảng render rỗng
  const patchFilter = (patch: Partial<AttendanceFilterState>) => {
    setFilter((prev) => ({ ...prev, ...patch }));
    setPage(1);
  };

  const goToDay = (date: Date) => {
    setDay(date);
    setPage(1);
  };

  const columns = createAttendanceColumns({
    onDetail: (row) => console.log("Chi tiết", row.id),
    onEdit: (row) => console.log("Sửa giờ", row.id),
  });

  return (
    <>
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-2">
        <div className="d-flex align-items-center gap-3">
          <div className="attendance-page-icon">
            <Fingerprint size={28} />
          </div>
          <div>
            <h4 className="fw-bold mb-0">Chấm công</h4>
            <p className="text-secondary small mb-0">
              Theo dõi thời gian làm việc và lịch sử chấm công của nhân viên.
            </p>
          </div>
        </div>

        <div className="d-flex flex-column align-items-end gap-2">
          <div style={{ width: 260 }}>
            <DateInput
              selected={day}
              onChange={(date) => date && goToDay(date)}
              showWeekday
            />
          </div>

          <div className="d-flex gap-2">
            <Button className="d-inline-flex align-items-center gap-2">
              <Download size={16} aria-hidden="true" />
              Xuất báo cáo
            </Button>

            <Button
              customVariant="secondary"
              className="d-inline-flex align-items-center gap-2"
            >
              <MoreVertical size={16} aria-hidden="true" />
              Tùy chọn
            </Button>
          </div>
        </div>
      </div>

      <AttendanceFilters
        value={filter}
        onChange={patchFilter}
        onReset={() => {
          setFilter(EMPTY_FILTER);
          setPage(1);
        }}
      />

      <Card shadow bordered={false} padding="p-4">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
          <div className="d-flex align-items-center gap-2">
            <span className="attendance-list-icon">
              <Table2 size={18} />
            </span>
            <h2 className="h6 fw-semibold mb-0">Danh sách chấm công</h2>
          </div>

          <div className="d-flex align-items-center gap-2">
            <Button
              customVariant="secondary"
              className="d-inline-flex align-items-center gap-2"
              onClick={() => goToDay(new Date())}
            >
              <CalendarDays size={16} aria-hidden="true" />
              Hôm nay
            </Button>

            <button
              type="button"
              className="app-header-icon-btn border"
              aria-label={`Ngày trước, ${formatDateWithWeekday(shiftDay(day, -1))}`}
              onClick={() => goToDay(shiftDay(day, -1))}
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              className="app-header-icon-btn border"
              aria-label={`Ngày sau, ${formatDateWithWeekday(shiftDay(day, 1))}`}
              onClick={() => goToDay(shiftDay(day, 1))}
            >
              <ChevronRight size={18} />
            </button>

            <button
              type="button"
              className="app-header-icon-btn border"
              aria-label="Cấu hình bảng"
            >
              <Settings size={18} />
            </button>
          </div>
        </div>

        <Table
          columns={columns}
          data={visible}
          rowKey="id"
          showIndex
          currentPage={page}
          pageSize={pageSize}
          sort={sort}
          onSortChange={onSortChange}
          emptyMessage="Không có dữ liệu chấm công phù hợp"
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
            itemLabel="nhân viên"
          />
        </div>
      </Card>
    </>
  );
}
