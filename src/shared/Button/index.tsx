import React from "react";

export type ButtonProps = {
  children: string | React.ReactNode;
  className: string;
  type: "submit" | "reset" | "button";
  onClick?: () => void;
  disabled?: boolean;
};

export const Button = ({
  children,
  className,
  type,
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
