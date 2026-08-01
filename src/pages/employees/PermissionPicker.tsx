import clsx from "clsx";
import type { PermissionId } from "../../types/employee";
import { PERMISSIONS } from "../../constants/employee";

interface PermissionPickerProps {
  value: PermissionId[];
  onChange: (value: PermissionId[]) => void;
  error?: string;
}

/** Lưới thẻ chọn quyền, bấm cả thẻ chứ không riêng ô tích */
export default function PermissionPicker({
  value,
  onChange,
  error,
}: PermissionPickerProps) {
  const toggle = (id: PermissionId) =>
    onChange(
      value.includes(id) ? value.filter((item) => item !== id) : [...value, id],
    );

  return (
    <fieldset className="permission-box">
      <legend className="fw-semibold mb-1">Phân quyền</legend>
      <p className="text-secondary small mb-3">
        Chọn một hoặc nhiều vai trò cho nhân viên.
      </p>

      <div className="row g-3">
        {PERMISSIONS.map((permission) => {
          const checked = value.includes(permission.id);

          return (
            <div key={permission.id} className="col-6">
              <label
                className={clsx("permission-card", checked && "is-checked")}
              >
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={checked}
                  onChange={() => toggle(permission.id)}
                />
                <span className="permission-icon">{permission.icon}</span>
                <span className="fw-semibold">{permission.label}</span>
                <span className="text-secondary small">
                  {permission.description}
                </span>
              </label>
            </div>
          );
        })}
      </div>

      {error && <div className="text-danger small mt-2">{error}</div>}
    </fieldset>
  );
}
