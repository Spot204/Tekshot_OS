import clsx from "clsx";
import Icon from "../../components/ui/Icon";
import { formatPercent } from "../../utils/format";

interface ChangeBadgeProps {
  percent: number;
  note?: string;
  /** true = viền nền mờ, dùng trên card hero nền xanh */
  onHero?: boolean;
}

/** Mũi tên + phần trăm thay đổi, dùng lại ở nhiều khối của báo cáo */
export default function ChangeBadge({
  percent,
  note,
  onHero = false,
}: ChangeBadgeProps) {
  const isUp = percent >= 0;
  const iconName = isUp ? "arrow-up" : "arrow-down";

  return (
    <span
      className={clsx(
        "d-inline-flex align-items-center gap-1 small fw-semibold",
        !onHero && (isUp ? "text-success" : "text-danger"),
      )}
    >
      <Icon name={iconName} size={14} />
      {formatPercent(percent)}
      {note && <span className="fw-normal opacity-75 ms-1">{note}</span>}
    </span>
  );
}
