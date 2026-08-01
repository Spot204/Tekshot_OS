import {
  Download,
  List,
  Printer,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import ComboBox from "../../components/ui/ComboBox";
import Button from "../../components/ui/Button";
import DateInput from "../../components/ui/DateInput";
import { employees } from "../../mocks/employees";

const EMPLOYEE_OPTIONS = [
  { value: "", label: "Tất cả" },
  ...employees.map((employee) => ({
    value: employee.id,
    label: employee.name,
  })),
];

export interface ShiftFilterState {
  from: Date | null;
  to: Date | null;
  employeeId: string;
  keyword: string;
}

interface ShiftFiltersProps {
  value: ShiftFilterState;
  onChange: (patch: Partial<ShiftFilterState>) => void;
}

export default function ShiftFilters({ value, onChange }: ShiftFiltersProps) {
  return (
    <Card shadow bordered={false} padding="p-3" className="mb-2">
      <div className="d-flex justify-content-end gap-2 mb-3">
        <button
          type="button"
          className="app-header-icon-btn border"
          aria-label="Chọn cột hiển thị"
        >
          <List size={18} />
        </button>
        <button
          type="button"
          className="app-header-icon-btn border"
          aria-label="In danh sách"
        >
          <Printer size={18} />
        </button>
        <button
          type="button"
          className="app-header-icon-btn border"
          aria-label="Xuất dữ liệu"
        >
          <Download size={18} />
        </button>
      </div>

      <div className="row g-3 align-items-end">
        <div className="col-xl-2 col-md-6">
          <label className="form-label fw-semibold">Từ ngày</label>
          <DateInput
            selected={value.from}
            onChange={(from) => onChange({ from })}
          />
        </div>

        <div className="col-xl-2 col-md-6">
          <label className="form-label fw-semibold">Đến ngày</label>
          <DateInput selected={value.to} onChange={(to) => onChange({ to })} />
        </div>

        <div className="col-xl-3 col-md-6">
          <label htmlFor="shift-employee" className="form-label fw-semibold">
            Nhân viên
          </label>
          <ComboBox
            id="shift-employee"
            options={EMPLOYEE_OPTIONS}
            value={value.employeeId}
            onChange={(event) => onChange({ employeeId: event.target.value })}
          />
        </div>

        <div className="col-xl-3 col-md-6">
          <Input
            placeholder="Tìm theo mã chốt ca, ghi chú..."
            aria-label="Tìm theo mã chốt ca, ghi chú"
            value={value.keyword}
            onChange={(event) => onChange({ keyword: event.target.value })}
            rightIcon={<Search size={16} />}
          />
        </div>

        <div className="col-xl-2">
          <Button
            customVariant="secondary"
            className="d-inline-flex align-items-center gap-2 text-nowrap"
          >
            <SlidersHorizontal size={16} aria-hidden="true" />
            Bộ lọc
          </Button>
        </div>
      </div>
    </Card>
  );
}
