import Icon from "./Icon";

export interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;

  /** Có cho đổi số mục/trang không */
  pageSizeOptions?: number[];
  onPageSizeChange?: (size: number) => void;

  /** Tên mục để hiện "Hiển thị 1-8 trong 246 đơn hàng" */
  itemLabel?: string;
}

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

// Tính dãy số trang kèm dấu "..." - vd [1,2,3,"...",31] hoặc [1,"...",14,15,16,"...",31]
function getPageNumbers(current: number, total: number): (number | "...")[] {
  const siblingCount = 1;
  const totalPageNumbers = siblingCount * 2 + 5;

  if (total <= totalPageNumbers) {
    return range(1, total);
  }

  const leftSibling = Math.max(current - siblingCount, 1);
  const rightSibling = Math.min(current + siblingCount, total);

  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < total - 1;

  if (!showLeftDots && showRightDots) {
    return [...range(1, 3), "...", total];
  }

  if (showLeftDots && !showRightDots) {
    return [1, "...", ...range(total - 2, total)];
  }

  if (showLeftDots && showRightDots) {
    return [1, "...", current - 1, current, current + 1, "...", total];
  }

  return range(1, total);
}

export default function Pagination({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  pageSizeOptions = [8, 10, 20, 50],
  onPageSizeChange,
  itemLabel = "mục",
}: PaginationProps) {
  const totalPages = Math.max(Math.ceil(totalItems / pageSize), 1);
  const start = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);
  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mt-3">
      <div className="text-muted small">
        Hiển thị {start}-{end} trong {totalItems.toLocaleString("vi-VN")}{" "}
        {itemLabel}
      </div>

      <div className="d-flex align-items-center gap-1">
        <button
          type="button"
          className="btn btn-sm btn-light border px-2"
          aria-label="Về trang đầu"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(1)}
        >
          <Icon name="chevron-double-left" />
        </button>

        <button
          type="button"
          className="btn btn-sm btn-light border px-2"
          aria-label="Trang trước"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <Icon name="chevron-left" />
        </button>

        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`dots-${i}`} className="px-2 text-muted">
              ...
            </span>
          ) : (
            <button
              key={p}
              className={`btn btn-sm px-2 ${p === currentPage ? "btn-primary" : "btn-light border"}`}
              onClick={() => onPageChange(p)}
            >
              {p}
            </button>
          ),
        )}

        <button
          type="button"
          className="btn btn-sm btn-light border px-2"
          aria-label="Trang sau"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <Icon name="chevron-right" />
        </button>

        <button
          type="button"
          className="btn btn-sm btn-light border px-2"
          aria-label="Về trang cuối"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          <Icon name="chevron-double-right" />
        </button>
      </div>

      {onPageSizeChange && (
        // Tạm dùng select gốc, thay bằng component Select khi có
        <select
          className="form-select form-select-sm rounded-4"
          style={{ width: "110px" }}
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size} / trang
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
