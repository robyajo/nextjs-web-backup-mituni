"use client";

import { Table } from "@tanstack/react-table";
import { Settings2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";

interface DataTableToolbarProps<TData, TValue> {
  table: Table<TData>;
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  onFilter?: (filters: {
    nik: string;
    nama_anak: string;
    id_kec: number;
    id_kel: number;
    id_posyandu: number;
  }) => void;
}
export function DataTableToolbar<TData, TValue>({
  table,
  data,
  columns,
  onFilter,
}: DataTableToolbarProps<TData, TValue>) {
  // Remove unused isFiltered since we're handling filters differently

  return (
    <div className="flex  gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="noShadow"
            size="default"
            className="ml-auto hidden lg:flex"
          >
            <Settings2 className="mr-2 h-4 w-4" />
            Lihat Kolom
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px]">
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" && column.getCanHide()
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id.replace(/_/g, " ")}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <FilterTable data={data} columns={columns} onFilter={onFilter} /> */}
    </div>
  );
}
