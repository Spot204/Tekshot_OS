import React from "react";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;

  /** true = nền mặt phẳng nổi theo theme, false = trong suốt */
  background?: boolean;

  bordered?: boolean;

  shadow?: boolean;

  rounded?: boolean;

  /** Class padding Bootstrap. Là prop để thay thế, không chồng lên default. */
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
        background ? "app-surface" : "bg-transparent",
        bordered && "border",
        rounded && "rounded-4",
        shadow && "app-shadow",
        padding,
        className,
      )}
    >
      {children}
    </div>
  );
}
