"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

export function PhoneInput({
  value = "",
  onChange,
  className,
  ...props
}: PhoneInputProps) {
  const [displayValue, setDisplayValue] = useState("");

  // Format the phone number for display (adds +62 prefix if needed)
  useEffect(() => {
    if (!value) {
      setDisplayValue("");
      return;
    }

    // If value is already in international format (62...), convert to local format (0...)
    if (value.startsWith("62")) {
      setDisplayValue("0" + value.substring(2));
    } else if (value.startsWith("+")) {
      setDisplayValue(value.replace("+62", "0"));
    } else {
      setDisplayValue(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, ""); // Remove non-digits
    
    // Remove leading zeros
    input = input.replace(/^0+/, '');
    
    // Limit to 13 digits (excluding leading 0)
    if (input.length > 12) {
      input = input.substring(0, 12);
    }

    // Update display value
    setDisplayValue(input);

    // Convert to international format (628...)
    const formattedValue = input ? `62${input}` : '';

    // Only allow numbers and ensure it's not just +62
    if (/^\d+$/.test(formattedValue) && formattedValue.length >= 10) {
      onChange(formattedValue);
    } else if (input === "") {
      onChange("");
    }
  };

  return (
    <div className={cn("relative flex items-center", className)}>
      <span className="absolute left-3 text-sm text-muted-foreground">+62</span>
      <Input
        type="tel"
        value={displayValue}
        onChange={handleChange}
        className={cn("pl-10", className)}
        placeholder="81234567890"
        {...props}
      />
    </div>
  );
}

export default PhoneInput;
