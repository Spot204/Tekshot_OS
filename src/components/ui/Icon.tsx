import clsx from "clsx";
import type { MouseEventHandler } from "react";

export interface IconProps {
  name: string;
  size?: number;
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
}

export default function Icon({ name, size, className, onClick }: IconProps) {
  return (
    <i
      className={clsx(`bi bi-${name}`, className)}
      style={size ? { fontSize: size } : undefined}
      aria-hidden="true"
      onClick={onClick}
    />
  );
}
