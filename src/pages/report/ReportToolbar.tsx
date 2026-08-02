import Icon from "../../components/ui/Icon";
import DateRangeInput from "../../components/ui/DateRangeInput";
import Button from "../../components/ui/Button";

interface ReportToolbarProps {
  range: [Date | null, Date | null];
  onRangeChange: (range: [Date | null, Date | null]) => void;
}

/** Tiêu đề trang + chọn kỳ + xuất báo cáo */
export default function ReportToolbar({
  range,
  onRangeChange,
}: ReportToolbarProps) {
  const [from, to] = range;

  return (
    <div className="d-flex flex-wrap align-items-start justify-content-between gap-3 mb-2">
      <div>
        <h1 className="h3 fw-bold">Báo cáo</h1>
        <p className="text-secondary mb-0">
          Phân tích hiệu suất kinh doanh, theo dõi xu hướng và đưa ra quyết định
          chính xác hơn.
        </p>
      </div>

      <div className="d-flex flex-wrap align-items-center gap-2">
        <div style={{ width: 260 }}>
          <DateRangeInput
            startDate={from}
            endDate={to}
            onChange={onRangeChange}
          />
        </div>

        <Button className="d-inline-flex align-items-center gap-2">
          <Icon name="download" size={16} />
          Xuất báo cáo
          <Icon name="chevron-down" size={16} />
        </Button>
      </div>
    </div>
  );
}
