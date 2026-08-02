import Icon from "../../components/ui/Icon";
import type { Column } from "../../components/ui/Table";
import type { SortSpec } from "../../hooks/useTableSort";
import type { AttendanceRow } from "./attendanceRow";
import Avatar from "../../components/ui/Avatar";
import Badge from "../../components/ui/Badge";
import RowActions from "../../components/ui/RowActions";
import { DEPARTMENTS, SHIFTS } from "../../constants/employee";
import { formatDuration } from "../../utils/time";

const SORT = {
  employee: { id: "employee", sortValue: (row) => row.employee.name },
} satisfies Record<string, SortSpec<AttendanceRow>>;

export const attendanceSortSpec: SortSpec<AttendanceRow>[] =
  Object.values(SORT);

/** Ô giờ trống hiện gạch ngang chứ không để rỗng */
const time = (value: string | null) =>
  value ?? <span className="text-secondary">-</span>;

interface Options {
  onDetail: (row: AttendanceRow) => void;
  onEdit: (row: AttendanceRow) => void;
}

export const createAttendanceColumns = ({
  onDetail,
  onEdit,
}: Options): Column<AttendanceRow>[] => [
  {
    ...SORT.employee,
    header: "Nhân viên",
    sortable: true,
    render: ({ employee }) => (
      <div className="d-flex align-items-center gap-2">
        <Avatar name={employee.name} imageUrl={employee.avatarUrl} size={34} />
        <span className="fw-semibold">{employee.name}</span>
      </div>
    ),
  },
  {
    id: "code",
    header: "Mã nhân viên",
    render: ({ employee }) => employee.id,
  },
  {
    id: "department",
    header: "Phòng ban",
    render: ({ employee }) => DEPARTMENTS[employee.department],
  },
  {
    id: "shift",
    header: "Ca làm",
    render: ({ employee }) => {
      const shift = SHIFTS[employee.shift];

      return (
        <span
          className="shift-pill"
          style={{ "--shift-color": shift.color } as React.CSSProperties}
        >
          {shift.icon}
          {shift.label}
        </span>
      );
    },
  },
  {
    id: "checkIn",
    header: "Giờ vào",
    render: (row) => time(row.checkIn),
  },
  {
    id: "checkOut",
    header: "Giờ ra",
    render: (row) => time(row.checkOut),
  },
  {
    id: "worked",
    header: "Tổng giờ",
    render: (row) => formatDuration(row.workedMinutes),
  },
  {
    id: "status",
    header: "Trạng thái",
    render: (row) => (
      <Badge variant={row.present ? "success" : "danger"} size="sm">
        <span className="d-inline-flex align-items-center gap-1">
          {row.present ? (
            <Icon name="check-circle" size={14} />
          ) : (
            <Icon name="x-circle" size={14} />
          )}
          {row.present ? "Đã chấm công" : "Chưa chấm công"}
        </span>
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Thao tác",
    align: "center",
    width: "90px",
    render: (row) => (
      <RowActions
        actions={[
          {
            label: "Xem chi tiết",
            icon: "eye",
            onClick: () => onDetail(row),
          },
          {
            label: "Sửa giờ chấm công",
            icon: "pencil",
            onClick: () => onEdit(row),
          },
        ]}
      />
    ),
  },
];
