"use client";
import React, { useState, forwardRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { FormDescription } from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface CurrencyInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  value?: number;
  onChange?: (value: number) => void;
  currency?: string;
  locale?: string;
  showPreview?: boolean;
  previewClassName?: string;
  allowDecimals?: boolean;
  maxValue?: number;
  minValue?: number;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

// Currency formatting utilities
const formatCurrencyDisplay = (
  value: number,
  currency: string = "IDR",
  locale: string = "id-ID",
  allowDecimals: boolean = false
): string => {
  if (value === 0) return "";
  return value.toLocaleString(locale, {
    minimumFractionDigits: allowDecimals ? 2 : 0,
    maximumFractionDigits: allowDecimals ? 2 : 0,
  });
};

const formatCurrencyPreview = (
  value: number,
  currency: string = "IDR",
  locale: string = "id-ID",
  allowDecimals: boolean = false
): string => {
  if (value === 0) return "-";
  return value.toLocaleString(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: allowDecimals ? 2 : 0,
    maximumFractionDigits: allowDecimals ? 2 : 0,
  });
};

const parseCurrencyValue = (
  value: string,
  allowDecimals: boolean = false
): number => {
  if (!value) return 0;

  // Remove all non-numeric characters except decimal separator
  const cleaned = allowDecimals
    ? value.replace(/[^\d,]/g, "").replace(",", ".")
    : value.replace(/[^\d]/g, "");

  if (!cleaned) return 0;

  return allowDecimals ? parseFloat(cleaned) || 0 : parseInt(cleaned) || 0;
};

const getCurrencySymbol = (currency: string): string => {
  const symbols: Record<string, string> = {
    IDR: "Rp",
    USD: "$",
    EUR: "€",
    JPY: "¥",
    GBP: "£",
    SGD: "S$",
    MYR: "RM",
  };
  return symbols[currency] || currency;
};

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  (
    {
      value = 0,
      onChange,
      currency = "IDR",
      locale = "id-ID",
      showPreview = true,
      previewClassName,
      allowDecimals = false,
      maxValue,
      minValue = 0,
      disabled = false,
      placeholder = "0",
      className,
      ...props
    },
    ref
  ) => {
    const [displayValue, setDisplayValue] = useState<string>("");
    const [isFocused, setIsFocused] = useState(false);

    // Initialize display value
    useEffect(() => {
      if (value > 0) {
        setDisplayValue(
          formatCurrencyDisplay(value, currency, locale, allowDecimals)
        );
      } else {
        setDisplayValue("");
      }
    }, [value, currency, locale, allowDecimals]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      // Parse the numeric value
      const numericValue = parseCurrencyValue(inputValue, allowDecimals);

      // Apply min/max constraints
      let constrainedValue = numericValue;
      if (maxValue !== undefined && numericValue > maxValue) {
        constrainedValue = maxValue;
      }
      if (numericValue < minValue) {
        constrainedValue = minValue;
      }

      // Update display value
      if (inputValue === "" || numericValue === 0) {
        setDisplayValue("");
        onChange?.(0);
      } else {
        const formatted = formatCurrencyDisplay(
          constrainedValue,
          currency,
          locale,
          allowDecimals
        );
        setDisplayValue(formatted);
        onChange?.(constrainedValue);
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    const currencySymbol = getCurrencySymbol(currency);

    return (
      <div className="space-y-1">
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none text-sm font-medium">
            {currencySymbol}
          </span>
          <Input
            ref={ref}
            type="text"
            value={displayValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            placeholder={placeholder}
            className={cn("pl-8", className)}
            {...props}
          />
        </div>

        {showPreview && value > 0 && (
          <FormDescription className={cn("text-xs", previewClassName)}>
            <span className="font-medium text-gray-600">
              {formatCurrencyPreview(value, currency, locale, allowDecimals)}
            </span>
            {maxValue && (
              <span className="text-gray-400 ml-2">
                (Max:{" "}
                {formatCurrencyPreview(
                  maxValue,
                  currency,
                  locale,
                  allowDecimals
                )}
                )
              </span>
            )}
          </FormDescription>
        )}
      </div>
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";

// Export utility functions for external use
export const currencyUtils = {
  formatCurrencyDisplay,
  formatCurrencyPreview,
  parseCurrencyValue,
  getCurrencySymbol,
};

// Hook for easier integration with React Hook Form
export const useCurrencyInput = (initialValue: number = 0) => {
  const [value, setValue] = useState<number>(initialValue);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  const reset = (resetValue: number = 0) => {
    setValue(resetValue);
  };

  return {
    value,
    onChange: handleChange,
    reset,
  };
};
