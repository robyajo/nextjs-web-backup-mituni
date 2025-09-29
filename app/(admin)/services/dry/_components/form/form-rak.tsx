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
import { SchemaRak, schemaRak } from "../schema/schema-dry";
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

interface FormRakProps {
  refetch: () => void;
  initialData?: Partial<any>;
  mode: "store" | "update";
  onSuccess?: () => void;
}

export default function FormRak({
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

  const form = useForm<SchemaRak & { id?: string | number }>({
    resolver: zodResolver(schemaRak),
    defaultValues: {
      name_item: initialData?.name_item || "",
      id: initialData?.id,
    },
  });

  // Reset form when initialData changes (for edit mode)
  React.useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);
  const onSubmit = async (data: SchemaRak & { id?: string | number }) => {
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("id", String(initialData?.id || ""));
      formData.append("name_item", data.name_item.trim());
      // Always include id in the request data, but only if it exists
      if (data.id) {
        formData.append("id", String(data.id));
      }
      if (outlet_id_active) {
        formData.append("branch_id", String(outlet_id_active));
      }

      const result = await axios.post(
        `${API_URL}/api/item-dry/${mode === "update" ? "update" : "store"}`,
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
            ? "Data dry berhasil diupdate"
            : "Data dry berhasil disimpan"
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {error && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Terjadi kesalahan.</AlertTitle>
            <AlertDescription>
              <p>{error}</p>
            </AlertDescription>
          </Alert>
        )}
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="name_item"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>
                  Nama Dry <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan nama dry"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
