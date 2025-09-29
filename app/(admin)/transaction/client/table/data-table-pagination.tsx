import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
  pageCount: number;
  pageIndex: number;
  pageSize: number;
  totalItems: number;
  onPaginationChange: (pagination: {
    pageIndex: number;
    pageSize: number;
  }) => void;
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 30, 40, 50, 100],
  pageCount,
  pageIndex,
  pageSize,
  totalItems,
  onPaginationChange,
}: DataTablePaginationProps<TData>) {
  // Ensure pageCount is at least 1
  const safePageCount = Math.max(1, pageCount);
  const isLastPage = pageIndex >= safePageCount - 1;
  const isFirstPage = pageIndex <= 0;

  // Calculate showing range - ensure we don't show more than totalItems
  const startItem = totalItems > 0 ? Math.min(pageIndex * pageSize + 1, totalItems) : 0;
  const endItem = Math.min((pageIndex + 1) * pageSize, totalItems);
  
  // Calculate safe page index without triggering state updates
  const safePageIndex = Math.min(Math.max(0, pageIndex), safePageCount - 1);
  
  // Use effect to handle page index validation
  React.useEffect(() => {
    if (pageIndex !== safePageIndex) {
      // If current page is invalid, update to the closest valid page
      onPaginationChange({ pageIndex: safePageIndex, pageSize });
    }
  }, [pageIndex, safePageIndex, pageSize, onPaginationChange]);

  return (
    <div className="flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8">
      <div className="flex-1 whitespace-nowrap text-sm text-muted-foreground">
        {totalItems > 0
          ? `Menampilkan ${startItem} sampai ${endItem} dari ${totalItems} data`
          : "Tidak ada data yang tersedia"}
      </div>
      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex items-center space-x-2">
          <p className="whitespace-nowrap text-sm font-medium">
            Baris per halaman
          </p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              onPaginationChange({ pageIndex: 0, pageSize: Number(value) });
            }}
          >
            <SelectTrigger className="h-8 w-[4.5rem]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center text-sm font-medium">
          Halaman {pageIndex + 1} dari {safePageCount}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            aria-label="Ke halaman pertama"
            variant="outline"
            className="hidden size-8 p-0 lg:flex"
            onClick={() => onPaginationChange({ pageIndex: 0, pageSize })}
            disabled={isFirstPage}
          >
            <DoubleArrowLeftIcon className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Halaman sebelumnya"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => {
              const newPageIndex = Math.max(0, pageIndex - 1);
              if (newPageIndex !== pageIndex) {
                onPaginationChange({
                  pageIndex: newPageIndex,
                  pageSize,
                });
              }
            }}
            disabled={isFirstPage}
          >
            <ChevronLeftIcon className="size-4" aria-hidden="true" />
          </Button>
          
          <Button
            aria-label="Halaman selanjutnya"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => {
              const newPageIndex = Math.min(pageIndex + 1, safePageCount - 1);
              if (newPageIndex !== pageIndex) {
                onPaginationChange({
                  pageIndex: newPageIndex,
                  pageSize,
                });
              }
            }}
            disabled={isLastPage}
          >
            <ChevronRightIcon className="size-4" aria-hidden="true" />
          </Button>
          
          <Button
            aria-label="Ke halaman terakhir"
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => {
              onPaginationChange({
                pageIndex: safePageCount - 1,
                pageSize,
              });
            }}
            disabled={isLastPage}
          >
            <DoubleArrowRightIcon className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
