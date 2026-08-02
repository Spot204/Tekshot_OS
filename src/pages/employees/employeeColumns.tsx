import Icon from "../../components/ui/Icon";
import type { Column } from "../../components/ui/Table";
import type { Employee } from "../../types/employee";
import Avatar from "../../components/ui/Avatar";
import Badge from "../../components/ui/Badge";
import RowActions from "../../components/ui/RowActions";
import type { SortSpec } from "../../hooks/useTableSort";
import { ROLES, SHIFTS } from "../../constants/employee";

/**
 * Khoá sắp xếp tách khỏi factory: factory cần `allSelected`, mà giá trị đó
 * lại tính từ dữ liệu đã sort. Trang dùng spec này để sort trước, dựng cột sau.
 */
const SORT = {
  employee: { id: "employee", accessor: "name" },
  role: { id: "role", sortValue: (e) => ROLES[e.role].label },
  shift: { id: "shift", sortValue: (e) => SHIFTS[e.shift].from },
} satisfies Record<string, SortSpec<Employee>>;

export const employeeSortSpec: SortSpec<Employee>[] = Object.values(SORT);

interface Options {
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  onToggleAll: () => void;
  /** Mọi dòng đang hiển thị đều được chọn */
  allSelected: boolean;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export const createEmployeeColumns = ({
  selectedIds,
  onToggle,
  onToggleAll,
  allSelected,
  onEdit,
  onDelete,
}: Options): Column<Employee>[] => [
  {
    id: "select",
    width: "48px",
    header: (
      <input
        type="checkbox"
        className="form-check-input"
        checked={allSelected}
        onChange={onToggleAll}
        aria-label="Chọn tất cả nhân viên"
      />
    ),
    render: (employee) => (
      <input
        type="checkbox"
        className="form-check-input"
        checked={selectedIds.has(employee.id)}
        onChange={() => onToggle(employee.id)}
        aria-label={`Chọn ${employee.name}`}
      />
    ),
  },
  {
    ...SORT.employee,
    header: "Nhân viên",
    sortable: true,
    render: (employee) => (
      <div className="d-flex align-items-center gap-2">
        <Avatar name={employee.name} imageUrl={employee.avatarUrl} size={40} />
        <div>
          <div className="fw-semibold">{employee.name}</div>
          <div className="text-secondary small">{employee.id}</div>
        </div>
      </div>
    ),
  },
  {
    id: "contact",
    header: "Thông tin liên hệ",
    render: (employee) => (
      <div className="d-flex flex-column gap-1 small">
        <span className="d-flex align-items-center gap-2">
          <Icon name="telephone" size={14} className="text-secondary" />
          {employee.phone}
        </span>
        <span className="d-flex align-items-center gap-2">
          <Icon name="envelope" size={14} className="text-secondary" />
          {employee.email}
        </span>
      </div>
    ),
  },
  {
    ...SORT.role,
    header: "Vai trò",
    sortable: true,
    render: (employee) => (
      <Badge variant={ROLES[employee.role].variant} size="sm">
        {ROLES[employee.role].label}
      </Badge>
    ),
  },
  {
    ...SORT.shift,
    header: "Ca làm việc",
    sortable: true,
    render: (employee) => {
      const shift = SHIFTS[employee.shift];

      return (
        <div className="d-flex align-items-center gap-2">
          <span style={{ color: shift.color }}>{shift.icon}</span>
          <div>
            <div className="fw-semibold small">{shift.label}</div>
            <div className="text-secondary small">
              {shift.from} – {shift.to}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Thao tác",
    align: "center",
    width: "90px",
    render: (employee) => (
      <RowActions
        actions={[
          {
            label: "Sửa thông tin",
            icon: "pencil",
            onClick: () => onEdit(employee),
          },
          {
            label: "Xóa nhân viên",
            icon: "trash",
            danger: true,
            dividerBefore: true,
            onClick: () => onDelete(employee),
          },
        ]}
      />
    ),
  },
];
