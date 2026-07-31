import type { ReactNode } from "react";
import Card from "../../components/ui/Card";

interface SectionCardProps {
  title: string;
  /** Link "Xem tất cả" bên phải tiêu đề */
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Khung card có hàng tiêu đề — dùng cho mọi khối của trang báo cáo */
export default function SectionCard({
  title,
  action,
  children,
  className,
}: SectionCardProps) {
  return (
    <Card shadow bordered={false} padding="p-4" className={className}>
      <div className="d-flex align-items-center justify-content-between gap-2 mb-3">
        <h2 className="h6 fw-semibold mb-0">{title}</h2>
        {action}
      </div>

      {children}
    </Card>
  );
}
