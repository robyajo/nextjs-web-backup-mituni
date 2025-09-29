// utils/formatCurrency.ts

/**
 * Format a number or string to Indonesian Rupiah currency (Rp) with 2 decimals.
 * @param value Number or numeric string to format
 * @returns Formatted string, e.g. 'Rp65.000,00'
 */
// export function formatCurrencyIDR(value: number | string | undefined | null): string {
//   if (value === undefined || value === null || value === "") return "-";
//   const num = typeof value === "string" ? Number(value) : value;
//   if (isNaN(num)) return "-";
//   return num.toLocaleString("id-ID", {
//     style: "currency",
//     currency: "IDR",
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });
// }

// Currency formatting utilities
export const formatCurrencyIDR = (
  value: number | string | undefined | null
): string => {
  if (value === undefined || value === null || value === "") return "";
  const num = typeof value === "string" ? Number(value) : value;
  if (isNaN(num)) return "";
  return num.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export const parseCurrencyIDR = (value: string): number => {
  if (!value) return 0;
  // Remove 'Rp', spaces, dots, and commas, then parse
  const cleaned = value.replace(/[Rp\s.,]/g, "");
  const parsed = parseInt(cleaned) || 0;
  return parsed;
};

export const formatCurrencyInput = (value: string): string => {
  const numericValue = parseCurrencyIDR(value);
  if (numericValue === 0) return "";

  // Format without 'Rp' prefix for input display
  return numericValue.toLocaleString("id-ID");
};
