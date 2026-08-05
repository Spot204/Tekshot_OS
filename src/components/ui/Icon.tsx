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
<<<<<<< HEAD
      style={size ? { fontSize: size } : undefined }
      aria-hidden="true" 
      
=======
      style={size ? { fontSize: size } : undefined}
      aria-hidden="true"
      onClick={onClick}
>>>>>>> 28d311b4d3648ec4ac1e7f7afb450a7f3a5cd754
    />
  );
}
