"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { cn } from "@/lib/utils";
import { TableHeaderFilters } from "./table-header-filters";
import SkeletonTable from "./skeleton-table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  stickyColumns?: string[]; // Optional: untuk backward compatibility
  onEdit?: (data: TData) => void;
  onFilter?: (filters: { search: string; status: string }) => void;
  pageCount: number;
  pageIndex: number;
  pageSize: number;
  onPaginationChange: (pagination: {
    pageIndex: number;
    pageSize: number;
  }) => void;
  totalItems: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onEdit,
  onFilter,
  pageCount,
  pageIndex,
  pageSize,
  onPaginationChange,
  totalItems,
  isLoading,
  stickyColumns = [], // Default empty array
}: DataTableProps<TData, TValue>) {
  const [filters, setFilters] = useState({ search: "", status: "" });
  const [isClient, setIsClient] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Debounce filter changes
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      onFilter?.(filters);
    }, 300);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [filters, onFilter]);

  // Don't reset pagination here - let parent component handle it
  // This was causing conflict with parent component's pagination management

  // Handle filter changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  const handleStatusChange = (value: string) => {
    setFilters((prev) => ({ ...prev, status: value === "all" ? "" : value }));
  };

  const handleReset = () => {
    setFilters({ search: "", status: "" });
    onPaginationChange({ pageIndex: 0, pageSize });
    onFilter?.({ search: "", status: "" });
  };

  // Enhance columns with onEdit
  const enhancedColumns = useMemo(() => {
    return columns.map((column) => {
      if (column.id === "actions" && onEdit) {
        return {
          ...column,
          cell: (props: any) => {
            const originalCell = column.cell as any;
            return originalCell({ ...props, onEdit });
          },
        };
      }
      return column;
    });
  }, [columns, onEdit]);

  // Table instance
  const table = useReactTable({
    data,
    columns: enhancedColumns,
    state: { pagination: { pageIndex, pageSize } },
    pageCount,
    manualPagination: true,
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;

      // Only trigger if actually changed
      if (
        newPagination.pageIndex !== pageIndex ||
        newPagination.pageSize !== pageSize
      ) {
        onPaginationChange(newPagination);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const hasActiveFilters = filters.search || filters.status;
  const getStickyLeft = (headerId: string) => {
    if (!table || typeof window === "undefined") return 0; // Return 0 during SSR

    const index = stickyColumns.indexOf(headerId);
    if (index === -1) return 0;

    // Rest of your existing getStickyLeft implementation
    for (const headerGroup of table.getHeaderGroups()) {
      const column = headerGroup.headers.find((h) => h.id === headerId);
      if (column) {
        return stickyColumns.slice(0, index).reduce((total, id) => {
          const prevColumn = headerGroup.headers.find((h) => h.id === id);
          return total + (prevColumn?.getSize() || 0);
        }, 0);
      }
    }
    return 0;
  };
  return (
    <div className="w-full">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        <div className="flex-1 flex flex-col sm:flex-row items-center gap-3">
          {/* Search */}
          <div className="relative w-full sm:flex-1">
            <Input
              placeholder="Masukkan Nama Pelanggan"
              value={filters.search}
              onChange={handleSearchChange}
              className="pr-10"
            />
            {filters.search && (
              <Button
                variant="noShadow"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                onClick={() => setFilters((prev) => ({ ...prev, search: "" }))}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          {/* Status Filter */}
          <Select
            value={filters.status || ""}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Semua Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="0">Diterima</SelectItem>
              <SelectItem value="1">Diproses</SelectItem>
              <SelectItem value="2">Siap Ambil</SelectItem>
              <SelectItem value="3">Selesai</SelectItem>
              <SelectItem value="4">Batal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DataTableToolbar table={table} data={data} columns={columns} />
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="mb-2 text-sm text-muted-foreground">Memuat data...</div>
      )}

      {/* Table */}
      <div className="overflow-auto rounded-lg border">
        <table className="w-full relative">
          <thead className="border-b border-gray-200 dark:border-gray-700">
            <tr className="sticky top-0 z-20 ">
              {table.getHeaderGroups()[0].headers.map((header) => (
                <th
                  key={header.id}
                  className={cn(
                    "px-3 py-2 text-left font-medium text-muted-foreground border border-gray-200 dark:border-gray-700",
                    "md:sticky",
                    "bg-accent",
                    stickyColumns.includes(header.id as string) && [
                      "md:left-0", // Only apply left positioning on medium screens and up
                      "z-20 min-w-[160px] md:min-w-[200px] text-xs md:text-sm font-medium text-muted-foreground",
                      "border border-gray-200 dark:border-gray-700",
                      "bg-accent",
                    ]
                  )}
                  style={{
                    width: header.getSize(),
                    ...(stickyColumns.includes(header.id as string) &&
                      isClient && {
                        left:
                          window.innerWidth >= 768
                            ? getStickyLeft(header.id)
                            : undefined,
                      }),
                  }}
                >
                  <div className="flex items-center gap-1">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={cn(
                    "hover:bg-muted/50 transition-colors",
                    index % 2 === 0 ? "bg-background" : "bg-muted/20"
                  )}
                >
                  {row.getVisibleCells().map((cell) => {
                    const isSticky = stickyColumns.includes(cell.column.id);
                    return (
                      <td
                        key={cell.id}
                        className={cn(
                          "px-2 py-1 border border-gray-200 dark:border-gray-700",
                          stickyColumns.includes(cell.column.id as string) && [
                            "md:sticky md:left-0 z-10",
                            "bg-muted/90",
                            "border-gray-300 dark:border-gray-700",
                          ]
                        )}
                        style={{
                          width: cell.column.getSize(),
                          ...(stickyColumns.includes(
                            cell.column.id as string
                          ) && {
                            left:
                              typeof window !== "undefined" &&
                              window.innerWidth >= 768
                                ? getStickyLeft(cell.column.id)
                                : undefined,
                          }),
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : isLoading ? (
              <SkeletonTable columns={columns} rows={10} />
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-12 text-muted-foreground"
                >
                  <div className="flex flex-col items-center">
                    <Search className="h-12 w-12 mb-4 opacity-50" />
                    <p className="text-lg font-medium">
                      Tidak ada data yang ditemukan
                    </p>
                    <p className="text-sm">Coba ubah filter pencarian Anda</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <DataTablePagination
          table={table}
          pageCount={pageCount}
          pageIndex={pageIndex}
          pageSize={pageSize}
          totalItems={totalItems}
          onPaginationChange={onPaginationChange}
        />
      </div>
    </div>
  );
}
