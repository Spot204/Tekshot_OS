import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { Calendar, ChevronDown } from "lucide-react";
import Input from "./Input";

export interface DateRangeInputProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (range: [Date | null, Date | null]) => void;
  placeholder?: string;
}

/** Chọn khoảng ngày. Ghép customInput như DateInput, chỉ khác selectsRange. */
export default function DateRangeInput({
  startDate,
  endDate,
  onChange,
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
          placeholder={placeholder}
          leftIcon={<Calendar size={16} />}
          rightIcon={<ChevronDown size={16} />}
          aria-label={placeholder}
        />
      }
    />
  );
}
