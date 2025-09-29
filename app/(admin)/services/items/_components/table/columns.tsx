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
import Image from "next/image";
import { formatCurrencyIDR } from "@/lib/formatCurrency";
import { toast } from "sonner";
import axios from "@/lib/axios";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import AlertDelete from "@/components/modal/alert-delete";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormServices from "../form/form-services";
import { useActiveOutlet } from "@/store/useOutletStore";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Service {
  id: string | number;
  name: string;
  unit: string;
  price: number;
  description: string;
  icon: string;
  [key: string]: any;
}

interface CellComponentProps<TData> {
  row: Row<TData>;
  onEdit?: (data: TData) => void;
  onSuccess?: () => void;
  initialData?: TData;
  id?: string | number;
}
export const CellComponent = ({ row }: CellComponentProps<Service>) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpenDelete, setIsDialogOpenDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { outlet_id_active } = useActiveOutlet();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const MITUNI_API_KEY = process.env.NEXT_PUBLIC_MITUNI_API_KEY;

  const handleEditClick = () => {
    setIsDialogOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDialogOpenDelete(true);
  };

  const handleDelete = async (service: Service) => {
    setIsDeleting(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/services/delete`,
        {
          branch_id: outlet_id_active,
          id: service.id,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-mituni-key": MITUNI_API_KEY,
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Berhasil", {
          description: response.data.message,
        });
        setIsDialogOpenDelete(false); // Tutup dialog setelah berhasil

        queryClient.invalidateQueries({ queryKey: ["services"] });
      } else {
        throw new Error(response.data.message || "Gagal menghapus data");
      }
    } catch (error: any) {
      // console.error("Error deleting service:", error);
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

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Edit Layanan</DialogTitle>
            <DialogDescription>
              Isi informasi layanan yang akan diupdate
            </DialogDescription>
          </DialogHeader>
          <FormServices
            refetch={() => {}}
            onSuccess={() => {
              setIsDialogOpen(false);
            }}
            initialData={row.original}
            mode="update"
            id={row.original.id}
          />
        </DialogContent>
      </Dialog>
      <AlertDelete
        isOpen={isDialogOpenDelete}
        onOpenChange={setIsDialogOpenDelete}
        data={row.original}
        isDeleting={isDeleting}
        handleDelete={handleDelete}
        title={`Data Layanan ${row.original.name_service}`}
      />
      <div className="flex float-right px-4 ">
        <TooltipProvider>
          <DropdownMenu>
            <Tooltip>
              <DropdownMenuTrigger asChild>
                <TooltipTrigger asChild>
                  <Button variant="reverse" size="icon" className="h-8 w-8">
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
      </div>
    </>
  );
};

// Mendefinisikan kolom-kolom tabel
export const columns: ColumnDef<any>[] = [
  {
    id: "no_urut",
    header: "No",
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "icon_url",
    header: "Icon",
    cell: ({ row }) => (
      <div className="text-start ">
        <Image
          width={32}
          height={32}
          src={row.original.icon_url}
          alt={row.original.name}
          className="w-12 h-12 object-contain rounded"
          loading="lazy"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Nama Layanan" />;
    },
  },
  {
    accessorKey: "price",
    header: "Harga",
    cell: ({ row }) => {
      return formatCurrencyIDR(row.original.price);
    },
  },

  {
    accessorKey: "description",
    header: "Deskripsi",
    cell: ({ row }) => {
      return row.original.description;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellComponent row={row} />,
  },
];
