"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { ChevronsUpDown, Check, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface SelectOption {
  label: string;
  value: string;
  no_wa?: string;
  phone?: string;
}

interface SelectProps {
  data: SelectOption[];
  searchTerm: string;
  placeholder?: string;
  value?: string;
  onValueChange: (value: string) => void;
  className?: string;
  isLoading?: boolean;
  labelMax?: number;
  loadingText?: string;
  disabled?: boolean;
  errorText?: string;
  label?: string;
  desc?: string;
  isRequired?: boolean;
  width?: number;
  height?: number;
}

// Virtual scrolling hook for performance
const useVirtualScroll = (
  items: SelectOption[],
  containerHeight: number = 300,
  itemHeight: number = 48
) => {
  const [scrollTop, setScrollTop] = React.useState(0);
  const scrollElementRef = React.useRef<HTMLDivElement>(null);

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );
  const visibleItems = items.slice(startIndex, endIndex);

  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  const handleScroll = React.useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return {
    scrollElementRef,
    visibleItems,
    totalHeight,
    offsetY,
    handleScroll,
    startIndex,
  };
};

// Debounce hook for search optimization
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const SelectComboboxFilter = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      data = [],
      searchTerm,
      placeholder,
      value = "",
      labelMax = 30,
      onValueChange,
      className,
      isLoading = false,
      loadingText = "Sedang memuat...",
      disabled = false,
      errorText,
      label,
      desc,
      isRequired,
      width,
      height,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    // Debounce search untuk mengurangi re-render saat typing
    const debouncedSearchQuery = useDebounce(searchQuery, 150);

    // Memoized filtered items dengan optimasi pencarian
    const filteredItems = React.useMemo(() => {
      if (!data || data.length === 0) return [];
      if (!debouncedSearchQuery.trim()) {
        // Add 'Lihat Semua' option at the beginning when no search query
        return [{ label: "Lihat Semua", value: "" }, ...data];
      }

      const searchLower = debouncedSearchQuery.toLowerCase().trim();
      const searchWords = searchLower.split(" ").filter(Boolean);

      // Optimized search: early termination and word-based matching
      return data.filter((item) => {
        const itemLower = item.label.toLowerCase();
        const valueLower = item.value.toLowerCase();

        // Check if all search words are present (more accurate search)
        return searchWords.every(
          (word) => itemLower.includes(word) || valueLower.includes(word)
        );
      });
    }, [data, debouncedSearchQuery]);

    // Virtual scrolling untuk handle ribuan items
    const ITEM_HEIGHT = 48;
    const [containerHeight, setContainerHeight] = useState(400);

    useEffect(() => {
      // Only run on client side
      const updateHeight = () => {
        setContainerHeight(Math.min(window.innerHeight * 0.6, 400));
      };

      // Set initial height
      updateHeight();

      // Add resize listener
      window.addEventListener("resize", updateHeight);

      // Cleanup
      return () => window.removeEventListener("resize", updateHeight);
    }, []);

    const virtualScroll = useVirtualScroll(
      filteredItems,
      containerHeight,
      ITEM_HEIGHT
    );

    // Memoized selected item untuk performa
    const selectedItem = React.useMemo(() => {
      return data.find((item) => item.value === value);
    }, [data, value]);

    const truncateText = React.useCallback(
      (text: string, maxLength: number) => {
        return text.length > maxLength
          ? text.slice(0, maxLength) + "..."
          : text;
      },
      []
    );

    // Use a ref to track mounted state without causing re-renders
    const isMounted = React.useRef(false);

    // Set mounted to true on client-side
    React.useEffect(() => {
      isMounted.current = true;
      return () => {
        isMounted.current = false;
      };
    }, []);

    // State to control placeholder visibility
    const [showPlaceholder, setShowPlaceholder] = React.useState(true);

    // Update showPlaceholder after mount
    React.useEffect(() => {
      if (isMounted.current) {
        setShowPlaceholder(false);
      }
    }, []);

    const renderSelectedLabel = React.useCallback(() => {
      if (isLoading) {
        return (
          <span className="flex items-center">
            <span className="animate-spin mr-2 h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
            {loadingText}
          </span>
        );
      }

      if (!data || data.length === 0) {
        return placeholder || `Pilih ${searchTerm}...`;
      }

      if (selectedItem) {
        return (
          <div className="flex items-center gap-2">
            <span>{selectedItem.label}</span>
            {/* {selectedItem.no_wa && (
              <>
                <span className="text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">
                  {selectedItem.no_wa}
                </span>
              </>
            )} */}
          </div>
        );
      }

      const displayText = placeholder || `Pilih ${searchTerm}...`;

      // Use a safe check for window object
      if (typeof window === "undefined") {
        return truncateText(displayText, labelMax);
      }

      const mobileMaxLength = Math.max(5, Math.min(labelMax, 25));
      const desktopMaxLength = labelMax;

      return truncateText(
        displayText,
        window.innerWidth <= 768 ? mobileMaxLength : desktopMaxLength
      );
    }, [
      isLoading,
      loadingText,
      data,
      selectedItem,
      placeholder,
      searchTerm,
      labelMax,
      truncateText,
    ]);

    const handleSelect = React.useCallback(
      (selectedValue: string) => {
        onValueChange(selectedValue);
        setSearchQuery("");
        setOpen(false);
      },
      [onValueChange]
    );

    // Handle clear selection (View All)
    const handleClearSelection = React.useCallback(() => {
      onValueChange("");
      setSearchQuery("");
      setOpen(false);
    }, [onValueChange]);

    // Reset scroll position when opening dialog
    React.useEffect(() => {
      if (open && virtualScroll.scrollElementRef.current) {
        virtualScroll.scrollElementRef.current.scrollTop = 0;
      }
    }, [open]);

    return (
      <div className={cn("w-full space-y-1", className)}>
        {label && (
          <Label htmlFor={searchTerm}>
            {label} {isRequired && <span className="text-red-500">*</span>}
          </Label>
        )}
        {desc && <p className="text-xs text-muted-foreground mb-1">{desc}</p>}

        {showPlaceholder ? (
          <div className="h-10 w-full rounded-md border border-input bg-background" />
        ) : null}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              ref={ref}
              className={cn(
                "flex items-center w-full gap-3 p-3 border border-dashed rounded-lg text-gray-500 cursor-pointer hover:border-gray-400",
                "text-left transition-colors",
                errorText && "border-red-500",
                disabled && "opacity-50 cursor-not-allowed"
              )}
              role="combobox"
              aria-expanded={open}
              disabled={disabled || isLoading}
              type="button"
            >
              <User className="w-5 h-5 flex-shrink-0" />
              <span className="truncate flex-1">{renderSelectedLabel()}</span>
            </button>
          </DialogTrigger>

          <DialogContent
            className={cn(
              "p-0 flex flex-col overflow-hidden",

              "max-w-[95vw] sm:max-w-[500px]",
              "h-[85vh] sm:h-auto",
              "max-h-[58vh] sm:max-h-[80vh]",
              "rounded-lg sm:rounded-lg",
              "top-[7.5vh] sm:top-[50%]",
              "translate-y-0 sm:translate-y-[-50%]"
            )}
          >
            <DialogTitle className="sr-only">Pilih {searchTerm}</DialogTitle>

            <Command className="" shouldFilter={false}>
              {/* Search Input */}
              <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <CommandInput
                  placeholder={`Cari ${searchTerm}... (${data.length} items)`}
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                  className="h-12 sm:h-12 text-sm sm:text-base px-3 sm:px-4 rounded-none border-0 focus:ring-0"
                  autoFocus={false}
                />

                {/* Search Results Count */}
                {debouncedSearchQuery && (
                  <div className="px-3 py-1 text-xs text-muted-foreground border-t bg-muted/30">
                    {filteredItems.length} dari {data.length} hasil
                  </div>
                )}
              </div>

              {/* Virtual Scrolled List */}
              <div className="flex-1 relative">
                {isLoading ? (
                  <div className="py-8 text-center text-sm text-muted-foreground px-4">
                    <span className="animate-spin mr-2 inline-block h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                    {loadingText}
                  </div>
                ) : filteredItems.length === 0 ? (
                  <CommandEmpty className="py-8 text-center px-4">
                    <div className="text-sm text-muted-foreground">
                      {debouncedSearchQuery.trim()
                        ? `Tidak ada ${searchTerm} yang cocok dengan "${debouncedSearchQuery}"`
                        : data.length === 0
                        ? `Tidak ada ${searchTerm} tersedia`
                        : `Tidak ada ${searchTerm} yang cocok`}
                    </div>
                  </CommandEmpty>
                ) : (
                  <CommandList
                    className="overflow-y-auto"
                    style={{ maxHeight: containerHeight }}
                  >
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Available options">
                      <div
                        ref={virtualScroll.scrollElementRef}
                        onScroll={virtualScroll.handleScroll}
                        style={{
                          height: virtualScroll.totalHeight,
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            transform: `translateY(${virtualScroll.offsetY}px)`,
                            position: "absolute",
                            width: "100%",
                          }}
                        >
                          {virtualScroll.visibleItems.map((item, index) => {
                            const actualIndex =
                              virtualScroll.startIndex + index;
                            return (
                              <CommandItem
                                key={`${item.value}-${actualIndex}`}
                                value={item.value}
                                onSelect={() => handleSelect(item.value)}
                                className={cn(
                                  "relative flex items-center px-2 py-1.5 text-sm rounded-md",
                                  "cursor-default select-none",
                                  "hover:bg-accent hover:text-accent-foreground",
                                  value === item.value && "bg-accent/50"
                                )}
                                style={{ height: ITEM_HEIGHT }}
                              >
                                <div className="flex-1 min-w-0 flex items-center gap-2">
                                  <div className="truncate">{item.label}</div>
                                  {item.phone && (
                                    <span className="text-xs text-muted-foreground truncate">
                                      {item.phone}
                                    </span>
                                  )}
                                </div>
                                <Check
                                  className={cn(
                                    "ml-2 h-4 w-4",
                                    value === item.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            );
                          })}
                        </div>
                      </div>
                    </CommandGroup>
                  </CommandList>
                )}
              </div>
            </Command>

            {/* Performance indicator (development only) */}
            {/* {process.env.NODE_ENV === "development" && (
              <div className="text-xs text-muted-foreground px-2 py-1 bg-muted/20 border-t">
                Showing {virtualScroll.visibleItems.length} of{" "}
                {filteredItems.length} items
              </div>
            )} */}
          </DialogContent>
        </Dialog>

        {errorText && (
          <p className="text-xs sm:text-sm text-red-500 mt-1 px-0.5">
            {errorText}
          </p>
        )}
      </div>
    );
  }
);

SelectComboboxFilter.displayName = "SelectComboboxFilter";

export default SelectComboboxFilter;
