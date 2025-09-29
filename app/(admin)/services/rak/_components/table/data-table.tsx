"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";

import {
  ColumnDef,
  flexRender,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { useMediaQuery } from "react-responsive";
import { DataTablePagination } from "./data-table-pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  labelSearch?: string;
  token?: string;
  urlFilter?: string;
  isLoading?: boolean;
  onEdit?: (data: TData) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  labelSearch,
  isLoading = false,
  onEdit,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // Define a type for the cell props that includes onEdit
  type CellWithEditProps = {
    row: {
      original: TData;
    };
  };

  const enhancedColumns = useMemo(() => {
    return columns.map((column) => {
      // Only enhance the actions column if onEdit is provided
      if (column.id === "actions" && onEdit) {
        const originalCell = column.cell as
          | ((props: CellWithEditProps) => React.ReactNode)
          | undefined;

        return {
          ...column,
          cell: (props: CellWithEditProps) => {
            // Create a new props object with the onEdit handler
            const enhancedProps = {
              ...props,
              row: {
                ...props.row,
                original: {
                  ...props.row.original,
                },
              },
            };

            // Call the original cell renderer if it exists
            let cell: React.ReactNode = null;
            if (typeof originalCell === "function") {
              cell = originalCell(enhancedProps);
            }

            return cell;
          },
        } as ColumnDef<TData, TValue>;
      }

      return column;
    });
  }, [columns, onEdit]);

  const table = useReactTable({
    data,
    // @ts-ignore - Temporary ignore for enhanced columns
    columns: enhancedColumns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  function SkeletonTable({ columnsCount = 5, rowsCount = 8 }) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: columnsCount }).map((_, i) => (
              <TableHead key={i}>
                <Skeleton className="h-4 w-24" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rowsCount }).map((_, i) => (
            <TableRow key={i}>
              {Array.from({ length: columnsCount }).map((_, j) => (
                <TableCell key={j}>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-2  w-full lg:grid lg:grid-cols-2 space-y-1 lg:y-4">
        {searchKey && (
          <Input
            placeholder={`Cari ${labelSearch}...`}
            value={
              (table
                .getColumn(searchKey as string)
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn(searchKey as string)
                ?.setFilterValue(event.target.value)
            }
            className="w-full md:max-w-sm"
          />
        )}
      </div>

      {isLoading ? (
        <div className="w-full">
          <SkeletonTable columnsCount={columns.length} rowsCount={8} />
        </div>
      ) : isMobile ? (
        <>
          <div className="overflow-x-auto">
            <Table className="relative">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Data Tidak Ditemukan
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div className="flex items-center justify-end space-x-2 py-1">
              <DataTablePagination table={table} />
            </div>
          </div>
        </>
      ) : (
        <>
          <ScrollArea className="h-[calc(100vh-200px)] rounded-md border md:h-[calc(80dvh-130px)]">
            <Table className="relative">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Data Tidak Ditemukan
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <div className="flex items-center justify-end space-x-2 py-1">
            <DataTablePagination table={table} />
          </div>
        </>
      )}
    </>
  );
}
