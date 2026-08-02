import { useState } from "react";
import Icon from "../../components/ui/Icon";
import Input from "../../components/ui/Input";

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  state?: "none" | "error" | "success";
  message?: string;
}

export default function PasswordField({
  id,
  label,
  value,
  placeholder,
  onChange,
  state = "none",
  message,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <label htmlFor={id} className="form-label fw-semibold">
        {label} <span className="text-danger">*</span>
      </label>

      <Input
        id={id}
        type={visible ? "text" : "password"}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        state={state}
        message={message}
        rightIconInteractive
        rightIcon={
          <button
            type="button"
            className="app-icon-toggle"
            aria-label={visible ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            aria-pressed={visible}
            onClick={() => setVisible((open) => !open)}
          >
            {visible ? (
              <Icon name="eye-slash" size={16} />
            ) : (
              <Icon name="eye" size={16} />
            )}
          </button>
        }
      />
    </>
  );
}
