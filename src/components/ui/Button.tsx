import React from "react";
import clsx from "clsx";
import {
  Button as BsButton,
  type ButtonProps as BsButtonProps,
} from "react-bootstrap";

interface CustomButtonProps extends BsButtonProps {
  customVariant?: "primary" | "secondary";
}

/** Map customVariant -> variant của react-bootstrap + class màu thương hiệu */
const BRAND_CONFIG = {
  primary: { variant: "primary", brandClass: "btn-brand" },
  secondary: { variant: "light", brandClass: "btn-brand-outline" },
} as const;

/**
 * Nút mặc định của app.
 *
 * Nếu người gọi truyền `variant` của react-bootstrap (vd variant="link") thì
 * bỏ hẳn styling thương hiệu và tôn trọng variant đó. Bản trước gộp style
 * thương hiệu vào inline style nên nút variant="link" vẫn bị nền xanh navy.
 *
 * Màu nằm trong .btn-brand / .btn-brand-outline ở global.css, không phải
 * inline style — nhờ vậy hover/active mới có màu riêng.
 */
const Button: React.FC<CustomButtonProps> = ({
  customVariant,
  variant,
  className,
  children,
  ...props
}) => {
  if (variant) {
    return (
      <BsButton variant={variant} className={className} {...props}>
        {children}
      </BsButton>
    );
  }

  const config = BRAND_CONFIG[customVariant ?? "primary"];

  return (
    <BsButton
      variant={config.variant}
      className={clsx(config.brandClass, className)}
      {...props}
    >
      {children}
    </BsButton>
  );
};

export default Button;
