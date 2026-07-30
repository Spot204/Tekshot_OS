import type { ReactNode } from "react";
import clsx from "clsx";
import Input from "./Input";

export interface Column<T> {
  /**
   * Định danh cột — dùng làm React key. Bắt buộc và phải duy nhất.
   *
   * Tách khỏi `accessor` vì cột chỉ-render (vd "Thao tác") không ứng với
   * field nào của T; bản trước dùng chung một prop nên các cột đó phải mượn
   * key của cột khác và sinh ra key trùng.
   */
  id: string;

  header: string;

  /** Field lấy giá trị mặc định. Bỏ trống nếu đã có `render`. */
  accessor?: keyof T;

  align?: "start" | "center" | "end";

  /** Tự dựng nội dung ô, ưu tiên hơn `accessor` */
  render?: (row: T) => ReactNode;

  width?: string;
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
}

const alignClass = (align?: "start" | "center" | "end") =>
  align === "center"
    ? "text-center"
    : align === "end"
      ? "text-end"
      : "text-start";

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
    <div className="border rounded-4 overflow-hidden">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          {hasTitleRow && (
            <tr>
              <th colSpan={totalColumnCount} className="border-bottom-0">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 px-3">
                  <div>
                    {title && (
                      <div className="fw-semibold text-dark">{title}</div>
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
                          leftIcon={<i className="bi bi-search" />}
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
              >
                {column.header}
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
                  activeRowKey === key && "table-primary",
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
