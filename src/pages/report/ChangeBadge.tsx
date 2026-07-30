import { ArrowDown, ArrowUp } from "lucide-react";
import clsx from "clsx";
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
  const Icon = isUp ? ArrowUp : ArrowDown;

  return (
    <span
      className={clsx(
        "d-inline-flex align-items-center gap-1 small fw-semibold",
        !onHero && (isUp ? "text-success" : "text-danger"),
      )}
    >
      <Icon size={14} aria-hidden="true" />
      {formatPercent(percent)}
      {note && <span className="fw-normal opacity-75 ms-1">{note}</span>}
    </span>
  );
}
