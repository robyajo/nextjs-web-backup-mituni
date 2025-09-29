"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useState } from "react";
import axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useQueryClient, InvalidateQueryFilters } from "@tanstack/react-query";
import AlertDelete from "@/components/modal/alert-delete";
import { useActiveOutlet } from "@/store/useOutletStore";

type Customer = {
  id: string | number;
  name: string;
  gender: string;
  phone_number: string;
  email: string;
  address: string;
  [key: string]: any;
};

interface CellComponentProps<TData> {
  row: Row<TData>;
  onEdit?: (data: TData) => void;
}

export function CellComponent<TData extends Customer>({
  row,
  onEdit,
}: CellComponentProps<TData>) {
  const [isDialogOpenDelete, setIsDialogOpenDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { outlet_id_active } = useActiveOutlet();

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onEdit) {
      onEdit(row.original);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDialogOpenDelete(true);
  };

  const handleDelete = async () => {
    if (!session?.accessToken) return;

    setIsDeleting(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/customers/delete`,
        {
          id: row.original.id,
          branch_id: outlet_id_active,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            "x-mituni-key": process.env.NEXT_PUBLIC_MITUNI_API_KEY,
          },
        }
      );

      toast.success(" Pelanggan berhasil dihapus");
      queryClient.invalidateQueries(["customers"] as InvalidateQueryFilters);
    } catch (error) {
      // console.error("Error deleting rack:", error);
      toast.error("Gagal menghapus pelanggan");
    } finally {
      setIsDeleting(false);
      setIsDialogOpenDelete(false);
    }
  };

  return (
    <div className="flex justify-end">
      <TooltipProvider>
        <DropdownMenu>
          <Tooltip>
            <DropdownMenuTrigger asChild>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Menu aksi</span>
                </Button>
              </TooltipTrigger>
            </DropdownMenuTrigger>
            <TooltipContent side="left">
              <p>Menu Aksi</p>
            </TooltipContent>
          </Tooltip>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={handleEditClick}
              className="cursor-pointer"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDeleteClick}
              className="cursor-pointer"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TooltipProvider>

      <AlertDelete
        isOpen={isDialogOpenDelete}
        onOpenChange={setIsDialogOpenDelete}
        data={row.original}
        isDeleting={isDeleting}
        handleDelete={handleDelete}
        title={`Data Pelanggan ${row.original.name}`}
      />
    </div>
  );
}

// Mendefinisikan kolom-kolom tabel
export const columns: ColumnDef<Customer>[] = [
  {
    id: "no_urut",
    header: "No",
    cell: ({ row }) => {
      return <div className="text-start">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Pelanggan" />
    ),
  },
  {
    accessorKey: "gender",
    header: "Jenis Kelamin",
  },
  {
    accessorKey: "phone_number",
    header: "No. Telepon",
    cell: ({ row }) => {
      const phoneNumber = row.getValue("phone_number") as string;
      if (!phoneNumber) return null;

      // Remove any non-digit characters and leading 62 if present
      const cleanNumber = phoneNumber.replace(/\D/g, "").replace(/^62/, "");

      let formattedNumber = "";

      // Format based on number length
      if (cleanNumber.startsWith("8")) {
        // For numbers starting with 8 (after removing 62)
        if (cleanNumber.length === 11) {
          // Format: 812-3456-7890 for 11 digits
          formattedNumber = cleanNumber.replace(
            /(\d{3})(\d{4})(\d{4})/,
            "$1-$2-$3"
          );
        } else if (cleanNumber.length === 12) {
          // Format: 821-2345-6789 for 12 digits
          formattedNumber = cleanNumber.replace(
            /(\d{3})(\d{5})(\d{4})/,
            "$1-$2-$3"
          );
        } else {
          // Fallback for other lengths
          formattedNumber = cleanNumber;
        }
      } else {
        // For other numbers, use general formatting
        formattedNumber = cleanNumber.replace(
          /(\d{3})(\d{4})(\d{4,})/,
          "$1-$2-$3"
        );
      }

      return <div>{`+62 ${formattedNumber}`}</div>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "address",
    header: "Alamat",
    cell: ({ row }) => {
      const address = row.getValue("address") as string;
      if (!address) return null;

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap cursor-default">
                {address}
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-[300px] break-words">
              <p>{address}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <CellComponent row={row} onEdit={(rak) => row.original.onEdit?.(rak)} />
    ),
  },
];
