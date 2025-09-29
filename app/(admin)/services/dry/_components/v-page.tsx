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
import { useDryData } from "./resource-api";

type Dry = {
  id: string | number;
  name_item: string;
  [key: string]: any; // For any additional properties
};

export default function ViewPageDry() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDry, setCurrentDry] = useState<Dry | null>(null);

  const {
    data: apiResponse,
    isLoading: loadingInfo,
    error: errorInfo,
    refetch: refetchInfo,
  } = useDryData();

  const handleAdd = () => {
    setCurrentDry(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (dry: Dry) => {
    setCurrentDry(dry);
    setIsDialogOpen(true);
  };

  const handleSuccess = () => {
    setIsDialogOpen(false);
    setCurrentDry(null);
    refetchInfo();
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>
              {currentDry ? "Edit Dry" : "Tambah Dry Baru"}
            </DialogTitle>
            <DialogDescription>
              {currentDry
                ? "Ubah informasi dry"
                : "Isi informasi dry yang akan ditambahkan"}
            </DialogDescription>
          </DialogHeader>
          <FormRak
            refetch={refetchInfo}
            onSuccess={handleSuccess}
            initialData={currentDry || undefined}
            mode={currentDry ? "update" : "store"}
          />
        </DialogContent>
      </Dialog>

      <div className="space-y-6 lg:space-y-4">
        <div className="flex items-start justify-between">
          <HeadingAdmin title="Dry" description="Data dry yang telah dibuat." />
          <Button variant="default" onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Dry Baru
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
          <DataTable<Dry, unknown>
            searchKey="name_item"
            labelSearch="Nama Dry"
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
