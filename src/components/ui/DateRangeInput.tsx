import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { Calendar, ChevronDown } from "lucide-react";
import Input from "./Input";

export interface DateRangeInputProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (range: [Date | null, Date | null]) => void;
  /** Gắn với `htmlFor` của label; react-datepicker chuyển tiếp xuống Input */
  id?: string;
  placeholder?: string;
}

/** Chọn khoảng ngày. Ghép customInput như DateInput, chỉ khác selectsRange. */
export default function DateRangeInput({
  startDate,
  endDate,
  onChange,
  id,
  placeholder = "Chọn khoảng ngày",
}: DateRangeInputProps) {
  return (
    <DatePicker
      selectsRange
      startDate={startDate ?? undefined}
      endDate={endDate ?? undefined}
      onChange={onChange}
      dateFormat="dd/MM/yyyy"
      customInput={
        <Input
          id={id}
          placeholder={placeholder}
          leftIcon={<Calendar size={16} />}
          rightIcon={<ChevronDown size={16} />}
          aria-label={id ? undefined : placeholder}
        />
      }
    />
  );
}
