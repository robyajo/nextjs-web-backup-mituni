"use client";
import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { DataTable } from "./table/data-table";
import { columns } from "./table/columns";
import { HeadingAdmin } from "../../../_components/patrials/heading-admin";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormServices from "./form/form-services";
import { useActiveOutlet } from "@/store/useOutletStore";

// Pastikan variabel ENV sudah di-setup di .env.local
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const MITUNI_API_KEY = process.env.NEXT_PUBLIC_MITUNI_API_KEY;

export default function ViewPageServices() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [currentService, setCurrentService] = React.useState<any>(null);
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { outlet_id_active } = useActiveOutlet();
  const apiUrl = `${API_URL}/api/services`;
  const {
    data: apiResponse,
    isLoading: loadingInfo,
    error: errorInfo,
    isFetching: isFetchingInfo,
    refetch: refetchInfo,
  } = useQuery<any>({
    queryKey: ["services", outlet_id_active], // Add outlet_id_active to queryKey
    queryFn: async () => {
      if (!outlet_id_active) return null; // Early return if no outlet_id_active
      const response = await axios.post(
        apiUrl,
        {
          branch_id: outlet_id_active,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-mituni-key": `${MITUNI_API_KEY}`,
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      return response.data;
    },
    enabled: !!session?.accessToken && !!outlet_id_active,
    refetchOnWindowFocus: false, // Prevent refetch on window focus
    staleTime: 1000 * 60 * 5, // 5 minutes before data is considered stale
    retry: 1, // Retry once if the request fails
  });

  // Refetch data when outlet_id_active changes
  React.useEffect(() => {
    if (outlet_id_active) {
      refetchInfo();
    }
  }, [outlet_id_active, refetchInfo]);

  const handleEdit = (service: any) => {
    setCurrentService(service);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Tambah Layanan Baru</DialogTitle>
            <DialogDescription>
              Isi informasi layanan laundry yang akan ditambahkan
            </DialogDescription>
          </DialogHeader>
          <FormServices
            refetch={() => refetchInfo()}
            onSuccess={() => {
              setIsDialogOpen(false);
            }}
            mode="store"
          />
        </DialogContent>
      </Dialog>

      <div className="space-y-6 lg:space-y-4">
        <div className="flex items-start justify-between">
          <HeadingAdmin
            title={`Layana`}
            description="Data layan yang telah dibuat."
          />
          <Button
            variant="default"
            onClick={() => {
              setCurrentService(null);
              setIsDialogOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Tambah Layanan Baru
          </Button>
        </div>
        {errorInfo ? (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Oops! Terjadi Error!</AlertTitle>
            <AlertDescription>
              <p>
                {typeof errorInfo === "string"
                  ? errorInfo
                  : errorInfo &&
                    typeof errorInfo === "object" &&
                    "response" in errorInfo &&
                    errorInfo.response &&
                    (errorInfo.response as any).data?.message
                  ? (errorInfo as any).response.data?.message
                  : errorInfo?.message || "Gagal memuat data dari API."}
              </p>
            </AlertDescription>
          </Alert>
        ) : (
          <DataTable
            searchKey="name"
            labelSearch="Nama Layanan"
            columns={columns}
            data={
              apiResponse?.data?.map((item: any) => ({
                ...item,
                onEdit: handleEdit,
              })) ?? []
            }
            isLoading={loadingInfo}
          />
        )}
      </div>
    </>
  );
}
