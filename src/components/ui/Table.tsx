import type { ReactNode } from 'react';

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
}

function Table<T>({ columns, data, rowKey }: TableProps<T>) {
    const alignClass = (align?: "start" | "center" | "end") =>
        align === "center" ? "text-center" : align === "end" ? "text-end" : "text-start";

    return (
        <div className="border rounded-4 overflow-hidden">
            <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                    <tr>
                        {columns.map((col) => (
                            <th key={String(col.key)} className={`${alignClass(col.align)} text-primary `}>
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.map((row) => (
                        <tr key={String(row[rowKey])}>
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