import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";
import clsx from "clsx";

export interface ComboBoxOption {
  value: string;
  label: string;
}

export interface ComboBoxProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  options: ComboBoxOption[];
  size?: "sm" | "md" | "lg";
  state?: "none" | "error" | "success";
  /** Hiện dưới ô chọn khi state khác "none" */
  message?: string;
  /** Option rỗng ở đầu danh sách */
  placeholder?: string;
}

/** API cố tình giống Input (size / state / message) */
const ComboBox = forwardRef<HTMLSelectElement, ComboBoxProps>(
  (
    {
      options,
      size = "md",
      state = "none",
      message,
      placeholder,
      className,
      ...rest
    },
    ref,
  ) => {
    const sizeClass =
      size === "sm" ? "form-select-sm" : size === "lg" ? "form-select-lg" : "";

    const stateClass =
      state === "error" ? "is-invalid" : state === "success" ? "is-valid" : "";

    const messageClass =
      state === "error"
        ? "invalid-feedback d-block"
        : "valid-feedback d-block";

    return (
      <div>
        <select
          ref={ref}
          className={clsx(
            "form-select shadow-none",
            sizeClass,
            stateClass,
            className,
          )}
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {message && state !== "none" && (
          <div className={messageClass} style={{ fontSize: "0.75rem" }}>
            {message}
          </div>
        )}
      </div>
    );
  },
);

ComboBox.displayName = "ComboBox";

export default ComboBox;
