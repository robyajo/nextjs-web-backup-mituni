"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Button, buttonVariants } from "@/components/ui/button";
import { BadgeCheck, Eye, Trash } from "lucide-react";

import { useState } from "react";
import axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useQueryClient, InvalidateQueryFilters } from "@tanstack/react-query";
import AlertDelete from "@/components/modal/alert-delete";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { TransaksiType } from "@/types";

interface CellComponentProps<TData> {
  row: Row<TData>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const apiUrl = `${API_URL}`;

export function CellComponent<TData extends TransaksiType>({
  row,
}: CellComponentProps<TData>) {
  const [isDialogOpenDelete, setIsDialogOpenDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();
  // useEffect(() => {
  //   console.log("row", row);
  // }, [row]);
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDialogOpenDelete(true);
  };

  const handleDelete = async () => {
    if (!session?.accessToken) return;

    setIsDeleting(true);
    try {
      await axios.post(
        `${apiUrl}/api/${session?.user?.role}/deleteBalita`,
        {
          balita_id: row.original.id,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );

      toast.success("Balita berhasil dihapus");
      queryClient.invalidateQueries(["data-balita"] as InvalidateQueryFilters);
    } catch (error) {
      // console.error("Error deleting rack:", error);
      toast.error("Gagal menghapus balita");
    } finally {
      setIsDeleting(false);
      setIsDialogOpenDelete(false);
    }
  };

  return (
    <div className="flex justify-end">
      {session?.user?.role === "kader" || session?.user?.role === "pimpinan" ? (
        <>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`/pendataan/balita/${btoa(
                    row.original.id.toString()
                  )}/${row.original.nama_anak
                    ?.toLowerCase()
                    .replace(/[,]+/g, "")
                    .replace(/\s+/g, "-")}`}
                  className={cn(
                    buttonVariants({ variant: "neutral", size: "sm" }),
                    " sm:w-auto"
                  )}
                  onClick={() =>
                    router.push(
                      `/pendataan/balita/${btoa(
                        row.original.id.toString()
                      )}/${row.original.nama_anak
                        ?.toLowerCase()
                        .replace(/[,]+/g, "")
                        .replace(/\s+/g, "-")}`
                    )
                  }
                >
                  <Eye className="h-2 w-2" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Detail</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      ) : (
        <>
          <div className="flex justify-end gap-2">
            <Link
              href={`/pendataan/balita/${btoa(
                row.original.id.toString()
              )}/${row.original.nama_anak
                ?.toLowerCase()
                .replace(/[,]+/g, "")
                .replace(/\s+/g, "-")}`}
              className={cn(buttonVariants({ size: "icon" }))}
            >
              <Eye className="h-2 w-2" />
            </Link>

            <Button variant="neutral" size="icon" onClick={handleDeleteClick}>
              <Trash className="h-2 w-2" />
            </Button>
          </div>
        </>
      )}

      <AlertDelete
        isOpen={isDialogOpenDelete}
        onOpenChange={setIsDialogOpenDelete}
        data={row.original}
        isDeleting={isDeleting}
        handleDelete={handleDelete}
        title={`Data Balita ${row.original.nama_anak}`}
      />
    </div>
  );
}

// Mendefinisikan kolom-kolom tabel
export const columns: ColumnDef<TransaksiType>[] = [
  {
    accessorKey: "invoice_code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kode Invoice" />
    ),
    size: 180,
    cell: ({ row }) => (
      <div className="text-start px-2">{`${row.original.invoice_code}`}</div>
    ),
    meta: {
      title: "Kode Invoice",
    },
  },

  {
    accessorKey: "customer_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Customer" />
    ),
    size: 180,
    cell: ({ row }) => (
      <div className="text-start px-2">{`${row.original.customer_name}`}</div>
    ),
    meta: {
      title: "Nama Customer",
    },
  },

  {
    accessorKey: "customer_phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nomor Telepon" />
    ),
    size: 180,
    cell: ({ row }) => (
      <div className="text-start px-2">{`${row.original.customer_phone}`}</div>
    ),
    meta: {
      title: "Nomor Telepon",
    },
  },

  {
    accessorKey: "total_price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Harga" />
    ),
    size: 180,
    cell: ({ row }) => (
      <div className="text-start px-2">{`${row.original.total_price}`}</div>
    ),
    meta: {
      title: "Total Harga",
    },
  },

  {
    accessorKey: "diskon_total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Diskon Total" />
    ),
    size: 180,
    cell: ({ row }) => (
      <div className="text-start px-2">{`${row.original.diskon_total}`}</div>
    ),
    meta: {
      title: "Diskon Total",
    },
  },

  {
    accessorKey: "grand_total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Grand Total" />
    ),
    size: 180,
    cell: ({ row }) => (
      <div className="text-start px-2">{`${row.original.grand_total}`}</div>
    ),
    meta: {
      title: "Grand Total",
    },
  },

  {
    accessorKey: "paid_amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jumlah Bayar" />
    ),
    size: 180,
    cell: ({ row }) => (
      <div className="text-start px-2">{`${row.original.paid_amount}`}</div>
    ),
    meta: {
      title: "Jumlah Bayar",
    },
  },

  {
    accessorKey: "status_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    size: 120,
    cell: ({ row }) => (
      <div className="text-center">
        <div className="">
          <div className="flex gap-2">
            <Badge variant="default" className={`text-xs px-1.5 py-0.5`}>
              <p>{row.original?.status_name || "-"}</p>
            </Badge>
          </div>
        </div>
      </div>
    ),
    meta: {
      title: "Status",
    },
  },

  {
    id: "actions",
    header: ({ column }: { column: ColumnDef<TransaksiType, unknown> }) => (
      <div className="text-start">Aksi</div>
    ),
    size: 70,
    enableColumnFilter: false, // Disable filtering for this column
    cell: ({ row }: { row: Row<TransaksiType> }) => (
      <div className="flex items-center justify-center">
        <CellComponent row={row} />
      </div>
    ),
    meta: {
      title: "Aksi",
    },
  },
];
