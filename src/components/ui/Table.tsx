import type { ReactNode } from 'react';
import Input from "./Input";

export interface Column<T> {
    key: keyof T;
    header: string;
    align?: "start" | "center" | "end";
    render?: (row: T) => ReactNode;
}

export interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    rowKey: keyof T;
    title?: string;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    searchPlaceholder?: string;
    showIndex?: boolean;
    currentPage?: number;
    pageSize?: number;
}

function Table<T>({ columns, data, rowKey, title, searchValue, onSearchChange, searchPlaceholder = "Tìm kiếm...", showIndex = false, currentPage = 1, pageSize }: TableProps<T>) {
    const alignClass = (align?: "start" | "center" | "end") =>
        align === "center" ? "text-center" : align === "end" ? "text-end" : "text-start";

    const effectivePageSize = pageSize ?? data.length;
    const totalColumnCount = columns.length + (showIndex ? 1 : 0);
    const hasTitleRow = Boolean(title || onSearchChange);

    return (
        <div className="border rounded-4 overflow-hidden">
            <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                    {hasTitleRow && (
                        <tr>
                            <th colSpan={totalColumnCount} className="border-bottom-0">
                                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 px-3">
                                    <div>
                                        {title && <div className="fw-semibold text-dark">{title}</div>}
                                    </div>

                                    {onSearchChange && (
                                        <div style={{ maxWidth: "260px", width: "100%" }}>
                                            <Input
                                                size="sm"
                                                placeholder={searchPlaceholder}
                                                value={searchValue}
                                                onChange={(e) => onSearchChange(e.target.value)}
                                                leftIcon={<i className="bi bi-search" />}
                                            />
                                        </div>
                                    )}
                                </div>
                            </th>
                        </tr>
                    )}

                    <tr>
                        {showIndex && (
                            <th className={`${alignClass("center")} text-primary`} style={{ width: "70px" }}>
                                STT
                            </th>
                        )}
                        {columns.map((col) => (
                            <th
                                key={String(col.key)}
                                className={`${alignClass(col.align)} text-primary`}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.map((row, index) => (
                        <tr key={String(row[rowKey])}>
                            {showIndex && (
                                <td className={alignClass("center")}>
                                    {(currentPage - 1) * effectivePageSize + index + 1}
                                </td>
                            )}
                            {columns.map((col) => (
                                <td key={String(col.key)} className={alignClass(col.align)}>
                                    {col.render ? col.render(row) : String(row[col.key] ?? "")}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table;