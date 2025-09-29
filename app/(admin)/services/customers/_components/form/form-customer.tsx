"use client";
import React, { useState } from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PhoneInput from "@/components/form/input-phone";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SchemaCustomer, schemaCustomer } from "../schema/schema-customer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, Loader2 } from "lucide-react";
import DebugForm from "@/components/debug-form";

import { useActiveOutlet } from "@/store/useOutletStore";
import { Textarea } from "@/components/ui/textarea";

interface FormRakProps {
  refetch: () => void;
  initialData?: Partial<any>;
  mode: "store" | "update";
  onSuccess?: () => void;
}

export default function FormCustomer({
  refetch,
  initialData,
  mode,
  onSuccess,
}: FormRakProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const MITUNI_API_KEY = process.env.NEXT_PUBLIC_MITUNI_API_KEY;
  const { data: session } = useSession();
  const { outlet_id_active } = useActiveOutlet();

  const form = useForm<SchemaCustomer & { id?: string | number }>({
    resolver: zodResolver(schemaCustomer),
    defaultValues: {
      name: initialData?.name ?? "",
      id: initialData?.id ?? undefined,
      phone_number: initialData?.phone_number ?? "",
      email: initialData?.email ?? "",
      address: initialData?.address ?? "",
      gender: initialData?.gender ?? "",
    },
  });

  // Reset form when initialData changes (for edit mode)
  React.useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);
  const onSubmit = async (data: SchemaCustomer & { id?: string | number }) => {
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("id", String(initialData?.id || ""));
      formData.append("name", data.name.trim());
      formData.append("gender", data.gender || "");
      formData.append("phone_number", data.phone_number || "");
      formData.append("email", data.email || "");
      formData.append("address", data.address || "");
      // Always include id in the request data, but only if it exists
      if (data.id) {
        formData.append("id", String(data.id));
      }
      if (outlet_id_active) {
        formData.append("branch_id", String(outlet_id_active));
      }

      const result = await axios.post(
        `${API_URL}/api/customers/${mode === "update" ? "update" : "store"}`,
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-mituni-key": `${MITUNI_API_KEY}`,
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      if (result?.data?.success === false) {
        // Ambil error detail dari API
        let apiError =
          result.data.errors || result.data.message || "Validasi gagal";
        if (typeof apiError === "object") {
          // Jika errors bentuk object (misal Laravel)
          apiError = Object.values(apiError).flat().join(" ");
        }
        toast.error(apiError);
        setError(apiError);
      } else {
        toast.success(
          mode === "update"
            ? "Data pelanggan berhasil diupdate"
            : "Data pelanggan berhasil disimpan"
        );
        refetch();
        if (onSuccess) onSuccess();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.errors || "Terjadi kesalahan");
      setError(error.response?.data?.errors || "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Terjadi kesalahan.</AlertTitle>
            <AlertDescription>
              <p>{error}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>
                    Nama Pelanggan <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan nama pelanggan"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-1">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>
                    Jenis Kelamin{" "}
                    <span className="text-muted-foreground text-xs">
                      (opsional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ?? undefined}
                      onValueChange={(value) => {
                        console.log("Gender selected:", value);
                        field.onChange(value || "");
                        setError(null); // Clear error on change
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih jenis kelamin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="L">Laki-laki</SelectItem>
                        <SelectItem value="P">Perempuan</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1">
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>
                    No. Telepon{" "}
                    <span className="text-muted-foreground text-xs">
                      (opsional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <PhoneInput
                      placeholder=" Masukkan no. telepon"
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-1">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>
                    Email{" "}
                    <span className="text-muted-foreground text-xs">
                      (opsional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Masukkan email"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="col-span-1">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>
                    Alamat{" "}
                    <span className="text-muted-foreground text-xs">
                      (opsional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Masukkan alamat"
                      rows={4}
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* <DebugForm
          form={form}
          mode={mode}
          extraInfo={{
            branch_id: session?.data?.outlet_id_active,
            isSubmitting: isLoading,
            isValid: form.formState.isValid,
            errors: form.formState.errors,
          }}
        /> */}
        <DialogFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            )}
            {!isLoading && (mode === "update" ? "Update" : "Simpan")}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
