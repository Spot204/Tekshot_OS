import Icon from "../../components/ui/Icon";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import ComboBox from "../../components/ui/ComboBox";
import Button from "../../components/ui/Button";
import { DEPARTMENT_OPTIONS, SHIFT_OPTIONS } from "../../constants/employee";

const STATUS_OPTIONS = [
  { value: "", label: "Tất cả trạng thái" },
  { value: "present", label: "Đã chấm công" },
  { value: "absent", label: "Chưa chấm công" },
];

export interface AttendanceFilterState {
  keyword: string;
  department: string;
  shift: string;
  status: string;
}

interface AttendanceFiltersProps {
  value: AttendanceFilterState;
  onChange: (patch: Partial<AttendanceFilterState>) => void;
  onReset: () => void;
}

/** Lọc chạy ngay khi gõ; nút "Tìm kiếm" giữ lại cho khớp mockup */
export default function AttendanceFilters({
  value,
  onChange,
  onReset,
}: AttendanceFiltersProps) {
  return (
    <Card shadow bordered={false} padding="p-4" className="mb-2">
      <div className="row g-3">
        <div className="col-lg-3 col-md-6">
          <label htmlFor="attendance-search" className="form-label fw-semibold">
            Tìm kiếm
          </label>
          <Input
            id="attendance-search"
            placeholder="Tìm theo tên, mã nhân viên..."
            value={value.keyword}
            onChange={(event) => onChange({ keyword: event.target.value })}
            leftIcon={<Icon name="search" size={18} />}
          />
        </div>

        <div className="col-lg-3 col-md-6">
          <label htmlFor="attendance-dept" className="form-label fw-semibold">
            Phòng ban
          </label>
          <ComboBox
            id="attendance-dept"
            options={DEPARTMENT_OPTIONS}
            value={value.department}
            onChange={(event) => onChange({ department: event.target.value })}
          />
        </div>

        <div className="col-lg-3 col-md-6">
          <label htmlFor="attendance-shift" className="form-label fw-semibold">
            Ca làm
          </label>
          <ComboBox
            id="attendance-shift"
            options={SHIFT_OPTIONS}
            value={value.shift}
            onChange={(event) => onChange({ shift: event.target.value })}
          />
        </div>

        <div className="col-lg-3 col-md-6">
          <label htmlFor="attendance-status" className="form-label fw-semibold">
            Trạng thái
          </label>
          <ComboBox
            id="attendance-status"
            options={STATUS_OPTIONS}
            value={value.status}
            onChange={(event) => onChange({ status: event.target.value })}
          />
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <Button
          customVariant="secondary"
          className="d-inline-flex align-items-center gap-2"
          onClick={onReset}
        >
          <Icon name="arrow-counterclockwise" size={16} />
          Đặt lại
        </Button>

        <Button className="d-inline-flex align-items-center gap-2">
          <Icon name="search" size={16} />
          Tìm kiếm
        </Button>
      </div>
    </Card>
  );
}
