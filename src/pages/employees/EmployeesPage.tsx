import { useMemo, useState } from "react";
import { ChevronDown, Download, LayoutGrid, Plus, Users } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import TablePagination from "../../components/ui/TablePagination";
import DateInput from "../../components/ui/DateInput";
import EmployeeFilters from "./EmployeeFilters";
import { createEmployeeColumns, employeeSortSpec } from "./employeeColumns";
import EmployeeFormModal from "./EmployeeFormModal";
import type { EmployeeDraft } from "./EmployeeFormModal";
import { useTableSort } from "../../hooks/useTableSort";
import { primaryRole } from "../../constants/employee";
import { employees as seedEmployees } from "../../mocks/employees";
import type { Employee } from "../../types/employee";

/** Form không hỏi ca/phòng ban/SĐT nên đặt mặc định, sửa sau ở màn chi tiết */
const draftToEmployee = (draft: EmployeeDraft, index: number): Employee => ({
  id: `NV${String(index).padStart(4, "0")}`,
  name: draft.name,
  username: draft.username,
  email: draft.email,
  phone: "",
  permissions: draft.permissions,
  role: primaryRole(draft.permissions),
  shift: "office",
  department: "sales",
});

export default function EmployeesPage() {
  const [rows, setRows] = useState<Employee[]>(seedEmployees);
  const [showForm, setShowForm] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [role, setRole] = useState("");
  const [shift, setShift] = useState("");
  const [day, setDay] = useState<Date | null>(new Date("2026-07-27"));
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Lọc/phân trang cắt mảng ở client — thay bằng request khi có API
  const filtered = useMemo(() => {
    const needle = keyword.trim().toLowerCase();

    return rows.filter((employee) => {
      if (role && employee.role !== role) return false;
      if (shift && employee.shift !== shift) return false;
      if (!needle) return true;

      return [employee.name, employee.email, employee.phone, employee.id].some(
        (field) => field.toLowerCase().includes(needle),
      );
    });
  }, [rows, keyword, role, shift]);

  const { sort, sorted, onSortChange } = useTableSort(
    filtered,
    employeeSortSpec,
  );
  const visible = sorted.slice((page - 1) * pageSize, page * pageSize);

  const toggle = (id: string) =>
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (!next.delete(id)) next.add(id);
      return next;
    });

  const allSelected =
    visible.length > 0 && visible.every((e) => selectedIds.has(e.id));

  const toggleAll = () =>
    setSelectedIds((prev) => {
      const next = new Set(prev);
      visible.forEach((e) => (allSelected ? next.delete(e.id) : next.add(e.id)));
      return next;
    });

  const columns = createEmployeeColumns({
    selectedIds,
    onToggle: toggle,
    onToggleAll: toggleAll,
    allSelected,
    onEdit: (employee) => console.log("Sửa", employee.id),
    onDelete: (employee) => console.log("Xóa", employee.id),
  });

  // Đổi bộ lọc mà không về trang 1 thì bảng render rỗng
  const withPageReset =
    <T,>(setter: (value: T) => void) =>
    (value: T) => {
      setter(value);
      setPage(1);
    };

  return (
    <>
      <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
        <div className="d-flex align-items-center gap-3">
          <div className="employee-page-icon">
            <Users size={28} />
          </div>
          <div>
            <h4 className="fw-bold mb-0">Nhân viên</h4>
            <p className="text-secondary small mb-0">
              Quản lý thông tin nhân viên và phân quyền truy cập hệ thống.
            </p>
          </div>
        </div>

        <div className="d-flex flex-column align-items-end gap-2">
          <div style={{ width: 260 }}>
            <DateInput selected={day} onChange={setDay} showWeekday />
          </div>

          <Button
            className="d-inline-flex align-items-center gap-2"
            onClick={() => setShowForm(true)}
          >
            <Plus size={18} aria-hidden="true" />
            Thêm nhân viên
          </Button>
        </div>
      </div>

      <EmployeeFilters
        keyword={keyword}
        role={role}
        shift={shift}
        onKeywordChange={withPageReset(setKeyword)}
        onRoleChange={withPageReset(setRole)}
        onShiftChange={withPageReset(setShift)}
      />

      <Card shadow bordered={false} padding="p-4">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
          <div className="d-flex align-items-center gap-2">
            <span className="employee-list-icon">
              <LayoutGrid size={18} />
            </span>
            <h2 className="h6 fw-semibold mb-0">
              Danh sách nhân viên ({filtered.length})
            </h2>
          </div>

          <Button
            customVariant="secondary"
            className="d-inline-flex align-items-center gap-2"
          >
            <Download size={16} aria-hidden="true" />
            Xuất dữ liệu
            <ChevronDown size={16} aria-hidden="true" />
          </Button>
        </div>

        <Table
          columns={columns}
          data={visible}
          rowKey="id"
          currentPage={page}
          pageSize={pageSize}
          sort={sort}
          onSortChange={onSortChange}
          emptyMessage="Không tìm thấy nhân viên phù hợp"
        />

        <div className="mt-4">
          <TablePagination
            page={page}
            pageSize={pageSize}
            total={filtered.length}
            onPageChange={setPage}
            onPageSizeChange={withPageReset(setPageSize)}
            itemLabel="nhân viên"
          />
        </div>
      </Card>

      <EmployeeFormModal
        show={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={(draft) => {
          setRows((prev) => [draftToEmployee(draft, prev.length + 1), ...prev]);
          setPage(1);
        }}
      />
    </>
  );
}
