import clsx from "clsx";

export interface IconProps {
  /** Tên Bootstrap Icons, KHÔNG kèm tiền tố "bi-". Vd "search", "chevron-down" */
  name: string;
  /** Cỡ px; bỏ trống thì icon ăn theo cỡ chữ của phần tử cha */
  size?: number;
  className?: string;
}

/**
 * Icon dùng chung, chạy trên font Bootstrap Icons.
 * Luôn `aria-hidden` — icon ở đây chỉ để trang trí, nút chỉ có icon phải tự
 * đặt `aria-label`.
 */
export default function Icon({ name, size, className }: IconProps) {
  return (
    <i
      className={clsx(`bi bi-${name}`, className)}
      style={size ? { fontSize: size } : undefined }
      aria-hidden="true" 
      
    />
  );
}
