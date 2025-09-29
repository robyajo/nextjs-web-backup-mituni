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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormPerfume from "../form/form-perfume";
import axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import AlertDelete from "@/components/modal/alert-delete";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Perfume = {
  id: string | number;
  name_perfume: string;
  [key: string]: any;
};

interface CellComponentProps<TData> {
  row: Row<TData>;
  onEdit?: (data: TData) => void;
}

export function CellComponent<TData extends Perfume>(
  props: CellComponentProps<TData>
) {
  const { row, onEdit } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpenDelete, setIsDialogOpenDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const handleEdit = () => {
    if (onEdit) {
      onEdit(row.original);
      setIsDialogOpen(true);
    }
  };

  const handleDeleteClick = () => {
    setIsDialogOpenDelete(true);
  };

  const handleDelete = async (perfume: Perfume) => {
    setIsDeleting(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/perfume/delete`,
        {
          branch_id: session?.data?.outlet_id_active,
          id: perfume.id,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-mituni-key": process.env.NEXT_PUBLIC_MITUNI_API_KEY,
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Berhasil", {
          description: response.data.message,
        });
        setIsDialogOpenDelete(false); // Tutup dialog setelah berhasil

        queryClient.invalidateQueries({ queryKey: ["perfume"] });
      } else {
        throw new Error(response.data.message || "Gagal menghapus data");
      }
    } catch (error: any) {
      console.error("Error deleting perfume:", error);
      toast.error("Gagal", {
        description:
          error.response?.data?.message ||
          "Terjadi kesalahan saat menghapus data",
      });
    } finally {
      setIsDeleting(false); // Reset loading state di finally
    }
  };
  // If there's no onEdit handler, render only the dropdown menu
  if (!onEdit) {
    return (
      <div className="flex float-right px-4">
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
              <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
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
      </div>
    );
  }

  return (
    <>
      {/* <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Edit Parfum</DialogTitle>
            <DialogDescription>
              Isi informasi parfum yang akan diupdate
            </DialogDescription>
          </DialogHeader>
          <FormPerfume
            refetch={() => {}}
            onSuccess={() => {
              setIsDialogOpen(false);
            }}
            initialData={row.original}
            mode="update"
          />
        </DialogContent>
      </Dialog> */}

      <AlertDelete
        isOpen={isDialogOpenDelete}
        onOpenChange={setIsDialogOpenDelete}
        data={row.original}
        isDeleting={isDeleting}
        handleDelete={handleDelete}
        title={`Data Parfum ${row.original.name_perfume}`}
      />

      <div className="flex float-right px-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDeleteClick}>
              <Trash className="mr-2 h-4 w-4" />
              Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}

// Mendefinisikan kolom-kolom tabel
export const columns: ColumnDef<Perfume>[] = [
  {
    id: "no_urut",
    header: "No",
    cell: ({ row }) => {
      return <div className="text-start">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "name_perfume",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Parfum" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellComponent row={row} onEdit={row.original.onEdit} />,
  },
];
