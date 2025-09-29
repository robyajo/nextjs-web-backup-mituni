"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ButtonProps } from "../types";

export function CButton({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full font-medium transition-all focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variantClasses = {
    default:
      "bg-teal-500 text-white hover:bg-teal-600 shadow-lg hover:shadow-teal-500/30",
    gradient:
      "bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:from-teal-600 hover:to-emerald-600 shadow-lg hover:shadow-teal-500/30",
    glow: "bg-teal-500 text-white hover:bg-teal-600 shadow-lg hover:shadow-teal-500/50 ring-2 ring-teal-500/20",
    outline:
      "border-2 border-teal-500 text-teal-600 hover:bg-teal-500 hover:text-white",
  };

  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    lg: "h-11 px-6",
    xl: "h-14 px-8 text-lg",
  };

  return (
    <motion.button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
