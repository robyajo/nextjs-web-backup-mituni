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
import FormCustomer from "./form/form-customer";
import { useCustomerData } from "./resource-api";

type Customer = {
  id: string | number;
  name: string;
  gender: string;
  phone_number: string;
  email: string;
  address: string;
  [key: string]: any; // For any additional properties
};

export default function ViewPageCustomer() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);

  const {
    data: apiResponse,
    isLoading: loadingInfo,
    error: errorInfo,
    refetch: refetchInfo,
  } = useCustomerData();

  const handleAdd = () => {
    setCurrentCustomer(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (customer: Customer) => {
    setCurrentCustomer(customer);
    setIsDialogOpen(true);
  };

  const handleSuccess = () => {
    setIsDialogOpen(false);
    setCurrentCustomer(null);
    refetchInfo();
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>
              {currentCustomer ? "Edit Pelanggan" : "Tambah Pelanggan Baru"}
            </DialogTitle>
            <DialogDescription>
              {currentCustomer
                ? "Ubah informasi pelanggan"
                : "Isi informasi pelanggan yang akan ditambahkan"}
            </DialogDescription>
          </DialogHeader>
          <FormCustomer
            refetch={refetchInfo}
            onSuccess={handleSuccess}
            initialData={currentCustomer || undefined}
            mode={currentCustomer ? "update" : "store"}
          />
        </DialogContent>
      </Dialog>

      <div className="space-y-6 lg:space-y-4">
        <div className="flex items-start justify-between">
          <HeadingAdmin
            title="Pelanggan"
            description="Data pelanggan yang telah dibuat."
          />
          <Button variant="default" onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Pelanggan Baru
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
          <DataTable<Customer, unknown>
            searchKey="name"
            labelSearch="Nama Pelanggan"
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
