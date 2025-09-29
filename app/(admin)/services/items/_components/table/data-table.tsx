"use client";

import { Suspense, useEffect, useMemo, useState } from "react";

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

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "react-responsive";
import { DataTablePagination } from "./data-table-pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { CheckIcon, Download, DownloadIcon, ListFilter } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import axios from "@/lib/axios";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  labelSearch?: string;
  token?: string;
  urlFilter?: string;
  isLoading?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  labelSearch,
  token,
  urlFilter,
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const isMobile = useMediaQuery({ maxWidth: 768 });
  // Hapus state lokal isLoading
  const [loading, setLoading] = useState(true);

  const [serviceData, setServiceData] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [yearFilter, setYearFilter] = useState<string>("");
  const [monthFilter, setMonthFilter] = useState<string>("");

  useEffect(() => {
    applyDateFilter();
  }, [yearFilter, monthFilter]);

  const applyDateFilter = () => {
    let filterValue = "";
    if (yearFilter) {
      filterValue += yearFilter;
    }
    if (monthFilter) {
      filterValue += `-${monthFilter}`;
    }
  };

  // console.log(data)

  const resetFilters = () => {
    table.getColumn("service_id")?.setFilterValue("");
    table.getColumn("status_proses")?.setFilterValue("");
    setYearFilter("");
    setMonthFilter("");
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility: {
        opd_id: false,
        service_id: false,
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleOpenSheet = () => {
    setOpenModal(true);
  };
  // const layan = serviceData.filter((res) => res.name === table.getColumn('service_id')?.getFilterValue() as string);
  const handleFilterRekap = async () => {
    const tahun = yearFilter;
    const bulan = monthFilter;
    const status = table.getColumn("status_proses")?.getFilterValue() as string;
    const layanan = table.getColumn("service_id")?.getFilterValue() as string;

    const data = {
      tahun,
      bulan,
      status,
      layanan,
    };

    try {
      const response = await axios({
        method: "post",
        url: urlFilter,
        data: data,
        responseType: "blob", // Important: This tells axios to treat the response as binary data
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Create a blob from the response data
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      // Create a link element and trigger the download
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download =
        getFilenameFromContentDisposition(
          response.headers["content-disposition"]
        ) || `rekap_permohonan_${data.tahun}_${data.bulan}.xlsx`;
      link.click();

      toast.success("File downloaded successfully", {
        duration: 3000,
        position: "top-right",
      });
    } catch (error: any) {
      console.error("Download error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to download file. Please try again.";
      toast.error(errorMessage, {
        duration: 3000,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper function to extract filename from Content-Disposition header
  function getFilenameFromContentDisposition(
    contentDisposition: string | undefined
  ) {
    if (!contentDisposition) return null;
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(contentDisposition);
    if (matches != null && matches[1]) {
      return matches[1].replace(/['"]/g, "");
    }
    return null;
  }
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

        {urlFilter && (
          <Sheet open={openModal} onOpenChange={setOpenModal}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="w-full lg:w-[240px] ml-auto"
                onClick={handleOpenSheet}
              >
                <ListFilter className="mr-2 h-4 w-4" /> Filter Pencarian dan
                Rekap
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Pencarian</SheetTitle>
                <SheetDescription>
                  Pilih filter pencarian yang ingin Anda gunakan
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <Separator />

                <div className="grid grid-cols-1 items-center gap-4">
                  <Select
                    value={
                      (table
                        .getColumn(searchKey as string)
                        ?.getFilterValue() as string) ?? "all"
                    }
                    onValueChange={(value) => {
                      if (value === "all") {
                        table
                          .getColumn(searchKey as string)
                          ?.setFilterValue(undefined);
                      } else {
                        table
                          .getColumn(searchKey as string)
                          ?.setFilterValue(value);
                      }
                    }}
                  >
                    <SelectTrigger className="col-span-4">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all">Plih Status</SelectItem>
                        <SelectItem value="daftar">Daftar</SelectItem>
                        <SelectItem value="terima">Terima</SelectItem>
                        <SelectItem value="konsultasi">Konsultasi</SelectItem>
                        <SelectItem value="tertunda">Tertunda</SelectItem>
                        <SelectItem value="selesai">Selesai</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Select
                    value={
                      (table
                        .getColumn(searchKey as string)
                        ?.getFilterValue() as string) ?? "all"
                    }
                    onValueChange={(value) => {
                      if (value === "all") {
                        table
                          .getColumn(searchKey as string)
                          ?.setFilterValue(undefined);
                      } else {
                        table
                          .getColumn(searchKey as string)
                          ?.setFilterValue(value);
                      }
                    }}
                  >
                    <SelectTrigger className="col-span-4">
                      <SelectValue placeholder="Pilih layanan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all">Plih Layanan</SelectItem>
                        {serviceData.map((service, index) => (
                          <div key={index}>
                            <SelectItem value={service.id.toString()}>
                              {service.name}
                            </SelectItem>
                          </div>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 items-center gap-4">
                  <Input
                    placeholder={`Tahun`}
                    value={yearFilter}
                    onChange={(event) => setYearFilter(event.target.value)}
                    className="w-full md:max-w-sm"
                  />
                </div>
                <div className="grid grid-cols-1 items-center gap-4">
                  <Select
                    value={monthFilter}
                    onValueChange={(value) => {
                      if (value === "all") {
                        setMonthFilter("");
                      } else {
                        setMonthFilter(value);
                      }
                    }}
                  >
                    <SelectTrigger className="col-span-4">
                      <SelectValue placeholder="Pilih Bulan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all">Plih Bulan</SelectItem>
                        <SelectItem value="01">Januari</SelectItem>
                        <SelectItem value="02">Februari</SelectItem>
                        <SelectItem value="03">Maret</SelectItem>
                        <SelectItem value="04">April</SelectItem>
                        <SelectItem value="05">Mei</SelectItem>
                        <SelectItem value="06">Juni</SelectItem>
                        <SelectItem value="07">Juli</SelectItem>
                        <SelectItem value="08">Agustus</SelectItem>
                        <SelectItem value="09">September</SelectItem>
                        <SelectItem value="10">Oktober</SelectItem>
                        <SelectItem value="11">November</SelectItem>
                        <SelectItem value="12">Desember</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 items-center gap-4">
                  <Button
                    onClick={resetFilters}
                    className="w-full "
                    variant="outline"
                  >
                    Reset
                  </Button>
                  <Button
                    onClick={handleFilterRekap}
                    disabled={!yearFilter}
                    className="w-full "
                    variant="outline"
                  >
                    <DownloadIcon className="mr-2 h-4 w-4" /> Export
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
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
