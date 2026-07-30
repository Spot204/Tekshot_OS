import { Dropdown } from "react-bootstrap";
import { MoreVertical } from "lucide-react";

export interface RowAction {
  label: string;
  onClick: () => void;
  /** Class icon Bootstrap Icons, vd "bi-pencil" */
  icon?: string;
  /** Tô đỏ cho hành động phá hủy */
  danger?: boolean;
  /** Kẻ vạch phía trên item này */
  dividerBefore?: boolean;
}

interface RowActionsProps {
  actions: RowAction[];
  label?: string;
}

/**
 * Menu hành động ở cuối mỗi dòng bảng.
 *
 * Dùng Dropdown của react-bootstrap thay vì `data-bs-toggle="dropdown"`:
 * app chỉ import CSS của Bootstrap chứ không import bundle JS, nên các
 * data-attribute của Bootstrap không có gì xử lý và menu sẽ không mở.
 */
export default function RowActions({
  actions,
  label = "Hành động",
}: RowActionsProps) {
  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        as="button"
        type="button"
        aria-label={label}
        className="btn btn-light btn-sm border rounded-3 no-caret d-inline-flex align-items-center"
      >
        <MoreVertical size={16} className="text-secondary" />
      </Dropdown.Toggle>

      <Dropdown.Menu className="shadow-sm border-0">
        {actions.map((action) => (
          <div key={action.label}>
            {action.dividerBefore && <Dropdown.Divider />}
            <Dropdown.Item
              onClick={action.onClick}
              className={action.danger ? "text-danger" : undefined}
            >
              {action.icon && (
                <i
                  className={`bi ${action.icon} me-2`}
                  aria-hidden="true"
                />
              )}
              {action.label}
            </Dropdown.Item>
          </div>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
