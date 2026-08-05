import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import Icon from "./Icon";
import Input from "./Input";
import type { InputProps } from "./Input";
import { formatDateWithWeekday } from "../../utils/format";

export interface DateInputProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  /** Gắn với `htmlFor` của label; react-datepicker chuyển tiếp xuống Input */
  id?: string;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  state?: "none" | "error" | "success";
  message?: string;
  disabled?: boolean;
  /** Hiện "Thứ Hai, 27/07/2026" thay vì "27/07/2026" */
  showWeekday?: boolean;
}

interface WeekdayInputProps extends InputProps {
  pickedDate: Date | null;
}

/**
 * react-datepicker clone customInput và ghi đè `value`, nên muốn đổi nhãn
 * phải chặn ở một lớp bọc rồi tự truyền value xuống Input.
 */
const WeekdayInput = forwardRef<HTMLInputElement, WeekdayInputProps>(
  ({ pickedDate, ...props }, ref) => (
    <Input
      {...props}
      ref={ref}
      readOnly
      value={pickedDate ? formatDateWithWeekday(pickedDate) : ""}
    />
  ),
);
WeekdayInput.displayName = "WeekdayInput";

const DateInput = ({
  selected,
  onChange,
  id,
  placeholder = "Chọn ngày",
  size = "md",
  state = "none",
  message,
  disabled,
  showWeekday = false,
}: DateInputProps) => {
  const shared = {
    id,
    placeholder,
    size,
    state,
    message,
    leftIcon: <Icon name="calendar" size={16} />,
    rightIcon: <Icon name="chevron-down" size={16} />,
  };

  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      dateFormat="dd/MM/yyyy"
      disabled={disabled}
      customInput={
        showWeekday ? (
          <WeekdayInput {...shared} pickedDate={selected} />
        ) : (
          <Input {...shared} />
        )
      }
    />
  );
};

export default DateInput;
