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
import { SchemaPerfume } from "../schema/schema-perfume";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaPerfume } from "../schema/schema-perfume";
import { toast } from "sonner";
import axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, Loader2 } from "lucide-react";
import { useActiveOutlet } from "@/store/useOutletStore";

interface FormPerfumeProps {
  refetch: () => void;
  initialData?: Partial<SchemaPerfume & { id?: string | number }>;
  mode: "store" | "update";
  onSuccess?: () => void;
}

export default function FormPerfume({
  refetch,
  initialData,
  mode,
  onSuccess,
}: FormPerfumeProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const MITUNI_API_KEY = process.env.NEXT_PUBLIC_MITUNI_API_KEY;
  const { data: session } = useSession();
  const { outlet_id_active } = useActiveOutlet();

  const form = useForm<SchemaPerfume & { id?: string | number }>({
    resolver: zodResolver(schemaPerfume),
    defaultValues: {
      name_perfume: initialData?.name_perfume || "",
      id: initialData?.id,
    },
  });

  // Reset form when initialData changes (for edit mode)
  React.useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const onSubmit = async (data: SchemaPerfume & { id?: string | number }) => {
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("id", String(initialData?.id || ""));
      formData.append("name_perfume", data.name_perfume.trim());
      // Always include id in the request data, but only if it exists
      if (data.id) {
        formData.append("id", String(data.id));
      }
      if (outlet_id_active) {
        formData.append("branch_id", String(outlet_id_active));
      }

      const result = await axios.post(
        `${API_URL}/api/perfume/${mode === "update" ? "update" : "store"}`,
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
            ? "Data parfum berhasil diupdate"
            : "Data parfum berhasil disimpan"
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
            name="name_perfume"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>
                  Nama Parfum <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan nama parfum"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
