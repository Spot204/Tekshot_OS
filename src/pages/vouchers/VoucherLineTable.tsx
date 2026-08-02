import { GripVertical, Plus, Trash2 } from "lucide-react";
import type { VoucherLine } from "../../types/cashbook";
import Input from "../../components/ui/Input";
import { emptyLine, toNumber } from "./voucherLine";

interface VoucherLineTableProps {
  lines: VoucherLine[];
  onChange: (lines: VoucherLine[]) => void;
}

export default function VoucherLineTable({
  lines,
  onChange,
}: VoucherLineTableProps) {
  const patch = (id: string, value: Partial<VoucherLine>) =>
    onChange(
      lines.map((line) => (line.id === id ? { ...line, ...value } : line)),
    );

  const remove = (id: string) =>
    onChange(lines.filter((line) => line.id !== id));

  const add = () => onChange([...lines, emptyLine(`line-${Date.now()}`)]);

  return (
    <div>
      <h4 className="h6 fw-semibold mb-3">Nội dung thu chi</h4>

      {/* minWidth để table-responsive cuộn ngang, không bóp ô nhập còn 68px */}
      <div className="table-responsive">
        <table className="table align-middle mb-2" style={{ minWidth: 720 }}>
          <thead className="app-table-head">
            <tr>
              <th style={{ width: 32 }}>
                <span className="visually-hidden">Kéo để sắp xếp</span>
              </th>
              <th>Nội dung</th>
              <th style={{ width: 140 }}>Đơn vị</th>
              <th style={{ width: 110 }}>Số lượng</th>
              <th style={{ width: 140 }}>Thành tiền</th>
              <th>Diễn giải</th>
              <th style={{ width: 48 }}>
                <span className="visually-hidden">Xoá dòng</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {lines.map((line) => (
              <tr key={line.id}>
                <td className="text-secondary">
                  <GripVertical size={16} aria-hidden="true" />
                </td>
                <td>
                  <Input
                    size="sm"
                    placeholder="Nhập nội dung"
                    aria-label="Nội dung"
                    value={line.content}
                    onChange={(e) =>
                      patch(line.id, { content: e.target.value })
                    }
                  />
                </td>
                <td>
                  <Input
                    size="sm"
                    placeholder="Nhập đơn vị"
                    aria-label="Đơn vị"
                    value={line.unit}
                    onChange={(e) => patch(line.id, { unit: e.target.value })}
                  />
                </td>
                <td>
                  <Input
                    size="sm"
                    inputMode="numeric"
                    aria-label="Số lượng"
                    value={String(line.quantity)}
                    onChange={(e) =>
                      patch(line.id, { quantity: toNumber(e.target.value) })
                    }
                  />
                </td>
                <td>
                  <Input
                    size="sm"
                    inputMode="numeric"
                    aria-label="Thành tiền"
                    value={String(line.amount)}
                    onChange={(e) =>
                      patch(line.id, { amount: toNumber(e.target.value) })
                    }
                  />
                </td>
                <td>
                  <Input
                    size="sm"
                    placeholder="Nhập diễn giải"
                    aria-label="Diễn giải"
                    value={line.note}
                    onChange={(e) => patch(line.id, { note: e.target.value })}
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="app-icon-toggle text-danger"
                    aria-label="Xóa dòng"
                    disabled={lines.length === 1}
                    onClick={() => remove(line.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        className="btn btn-link p-0 text-decoration-none fw-semibold d-inline-flex align-items-center gap-1"
        onClick={add}
      >
        <Plus size={16} aria-hidden="true" />
        Thêm nội dung thu chi
      </button>
    </div>
  );
}
