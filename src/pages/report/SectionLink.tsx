import { ArrowRight } from "lucide-react";

interface SectionLinkProps {
  label: string;
  onClick?: () => void;
}

/** Link "Xem tất cả" ở góc phải tiêu đề. Chưa có trang đích nên là button. */
export default function SectionLink({ label, onClick }: SectionLinkProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="btn btn-link p-0 text-decoration-none small fw-semibold d-inline-flex align-items-center gap-1"
    >
      {label}
      <ArrowRight size={14} aria-hidden="true" />
    </button>
  );
}
