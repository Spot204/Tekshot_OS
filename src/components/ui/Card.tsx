import React from "react";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;

  /** true = bg-white, false = trong suốt */
  background?: boolean;

  bordered?: boolean;

  shadow?: boolean;

  rounded?: boolean;

  /**
   * Class padding của Bootstrap. Tách thành prop riêng vì nếu hardcode "p-3"
   * rồi truyền thêm "p-4" qua className thì hai class cùng tồn tại và thứ tự
   * trong file CSS quyết định class nào thắng — không phải ý người gọi.
   */
  padding?: string;
}

export default function Card({
  children,
  background = true,
  bordered = true,
  shadow = false,
  rounded = true,
  padding = "p-3",
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
        padding,
        className,
      )}
    >
      {children}
    </div>
  );
}
