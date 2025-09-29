"use client";
import { Header } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";

interface TableHeaderFiltersProps<TData, TValue> {
  header: Header<TData, TValue>;
  title: string;
  isSearchable: boolean;
}

export function TableHeaderFilters<TData, TValue>({
  header,
  title,
  isSearchable,
}: TableHeaderFiltersProps<TData, TValue>) {
  const [localFilters, setLocalFilters] = useState({
    customer_name: "",
    invoice_code: "",
    status_name: "",
  });

  // Single timer ref for all debounced updates
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generic debounced input handler - following DataTable pattern
  const handleInputChange = useCallback(
    (field: string, value: string) => {
      // Update local state immediately for responsive UI
      setLocalFilters((prev: typeof localFilters) => ({
        ...prev,
        [field]: value,
      }));

      // For text inputs, use debounce
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        const updateValue = value === "" ? "" : value;
        setLocalFilters((prev: typeof localFilters) => ({
          ...prev,
          [field]: updateValue,
        }));
      }, 300);
    },
    [setLocalFilters]
  );

  // Cleanup timer
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Memoized select change handler
  const handleSelectChange = useCallback(
    (
      field: string,
      value: any,
      additionalUpdates: Record<string, any> = {}
    ) => {
      // Update local state first
      setLocalFilters((prev: typeof localFilters) => ({
        ...prev,
        [field]: value,
        ...Object.entries(additionalUpdates).reduce(
          (acc, [key, val]) => ({
            ...acc,
            [key]: val,
          }),
          {}
        ),
      }));
    },
    [setLocalFilters]
  );

  // Early returns for non-searchable columns
  if (!isSearchable || title === "Aksi") {
    return (
      <div className="h-8 flex items-center justify-center text-muted-foreground">
        -
      </div>
    );
  }

  if (title === "Nama Customer") {
    return (
      <Input
        placeholder="Ex: 1234567"
        value={localFilters.customer_name} // Use local state for immediate UI response
        onChange={(e) => {
          const value = e.target.value;
          handleInputChange("customer_name", value); // Use the debounced handler
        }}
        className="h-8 text-xs w-full"
        size={1}
      />
    );
  }
  if (title === "Kode Invoice") {
    return (
      <Input
        placeholder="Ex: 1234567"
        value={localFilters.invoice_code} // Use local state for immediate UI response
        onChange={(e) => {
          const value = e.target.value;
          handleInputChange("invoice_code", value); // Use the debounced handler
        }}
        className="h-8 text-xs w-full"
        size={1}
      />
    );
  }

  // Select components with immediate global state updates (no debounce needed for selects)
  if (title === "Status") {
    return (
      <select
        value={localFilters.status_name || ""}
        onChange={(e) => {
          handleInputChange("status_name", e.target.value);
        }}
        className="h-8 text-xs w-full border rounded-md px-2 bg-background"
      >
        <option value="">Semua</option>
        <option value="Diterima">Diterima</option>
        <option value="Batal">Batal</option>
      </select>
    );
  }

  // Default case for other searchable columns
  return null;
}
