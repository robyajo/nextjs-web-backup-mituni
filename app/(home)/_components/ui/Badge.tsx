"use client";

import { cn } from "@/lib/utils";
import { BadgeProps } from "../types";

export function CBadge({
  children,
  variant = "default",
  className = "",
  ...props
}: BadgeProps) {
  const variantClasses = {
    default: "bg-teal-100 text-teal-700",
    popular: "bg-gradient-to-r from-amber-400 to-orange-500 text-white",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
