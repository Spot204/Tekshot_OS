import type { ReactNode } from "react";
import Card from "../../ui/Card";

export interface StatCardProps {
    icon: ReactNode;
    iconBgClassName?: string;
    iconStyle?: React.CSSProperties;
    label: string;
    value: string;
    change?: {
        value: string; // vd "12.6%"
        direction: "up" | "down";
        /** Chữ theo sau %, mặc định "so với kỳ trước" */
        suffix?: string;
    };
}

export default function StatCard({
    icon,
    iconBgClassName = "bg-primary-subtle text-primary",
    iconStyle,
    label,
    value,
    change,
}: StatCardProps) {
    return (
        <Card className="h-100">
            <div
                className={`d-inline-flex align-items-center justify-content-center rounded-4 ${iconBgClassName}`}
                style={{ width: 40, height: 40, ...iconStyle }}
            >
                {icon}
            </div>

            <div className="text-muted small mt-2 fw-semibold">{label}</div>
            <div className="fs-4 fw-bold text-dark">{value}</div>

            {change && (
                <div className="small text-muted">
                    <span className={change.direction === "up" ? "text-success" : "text-danger"}>
                        <i className={`bi ${change.direction === "up" ? "bi-arrow-up" : "bi-arrow-down"}`} />{" "}
                        <span className="fw-bold">{change.value}</span>
                    </span>{" "}
                    {change.suffix ?? "so với kỳ trước"}
                </div>
            )}
        </Card>
    );
}