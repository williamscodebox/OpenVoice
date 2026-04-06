import React from "react";
import "./button.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled,
  loading = false,
  ...props
}: ButtonProps) {
  const classes = `btn btn-${variant} btn-${size} ${
    disabled || loading ? "btn-disabled" : ""
  }`;

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading ? "Loading..." : children}
    </button>
  );
}
