import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary";
}

export function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  const baseClasses = "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 disabled:opacity-50",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
