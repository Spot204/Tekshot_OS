import { Plus, Search, SlidersHorizontal } from "lucide-react";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import ComboBox from "../../components/ui/ComboBox";
import Button from "../../components/ui/Button";
import DateRangeInput from "../../components/ui/DateRangeInput";
import { FLOW_OPTIONS, STATUS_OPTIONS } from "../../constants/cashbook";

export interface VoucherFilterState {
  range: [Date | null, Date | null];
  flow: string;
  status: string;
  keyword: string;
}

interface VoucherFiltersProps {
  value: VoucherFilterState;
  onChange: (patch: Partial<VoucherFilterState>) => void;
  onCreate: () => void;
}

export default function VoucherFilters({
  value,
  onChange,
  onCreate,
}: VoucherFiltersProps) {
  return (
    <Card shadow bordered={false} padding="p-4" className="mb-4">
      <div className="row g-3 align-items-end">
        <div className="col-xl-3 col-md-6">
          <label className="form-label fw-semibold">Ngày tạo</label>
          <DateRangeInput
            startDate={value.range[0]}
            endDate={value.range[1]}
            onChange={(range) => onChange({ range })}
          />
        </div>

        <div className="col-xl-2 col-md-6">
          <label htmlFor="voucher-flow" className="form-label fw-semibold">
            Loại phiếu
          </label>
          <ComboBox
            id="voucher-flow"
            options={FLOW_OPTIONS}
            value={value.flow}
            onChange={(event) => onChange({ flow: event.target.value })}
          />
        </div>

        <div className="col-xl-2 col-md-6">
          <label htmlFor="voucher-status" className="form-label fw-semibold">
            Trạng thái
          </label>
          <ComboBox
            id="voucher-status"
            options={STATUS_OPTIONS}
            value={value.status}
            onChange={(event) => onChange({ status: event.target.value })}
          />
        </div>

        <div className="col-xl-2 col-md-6">
          <label htmlFor="voucher-keyword" className="form-label fw-semibold">
            Từ khóa
          </label>
          <Input
            id="voucher-keyword"
            placeholder="Tìm theo mã phiếu, nội dung..."
            value={value.keyword}
            onChange={(event) => onChange({ keyword: event.target.value })}
            rightIcon={<Search size={16} />}
          />
        </div>

        <div className="col-xl-3 d-flex gap-2">
          <Button
            customVariant="secondary"
            className="d-inline-flex align-items-center gap-2 text-nowrap"
          >
            <SlidersHorizontal size={16} aria-hidden="true" />
            Bộ lọc
          </Button>

          <Button
            className="d-inline-flex align-items-center gap-2 text-nowrap"
            onClick={onCreate}
          >
            <Plus size={16} aria-hidden="true" />
            Tạo phiếu
          </Button>
        </div>
      </div>
    </Card>
  );
}
