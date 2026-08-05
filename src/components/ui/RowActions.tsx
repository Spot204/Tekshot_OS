import { Dropdown } from "react-bootstrap";
import Icon from "./Icon";

export interface RowAction {
  label: string;
  onClick: () => void;
  /** Tên Bootstrap Icons, không kèm tiền tố "bi-". Vd "pencil" */
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

/** Menu hành động cuối dòng bảng. Không dùng data-bs-toggle: app không có JS Bootstrap. */
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
        <Icon name="three-dots-vertical" size={16} className="text-secondary" />
      </Dropdown.Toggle>

      <Dropdown.Menu className="shadow-sm border-0">
        {actions.map((action) => (
          <div key={action.label}>
            {action.dividerBefore && <Dropdown.Divider />}
            <Dropdown.Item
              onClick={action.onClick}
              className={action.danger ? "text-danger" : undefined}
            >
              {action.icon && <Icon name={action.icon} className="me-2" />}
              {action.label}
            </Dropdown.Item>
          </div>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
