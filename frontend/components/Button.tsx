import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "danger";
}

export function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  const variants = {
    primary: "btn-primary",
    danger: "btn-danger",
  };

  return (
    <button
      className={`${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

