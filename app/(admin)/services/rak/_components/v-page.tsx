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
import FormRak from "./form/form-rak";
import { useRakData } from "./resource-api";

type Rak = {
  id: string | number;
  rack_name: string;
  [key: string]: any; // For any additional properties
};

export default function ViewPageRak() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentRak, setCurrentRak] = useState<Rak | null>(null);

  const {
    data: apiResponse,
    isLoading: loadingInfo,
    error: errorInfo,
    refetch: refetchInfo,
  } = useRakData();

  const handleAdd = () => {
    setCurrentRak(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (rak: Rak) => {
    setCurrentRak(rak);
    setIsDialogOpen(true);
  };

  const handleSuccess = () => {
    setIsDialogOpen(false);
    setCurrentRak(null);
    refetchInfo();
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>
              {currentRak ? "Edit Rak" : "Tambah Rak Baru"}
            </DialogTitle>
            <DialogDescription>
              {currentRak
                ? "Ubah informasi rak"
                : "Isi informasi rak yang akan ditambahkan"}
            </DialogDescription>
          </DialogHeader>
          <FormRak
            refetch={refetchInfo}
            onSuccess={handleSuccess}
            initialData={currentRak || undefined}
            mode={currentRak ? "update" : "store"}
          />
        </DialogContent>
      </Dialog>

      <div className="space-y-6 lg:space-y-4">
        <div className="flex items-start justify-between">
          <HeadingAdmin title="Rak" description="Data rak yang telah dibuat." />
          <Button variant="default" onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Rak Baru
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
          <DataTable<Rak, unknown>
            searchKey="rack_name"
            labelSearch="Nama Rak"
            columns={columns}
            data={(apiResponse?.data ?? []).map((item: any) => ({
              ...item,
              onEdit: handleEdit,
            }))}
            isLoading={loadingInfo}
          />
        )}
      </div>
    </>
  );
}
