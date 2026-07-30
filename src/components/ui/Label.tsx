import React from "react";
import clsx from "clsx";

export type LabelVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "dark";

export type LabelSize = "sm" | "md";

interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;

  variant?: LabelVariant;

  size?: LabelSize;

  rounded?: boolean;

  background?: boolean;
}

const backgroundClass: Record<LabelVariant, string> = {
  primary: "bg-primary-subtle text-primary",
  secondary: "bg-secondary-subtle text-secondary",
  success: "bg-success-subtle text-success",
  danger: "bg-danger-subtle text-danger",
  warning: "bg-warning-subtle text-warning",
  info: "bg-info-subtle text-info",
  dark: "bg-dark-subtle text-dark"
};

const textClass: Record<LabelVariant, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  success: "text-success",
  danger: "text-danger",
  warning: "text-warning",
  info: "text-info",
  dark:"text-dark"
};

export default function Label({
  children,
  variant = "primary",
  size = "md",
  rounded = true,
  background = true,
  className,
  ...props
}: LabelProps) {
  return (
    <span
      {...props}
      className={clsx(
        "badge fw-semibold",

        rounded && "rounded-pill",

        size === "sm" ? "px-2 py-1" : "px-3 py-2",

        background
          ? backgroundClass[variant]
          : textClass[variant],

        className
      )}
    >
      {children}
    </span>
  );
}