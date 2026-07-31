import { Download, Filter, Search } from "lucide-react";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import ComboBox from "../../components/ui/ComboBox";
import Button from "../../components/ui/Button";
import DateRangeInput from "../../components/ui/DateRangeInput";
import { FLOW_OPTIONS, METHOD_OPTIONS } from "../../constants/cashbook";

export interface CashBookFilterState {
  range: [Date | null, Date | null];
  flow: string;
  method: string;
  keyword: string;
}

interface CashBookFiltersProps {
  value: CashBookFilterState;
  onChange: (patch: Partial<CashBookFilterState>) => void;
}

/** Lọc chạy ngay khi đổi; nút "Lọc" giữ lại cho khớp mockup */
export default function CashBookFilters({
  value,
  onChange,
}: CashBookFiltersProps) {
  return (
    <Card shadow bordered={false} padding="p-4" className="mb-2">
      <div className="row g-3 align-items-end">
        <div className="col-xl-3 col-md-6">
          <label className="form-label fw-semibold">Khoảng thời gian</label>
          <DateRangeInput
            startDate={value.range[0]}
            endDate={value.range[1]}
            onChange={(range) => onChange({ range })}
          />
        </div>

        <div className="col-xl-2 col-md-6">
          <label htmlFor="cash-flow" className="form-label fw-semibold">
            Loại giao dịch
          </label>
          <ComboBox
            id="cash-flow"
            options={FLOW_OPTIONS}
            value={value.flow}
            onChange={(event) => onChange({ flow: event.target.value })}
          />
        </div>

        <div className="col-xl-2 col-md-6">
          <label htmlFor="cash-method" className="form-label fw-semibold">
            Phương thức
          </label>
          <ComboBox
            id="cash-method"
            options={METHOD_OPTIONS}
            value={value.method}
            onChange={(event) => onChange({ method: event.target.value })}
          />
        </div>

        <div className="col-xl-2 col-md-6">
          <Input
            placeholder="Tìm kiếm mô tả, mã phiếu..."
            aria-label="Tìm kiếm mô tả, mã phiếu"
            value={value.keyword}
            onChange={(event) => onChange({ keyword: event.target.value })}
            rightIcon={<Search size={16} />}
          />
        </div>

        <div className="col-xl-3 d-flex gap-2">
          <Button className="d-inline-flex align-items-center gap-2 text-nowrap">
            <Filter size={16} aria-hidden="true" />
            Lọc
          </Button>

          <Button
            customVariant="secondary"
            className="d-inline-flex align-items-center gap-2 text-nowrap"
          >
            <Download size={16} aria-hidden="true" />
            Xuất Excel
          </Button>
        </div>
      </div>
    </Card>
  );
}
