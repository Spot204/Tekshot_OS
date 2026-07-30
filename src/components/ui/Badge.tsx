import React from "react";
import clsx from "clsx";

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "dark";

export type BadgeSize = "sm" | "md";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  rounded?: boolean;
  /** false = chỉ tô màu chữ, không có nền */
  background?: boolean;
}

const backgroundClass: Record<BadgeVariant, string> = {
  primary: "bg-primary-subtle text-primary",
  secondary: "bg-secondary-subtle text-secondary",
  success: "bg-success-subtle text-success",
  danger: "bg-danger-subtle text-danger",
  warning: "bg-warning-subtle text-warning",
  info: "bg-info-subtle text-info",
  dark: "bg-dark-subtle text-dark"
};

const textClass: Record<BadgeVariant, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  success: "text-success",
  danger: "text-danger",
  warning: "text-warning",
  info: "text-info",
  dark:"text-dark"
};

/**
 * Nhãn trạng thái dạng pill. Trước đây tên là `Label` nên hay bị dùng nhầm
 * làm nhãn form / caption — đổi tên cho khớp việc nó thực sự làm.
 */
export default function Badge({
  children,
  variant = "primary",
  size = "md",
  rounded = true,
  background = true,
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={clsx(
        "badge fw-semibold",
        rounded && "rounded-pill",
        size === "sm" ? "px-2 py-1" : "px-3 py-2",
        background ? backgroundClass[variant] : textClass[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
