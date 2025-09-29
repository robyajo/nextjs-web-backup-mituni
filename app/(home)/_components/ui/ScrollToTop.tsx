"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";

interface ScrollToTopProps {
  showScroll: boolean;
  onClick: () => void;
}

export function ScrollToTop({ showScroll, onClick }: ScrollToTopProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`fixed bottom-8 right-8 bg-teal-500 text-white w-12 h-12 rounded-full shadow-lg z-50 transition-all duration-300 ${
        showScroll ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-6 h-6 mx-auto" />
    </motion.button>
  );
}
