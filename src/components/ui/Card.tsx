import React from "react";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;

  /**
   * Hiển thị nền trắng
   * true = bg-white
   * false = trong suốt
   */
  background?: boolean;

  /**
   * Hiển thị viền
   */
  bordered?: boolean;

  /**
   * Hiển thị shadow
   */
  shadow?: boolean;

  /**
   * Bo góc
   */
  rounded?: boolean;
}

export default function Card({
  children,
  background = true,
  bordered = true,
  shadow = false,
  rounded = true,
  className,
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      className={clsx(
        background ? "bg-white" : "bg-transparent",
        bordered && "border",
        rounded && "rounded-4",
        shadow && "shadow-sm",
        "p-3",
        className
      )}
    >
      {children}
    </div>
  );
}