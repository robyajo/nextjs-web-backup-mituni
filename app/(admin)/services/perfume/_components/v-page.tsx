"use client";
import React, { useState } from "react";
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
import FormServices from "./form/form-perfume";
import { usePerfumeData } from "./resource-api";

type Perfume = {
  id: string | number;
  name_perfume: string;
  [key: string]: any; // For any additional properties
};

export default function ViewPagePerfume() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPerfume, setCurrentPerfume] = useState<Perfume | null>(null);

  const {
    data: apiResponse,
    isLoading: loadingInfo,
    error: errorInfo,
    refetch: refetchInfo,
  } = usePerfumeData();

  const handleAdd = () => {
    setCurrentPerfume(null);
    setIsDialogOpen(true);
  };

  const handleSuccess = () => {
    setIsDialogOpen(false);
    setCurrentPerfume(null);
    refetchInfo();
  };

  const handleEdit = (perfume: Perfume) => {
    setCurrentPerfume(perfume);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>
              {currentPerfume ? "Edit Parfum" : "Tambah Parfum Baru"}
            </DialogTitle>
            <DialogDescription>
              {currentPerfume
                ? "Ubah informasi parfum"
                : "Isi informasi parfum yang akan ditambahkan"}
            </DialogDescription>
          </DialogHeader>
          <FormServices
            refetch={refetchInfo}
            onSuccess={handleSuccess}
            initialData={currentPerfume || undefined}
            mode={currentPerfume ? "update" : "store"}
          />
        </DialogContent>
      </Dialog>

      <div className="space-y-6 lg:space-y-4">
        <div className="flex items-start justify-between">
          <HeadingAdmin
            title="Perfume"
            description="Data parfum yang telah dibuat."
          />
          <Button variant="default" onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Parfum Baru
          </Button>
        </div>
        {errorInfo ? (
          <Alert variant="destructive">
            <AlertCircleIcon className="h-4 w-4" />
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
          <DataTable<Perfume, unknown>
            searchKey="name_perfume"
            labelSearch="Nama Parfum"
            columns={columns}
            data={(apiResponse?.data ?? []).map((item: any) => ({
              ...item,
              onEdit: handleEdit,
            }))}
            isLoading={loadingInfo}
            onEdit={handleEdit}
          />
        )}
      </div>
    </>
  );
}
