"use client";
import React, { useState } from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaServices } from "../schema/schema-services";
import { toast } from "sonner";
import axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, Loader2, Loader2Icon } from "lucide-react";
import FileUploadWithPreview from "@/components/form/file-upload-with-preview";
import { useQueryClient } from "@tanstack/react-query";
import { useServicesUnitData } from "../resource-api";
import { DebugForm } from "@/components/debug-form";
import { CurrencyInput } from "@/components/form/input-currency";
import { useActiveOutlet } from "@/store/useOutletStore";

interface FormServicesProps {
  refetch: () => void;
  id?: string | number | null;
  initialData?: any;
  onSuccess?: () => void;
  mode: "store" | "update";
}

export default function FormServices({
  refetch,
  id,
  initialData,
  onSuccess,
  mode,
}: FormServicesProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<any>("");
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const MITUNI_API_KEY = process.env.NEXT_PUBLIC_MITUNI_API_KEY;
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { outlet_id_active } = useActiveOutlet();

  type FormValues = {
    id: string;
    name: string;
    unit: string;
    price: number;
    description?: string;
    icon?: string;
  };

  // Initialize the form with proper types
  const form = useForm<FormValues>({
    resolver: zodResolver(schemaServices as any), // Type assertion to handle the schema type
    defaultValues: {
      id: initialData?.id || "",
      name: initialData?.name || "",
      unit: initialData?.unit_id ? String(initialData.unit_id) : "",
      price: initialData?.price || 0,
      description: initialData?.description || "",
      icon: "",
    },
  });

  const { data: apiResponseUnit } = useServicesUnitData();
  // console.log("initialData", initialData);
  // Handle form submission with proper typing
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setError(null);

    if (!API_URL || !MITUNI_API_KEY) {
      toast.error("API environment variable tidak tersedia");
      setError("Konfigurasi API tidak lengkap");
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("id", initialData?.id || "");
      // Append all fields to FormData
      formData.append("name", data.name.trim());
      formData.append("unit", data.unit);
      // Ensure price is sent as a number
      formData.append("price", String(Number(data.price) || 0));
      if (data.description) {
        formData.append("description", data.description.trim());
      }
      if (iconFile) {
        formData.append("icon", iconFile);
      }
      if (outlet_id_active) {
        formData.append("branch_id", String(outlet_id_active));
      }

      const result = await axios.post(
        `${API_URL}/api/services/${mode === "store" ? "store" : "update"}`,
        formData,
        {
          headers: {
            Accept: "application/json",
            "x-mituni-key": MITUNI_API_KEY,
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${session?.accessToken}`,
            // Let the browser set the Content-Type with the correct boundary
          },
        }
      );

      if (result?.data?.success === false) {
        toast.error(result.data.message || "Gagal menyimpan data");
        setError(result.data.message || "Gagal menyimpan data");
      } else {
        toast.success(result.data.message);
        // refetch();
        queryClient.invalidateQueries({ queryKey: ["services"] });
        onSuccess?.();
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.errors || "Terjadi kesalahan");
      setError(err?.response?.data?.errors || "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (file: File | null, url: string) => {
    if (file) {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      const maxSize = 2 * 1024 * 1024;

      if (!allowedTypes.includes(file.type)) {
        setError("Format file tidak didukung");
        toast.error("Format file tidak didukung");
        return;
      }

      if (file.size > maxSize) {
        setError("Ukuran file terlalu besar. Maksimal 2MB.");
        toast.error("Ukuran file terlalu besar");
        return;
      }

      // Update the form value with the file name
      form.setValue("icon", file.name);
    } else {
      form.setValue("icon", "");
    }

    setIconFile(file);
    setIconPreview(url);
    setError(null);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertTitle>Terjadi kesalahan</AlertTitle>
            <AlertDescription>
              <p>{error}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>
                  Nama Layanan <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan nama layanan"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setError(null); // Clear error on change
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>
                      Unit <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          console.log("Unit selected:", value);
                          field.onChange(value);
                          setError(null); // Clear error on change
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {apiResponseUnit?.data?.map(
                            (item: { id: number; name: string }) => (
                              <SelectItem key={item.id} value={String(item.id)}>
                                {item.name}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>
                      Harga <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <CurrencyInput
                        value={Number(field.value) || 0}
                        onChange={(value) => {
                          field.onChange(Number(value));
                          setError(null); // Clear error on change
                        }}
                        currency="IDR"
                        locale="id-ID"
                        placeholder="0"
                        maxValue={999999999} // 999 juta
                        showPreview={true}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Deskripsi</FormLabel>
                <FormControl>
                  <textarea
                    className="border rounded p-2 w-full min-h-[60px] resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Deskripsi layanan (opsional)"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setError(null); // Clear error on change
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Icon upload */}
          <FormItem className="space-y-2">
            <FormLabel>Icon Layanan</FormLabel>
            <FormDescription>
              Upload icon untuk layanan (format: JPG, PNG, maksimal 2MB)
            </FormDescription>
            <FormControl>
              <FileUploadWithPreview
                value={iconFile}
                previewUrl={iconPreview || initialData?.icon_url || ""}
                onChange={handleFileChange}
                accept="image/*"
                placeholder="Upload Icon"
                width={64}
                height={64}
              />
            </FormControl>
          </FormItem>
        </div>

        {/* <DebugForm
          form={form}
          mode={mode}
          id={id || initialData?.id || ""}
          files={[
            {
              fieldName: "icon",
              name: iconFile?.name,
              preview: iconPreview,
            },
          ]}
          extraInfo={{
            branch_id: session?.data?.outlet_id_active,
            isSubmitting: isLoading,
            isValid: form.formState.isValid,
            errors: form.formState.errors,
            apiResponseUnit: apiResponseUnit?.data,
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
