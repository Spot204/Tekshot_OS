import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Users } from "lucide-react";
import type { PermissionId } from "../../types/employee";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import PasswordField from "./PasswordField";
import PasswordStrength from "./PasswordStrength";
import PermissionPicker from "./PermissionPicker";

export interface EmployeeDraft {
  name: string;
  username: string;
  email: string;
  password: string;
  permissions: PermissionId[];
}

const EMPTY: EmployeeDraft = {
  name: "",
  username: "",
  email: "",
  password: "",
  permissions: [],
};

interface EmployeeFormModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (draft: EmployeeDraft) => void;
}

type Errors = Partial<Record<keyof EmployeeDraft | "confirm", string>>;

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export default function EmployeeFormModal({
  show,
  onClose,
  onSubmit,
}: EmployeeFormModalProps) {
  const [draft, setDraft] = useState<EmployeeDraft>(EMPTY);
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  /** Xoá lỗi của đúng ô vừa sửa — lỗi chỉ tính lại lúc submit nên nếu không
   *  xoá thì gõ đúng rồi ô vẫn đỏ */
  const clearError = (key: keyof Errors) =>
    setErrors(({ [key]: _removed, ...rest }) => rest);

  const patch = (value: Partial<EmployeeDraft>) => {
    setDraft((prev) => ({ ...prev, ...value }));
    Object.keys(value).forEach((key) => clearError(key as keyof Errors));
  };

  const changeConfirm = (value: string) => {
    setConfirm(value);
    clearError("confirm");
  };

  const close = () => {
    setDraft(EMPTY);
    setConfirm("");
    setErrors({});
    onClose();
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!draft.name.trim()) next.name = "Chưa nhập họ và tên";
    if (!draft.username.trim()) next.username = "Chưa nhập tên đăng nhập";
    if (draft.email && !isEmail(draft.email)) next.email = "Email không hợp lệ";
    if (!draft.password) next.password = "Chưa nhập mật khẩu";
    if (!confirm) next.confirm = "Chưa nhập lại mật khẩu";
    else if (confirm !== draft.password) next.confirm = "Mật khẩu không khớp";
    if (!draft.permissions.length) next.permissions = "Chọn ít nhất một vai trò";
    return next;
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) return;

    onSubmit({ ...draft, name: draft.name.trim() });
    close();
  };

  // Chỉ báo khớp khi đã gõ cả hai, tránh hiện lỗi ngay lúc mới mở form
  const confirmState = !confirm
    ? "none"
    : confirm === draft.password
      ? "success"
      : "error";

  return (
    <Modal show={show} onHide={close} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title className="h5 fw-bold">Thêm nhân viên mới</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form id="employee-form" onSubmit={submit} noValidate>
          <div className="d-flex align-items-center gap-2 mb-4">
            <span className="employee-list-icon">
              <Users size={18} />
            </span>
            <h3 className="h6 fw-semibold mb-0">Thông tin cơ bản</h3>
          </div>

          <div className="row g-4">
            <div className="col-lg-6 d-flex flex-column gap-3">
              <div>
                <label htmlFor="emp-name" className="form-label fw-semibold">
                  Họ và tên <span className="text-danger">*</span>
                </label>
                <Input
                  id="emp-name"
                  placeholder="Nhập họ và tên"
                  value={draft.name}
                  onChange={(e) => patch({ name: e.target.value })}
                  state={errors.name ? "error" : "none"}
                  message={errors.name}
                />
              </div>

              <div>
                <label htmlFor="emp-email" className="form-label fw-semibold">
                  Thư điện tử
                </label>
                <Input
                  id="emp-email"
                  type="email"
                  placeholder="Nhập địa chỉ email"
                  value={draft.email}
                  onChange={(e) => patch({ email: e.target.value })}
                  state={errors.email ? "error" : "none"}
                  message={errors.email}
                />
              </div>

              <div>
                <PasswordField
                  id="emp-password"
                  label="Mật khẩu"
                  placeholder="Nhập mật khẩu"
                  value={draft.password}
                  onChange={(password) => patch({ password })}
                  state={errors.password ? "error" : "none"}
                  message={errors.password}
                />
                <PasswordStrength value={draft.password} />
              </div>

              <div>
                <PasswordField
                  id="emp-confirm"
                  label="Xác nhận mật khẩu"
                  placeholder="Nhập lại mật khẩu"
                  value={confirm}
                  onChange={changeConfirm}
                  state={errors.confirm ? "error" : confirmState}
                  message={errors.confirm ?? (confirmState === "success" ? "Mật khẩu trùng khớp" : undefined)}
                />
              </div>
            </div>

            <div className="col-lg-6 d-flex flex-column gap-3">
              <div>
                <label htmlFor="emp-username" className="form-label fw-semibold">
                  Tên đăng nhập <span className="text-danger">*</span>
                </label>
                <Input
                  id="emp-username"
                  placeholder="Nhập tên đăng nhập"
                  value={draft.username}
                  onChange={(e) => patch({ username: e.target.value })}
                  state={errors.username ? "error" : "none"}
                  message={errors.username}
                />
              </div>

              <PermissionPicker
                value={draft.permissions}
                onChange={(permissions) => patch({ permissions })}
                error={errors.permissions}
              />
            </div>
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button customVariant="secondary" onClick={close}>
          Hủy
        </Button>
        <Button type="submit" form="employee-form">
          Tạo tài khoản
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
