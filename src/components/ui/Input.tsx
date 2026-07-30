import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
    size?: "sm" | "md" | "lg";
    state?: "none" | "error" | "success";
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    /** Cho phép bấm vào rightIcon (nút hiện/ẩn mật khẩu); mặc định icon chỉ để trang trí */
    rightIconInteractive?: boolean;
    message?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className = "", size = "md", state = "none", leftIcon, rightIcon, rightIconInteractive = false, message, style, ...rest}, ref) => {
    const sizeClass 
    = size === "sm" ? "form-control-sm" : size === "lg" ? "form-control-lg" : "";              

    const stateClass
    = state === "error" ? "is-invalid" : state === "success" ? "is-valid" : "";
    
    const messageClass
    = state === "error" ? "invalid-feedback d-block" : state === "success" ? "valid-feedback d-block" : "";

        return (
            <div>
                <div style={{ position: "relative" }}>
                    {leftIcon && (
                        <span
                            style={{ position: "absolute", top: "50%", left: "0.75rem", transform: "translateY(-50%)", color: "var(--text-secondary)", pointerEvents: "none", display: "inline-flex"}}>
                            {leftIcon}
                        </span>
                    )}

                    <input
                        ref={ref}
                        className={`form-control shadow-none ${sizeClass} ${stateClass} ${className}`}
                        style={{ paddingLeft: leftIcon ? "2.25rem" : undefined, paddingRight: rightIcon ? "2.25rem" : undefined, ...style }}
                        {...rest}
                    />

                    {rightIcon && (
                        <span
                            style={{ position: "absolute", top: "50%", right: "0.75rem", transform: "translateY(-50%)", color: "var(--text-secondary)", pointerEvents: rightIconInteractive ? "auto" : "none", display: "inline-flex"}}>
                            {rightIcon}
                        </span>
                    )}
                </div>

                {message && state !== "none" && (
                    <div className={messageClass} style={{ fontSize: "0.75rem" }}>
                        {message}
                    </div>
                )}
            </div>
        );
    }
);  

Input.displayName = 'Input';

export default Input;