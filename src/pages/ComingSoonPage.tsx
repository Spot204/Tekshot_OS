import { useLocation } from "react-router-dom";
import { menuItems } from "../components/layout/menuItems";

/** Tên hiển thị của menu ứng với path, để biết đang mở mục nào */
const findMenuLabel = (pathname: string): string | null => {
  const id = pathname.replace(/^\//, "");

  for (const item of menuItems) {
    if (item.id === id) return item.label;
    const child = item.children?.find((sub) => sub.id === id);
    if (child) return child.label;
  }

  return null;
};

export default function ComingSoonPage() {
  const { pathname } = useLocation();
  const label = findMenuLabel(pathname);

  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <div className="text-center">
        <i
          className="bi bi-cone-striped text-secondary"
          style={{ fontSize: "3rem" }}
          aria-hidden="true"
        />
        <h3 className="text-secondary mt-3">
          {label ? `${label} đang phát triển` : "Tính năng đang phát triển"}
        </h3>
        <p className="text-secondary mb-0">Vui lòng quay lại sau!</p>
      </div>
    </div>
  );
}
