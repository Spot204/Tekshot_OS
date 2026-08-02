import type { ReactNode } from "react";
import clsx from "clsx";
import Icon from "./Icon";
import Input from "./Input";

export interface Column<T> {
  /** React key, bắt buộc và duy nhất. Tách khỏi `accessor` vì cột chỉ-render
   *  (vd "Thao tác") không ứng với field nào của T. */
  id: string;

  /** ReactNode để cột chọn dòng đặt được checkbox "chọn tất cả" vào tiêu đề */
  header: ReactNode;

  /** Field lấy giá trị mặc định. Bỏ trống nếu đã có `render`. */
  accessor?: keyof T;

  align?: "start" | "center" | "end";

  /** Tự dựng nội dung ô, ưu tiên hơn `accessor` */
  render?: (row: T) => ReactNode;

  width?: string;

  /** Bấm tiêu đề để sắp xếp. Cần `accessor` hoặc `sortValue`. */
  sortable?: boolean;

  /** Khoá so sánh riêng — dùng khi giá trị lưu khác giá trị hiển thị
   *  (vd role "staff" hiện là "Nhân viên") */
  sortValue?: (row: T) => string | number;
}

export interface TableSort {
  columnId: string;
  direction: "asc" | "desc";
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  /** Field làm React key cho từng dòng */
  rowKey: keyof T;
  title?: string;
  /** Nút/điều khiển thêm ở hàng tiêu đề, đứng cạnh ô tìm kiếm */
  actions?: ReactNode;
  searchValue?: string;
  /** Truyền vào thì Table tự hiện ô tìm kiếm ở hàng tiêu đề */
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  showIndex?: boolean;
  /** Dùng để tính số thứ tự khi đang phân trang */
  currentPage?: number;
  pageSize?: number;
  emptyMessage?: string;
  /** Bấm vào dòng — dùng cho bảng có panel chi tiết bên cạnh */
  onRowClick?: (row: T) => void;
  /** Giá trị rowKey của dòng đang được chọn, để tô sáng */
  activeRowKey?: string;

  sort?: TableSort | null;
  /** Thiếu prop này thì cột sortable vẫn render như tiêu đề thường */
  onSortChange?: (columnId: string) => void;
}

const alignClass = (align?: "start" | "center" | "end") =>
  align === "center"
    ? "text-center"
    : align === "end"
      ? "text-end"
      : "text-start";

const ariaSort = (sort: TableSort | null | undefined, columnId: string) => {
  if (sort?.columnId !== columnId) return undefined;
  return sort.direction === "asc" ? "ascending" : "descending";
};

function SortIcon({
  sort,
  columnId,
}: {
  sort: TableSort | null | undefined;
  columnId: string;
}) {
  if (sort?.columnId !== columnId) {
    return <Icon name="chevron-expand" size={14} className="opacity-50" />;
  }

  return (
    <Icon
      name={sort.direction === "asc" ? "chevron-up" : "chevron-down"}
      size={14}
    />
  );
}

function Table<T>({
  columns,
  data,
  rowKey,
  title,
  actions,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Tìm kiếm...",
  showIndex = false,
  currentPage = 1,
  pageSize,
  emptyMessage = "Không có dữ liệu",
  onRowClick,
  activeRowKey,
  sort,
  onSortChange,
}: TableProps<T>) {
  const effectivePageSize = pageSize ?? data.length;
  const totalColumnCount = columns.length + (showIndex ? 1 : 0);
  const hasTitleRow = Boolean(title || onSearchChange || actions);

  const cellContent = (column: Column<T>, row: T): ReactNode => {
    if (column.render) return column.render(row);
    if (column.accessor) return String(row[column.accessor] ?? "");
    return null;
  };

  return (
    <div className="border rounded-4 app-table-wrap">
      <table className="table table-hover align-middle mb-0">
        <thead className="app-table-head">
          {hasTitleRow && (
            <tr>
              <th colSpan={totalColumnCount} className="border-bottom-0">
                {/* Hàng công cụ, không phải tiêu đề cột — cần tên cho screen reader */}
                <span className="visually-hidden">Công cụ bảng</span>
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 px-3">
                  <div>
                    {title && (
                      <div className="fw-semibold text-body-emphasis">
                        {title}
                      </div>
                    )}
                  </div>

                  <div className="d-flex align-items-center flex-wrap gap-2">
                    {onSearchChange && (
                      <div style={{ width: "260px" }}>
                        <Input
                          size="sm"
                          placeholder={searchPlaceholder}
                          value={searchValue}
                          onChange={(e) => onSearchChange(e.target.value)}
                          leftIcon={<Icon name="search" />}
                        />
                      </div>
                    )}

                    {actions}
                  </div>
                </div>
              </th>
            </tr>
          )}

          <tr>
            {showIndex && (
              <th
                className={`${alignClass("center")} text-primary`}
                style={{ width: "70px" }}
              >
                STT
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.id}
                className={`${alignClass(column.align)} text-primary`}
                style={column.width ? { width: column.width } : undefined}
                aria-sort={ariaSort(sort, column.id)}
              >
                {column.sortable && onSortChange ? (
                  <button
                    type="button"
                    className="app-sort-btn"
                    onClick={() => onSortChange(column.id)}
                  >
                    {column.header}
                    <SortIcon sort={sort} columnId={column.id} />
                  </button>
                ) : (
                  column.header
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 && (
            <tr>
              <td
                colSpan={totalColumnCount}
                className="text-center text-secondary py-4"
              >
                {emptyMessage}
              </td>
            </tr>
          )}

          {data.map((row, index) => {
            const key = String(row[rowKey]);

            return (
              <tr
                key={key}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={clsx(
                  onRowClick && "cursor-pointer",
                  activeRowKey === key && "app-row-active",
                )}
              >
                {showIndex && (
                  <td className={alignClass("center")}>
                    {(currentPage - 1) * effectivePageSize + index + 1}
                  </td>
                )}
                {columns.map((column) => (
                  <td key={column.id} className={alignClass(column.align)}>
                    {cellContent(column, row)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
