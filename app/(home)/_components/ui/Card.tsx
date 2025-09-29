"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CardProps } from "../types";

export function CCard({ children, className = "", ...props }: CardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-2xl border border-gray-200 bg-white text-gray-800 shadow-sm",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
