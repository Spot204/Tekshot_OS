import { Pagination } from "react-bootstrap";
import ComboBox from "./ComboBox";

export interface TablePaginationProps {
  /** Trang hiện tại, đánh số từ 1 */
  page: number;
  pageSize: number;
  /** Tổng số dòng (không phải số dòng đang hiển thị) */
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
  /** Danh từ trong dòng "Hiển thị 1-10 trong 246 <đơn hàng>" */
  itemLabel?: string;
}

const PAGE_WINDOW = 2;

/** Danh sách số trang cần hiện, dùng null cho dấu "..." */
const buildPageList = (page: number, pageCount: number): (number | null)[] => {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  const pages = new Set<number>([1, pageCount, page]);
  for (let offset = 1; offset <= PAGE_WINDOW; offset += 1) {
    if (page - offset > 1) pages.add(page - offset);
    if (page + offset < pageCount) pages.add(page + offset);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const withGaps: (number | null)[] = [];

  sorted.forEach((value, index) => {
    if (index > 0 && value - sorted[index - 1] > 1) withGaps.push(null);
    withGaps.push(value);
  });

  return withGaps;
};

/** Chỉ hiển thị — trang hiện tại do page giữ */
export default function TablePagination({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50],
  itemLabel = "dòng",
}: TablePaginationProps) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
      <small className="text-secondary">
        Hiển thị {from}-{to} trong {total} {itemLabel}
      </small>

      <div className="d-flex align-items-center gap-3">
        <Pagination className="mb-0 pagination-sm shadow-none">
          <Pagination.Prev
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          />

          {buildPageList(page, pageCount).map((value, index) =>
            value === null ? (
              <Pagination.Ellipsis key={`gap-${index}`} disabled />
            ) : (
              <Pagination.Item
                key={value}
                active={value === page}
                onClick={() => onPageChange(value)}
              >
                {value}
              </Pagination.Item>
            ),
          )}

          <Pagination.Next
            disabled={page >= pageCount}
            onClick={() => onPageChange(page + 1)}
          />
        </Pagination>

        {onPageSizeChange && (
          <ComboBox
            size="sm"
            style={{ width: "120px" }}
            value={String(pageSize)}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            options={pageSizeOptions.map((option) => ({
              value: String(option),
              label: `${option} / trang`,
            }))}
          />
        )}
      </div>
    </div>
  );
}
