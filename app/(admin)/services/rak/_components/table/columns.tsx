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

import { useState } from "react";
import axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useQueryClient, InvalidateQueryFilters } from "@tanstack/react-query";
import AlertDelete from "@/components/modal/alert-delete";
import { useActiveOutlet } from "@/store/useOutletStore";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Rak = {
  id: string | number;
  rack_name: string;
  [key: string]: any;
};

interface CellComponentProps<TData> {
  row: Row<TData>;
  onEdit?: (data: TData) => void;
}

export function CellComponent<TData extends Rak>({
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/rack/delete`,
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

      toast.success("Rak berhasil dihapus");
      queryClient.invalidateQueries(["racks"] as InvalidateQueryFilters);
    } catch (error) {
      // console.error("Error deleting rack:", error);
      toast.error("Gagal menghapus rak");
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
        title={`Data Rak ${row.original.rack_name}`}
      />
    </div>
  );
}

// Mendefinisikan kolom-kolom tabel
export const columns: ColumnDef<Rak>[] = [
  {
    id: "no_urut",
    header: "No",
    cell: ({ row }) => {
      return <div className="text-start">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "rack_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Rak" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <CellComponent row={row} onEdit={(rak) => row.original.onEdit?.(rak)} />
    ),
  },
];
