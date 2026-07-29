import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker";
import Input from "./Input";

export interface DateInputProps {
    selected: Date | null;
    onChange: (date: Date | null) => void;
    placeholder?: string;
    size?: "sm" | "md" | "lg";
    state?: "none" | "error" | "success";
    message?: string;
    disabled?: boolean;
}

const DateInput = ({ 
    selected, onChange, placeholder = "Chọn ngày", size = "md", state = "none", message, disabled }: DateInputProps) => {
        return (
            <DatePicker
            selected={selected}
            onChange={onChange}
            dateFormat="dd/MM/yyyy"
            disabled={disabled}
            customInput={
                <Input
                    placeholder={placeholder}
                    size={size}
                    state={state}
                    message={message}
                    rightIcon={<i className="bi bi-calendar3" />}
                />
            }
        />
    ); 
};

export default DateInput;