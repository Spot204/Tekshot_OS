import Icon from "../../components/ui/Icon";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import ComboBox from "../../components/ui/ComboBox";
import { ROLE_OPTIONS, SHIFT_OPTIONS } from "../../constants/employee";

interface EmployeeFiltersProps {
  keyword: string;
  role: string;
  shift: string;
  onKeywordChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onShiftChange: (value: string) => void;
}

export default function EmployeeFilters({
  keyword,
  role,
  shift,
  onKeywordChange,
  onRoleChange,
  onShiftChange,
}: EmployeeFiltersProps) {
  return (
    <Card shadow bordered={false} padding="p-4" className="mb-2">
      <div className="row g-3">
        <div className="col-lg-4">
          <label htmlFor="employee-search" className="form-label fw-semibold">
            Tìm kiếm
          </label>
          <Input
            id="employee-search"
            placeholder="Tìm theo họ tên, email, SĐT..."
            value={keyword}
            onChange={(event) => onKeywordChange(event.target.value)}
            leftIcon={<Icon name="search" size={18} />}
          />
        </div>

        <div className="col-lg-4">
          <label htmlFor="employee-role" className="form-label fw-semibold">
            Vai trò
          </label>
          <ComboBox
            id="employee-role"
            options={ROLE_OPTIONS}
            value={role}
            onChange={(event) => onRoleChange(event.target.value)}
          />
        </div>

        <div className="col-lg-4">
          <label htmlFor="employee-shift" className="form-label fw-semibold">
            Ca làm việc
          </label>
          <ComboBox
            id="employee-shift"
            options={SHIFT_OPTIONS}
            value={shift}
            onChange={(event) => onShiftChange(event.target.value)}
          />
        </div>
      </div>
    </Card>
  );
}
