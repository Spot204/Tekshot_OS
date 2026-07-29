import React from "react";
import {
  Button as BsButton,
  type ButtonProps as BsButtonProps,
} from "react-bootstrap";

interface CustomButtonProps extends BsButtonProps {
  customVariant?: "primary" | "secondary";
}

const VARIANT_CONFIG = {
  primary: {
    variant: "primary",
    style: {
      backgroundColor: "#084298",
      borderColor: "#084298",
    },
  },
  secondary: {
    variant: "light",
    style: {
      backgroundColor: "#fff",
      borderColor: "#084298",
      color: "#084298",
    },
  },
} as const;

const Button: React.FC<CustomButtonProps> = ({
  customVariant = "primary",
  className,
  style,
  children,
  ...props
}) => {
  const config = VARIANT_CONFIG[customVariant];

  return (
    <BsButton
      variant={config.variant}
      className={className}
      style={{ ...config.style, ...style }}
      {...props}
    >
      {children}
    </BsButton>
  );
};

export default Button;
