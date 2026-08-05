import clsx from "clsx";

const PALETTE = [
  "var(--chart-success)",
  "var(--chart-purple)",
  "var(--chart-brand)",
  "var(--chart-accent)",
];

/** Tổng mã ký tự để cùng một tên luôn ra cùng màu qua các lần render */
const colorOf = (name: string) =>
  PALETTE[
    [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0) %
      PALETTE.length
  ];

export interface AvatarProps {
  name: string;
  /** Không có ảnh thì hiện chữ cái đầu trên nền tô theo tên */
  imageUrl?: string;
  size?: number;
  className?: string;
}

export default function Avatar({
  name,
  imageUrl,
  size = 30,
  className,
}: AvatarProps) {
  const style = {
    width: size,
    height: size,
    "--avatar-color": colorOf(name),
  } as React.CSSProperties;

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt=""
        className={clsx("app-avatar", className)}
        style={style}
      />
    );
  }

  return (
    <span
      className={clsx("app-avatar", className)}
      style={style}
      aria-hidden="true"
    >
      {name.trim().charAt(0).toUpperCase()}
    </span>
  );
}
