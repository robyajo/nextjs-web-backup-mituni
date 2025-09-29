import { motion } from "framer-motion";

// Utility function untuk class names
const cn = (...classes: any[]) => {
  return classes.filter(Boolean).join(" ");
};

// Button Component
export const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}: any) => {
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
};

// Card Component
export const Card = ({ children, className = "", ...props }: any) => (
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

// Badge Component
export const Badge = ({
  children,
  variant = "default",
  className = "",
}: any) => {
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
    >
      {children}
    </span>
  );
};
