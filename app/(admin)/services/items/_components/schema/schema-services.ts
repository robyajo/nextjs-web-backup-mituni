import { z } from "zod";

export const schemaServices = z.object({
  name: z.string().trim().min(1, "Nama layanan harus diisi"),
  unit: z.string().min(1, "Unit harus dipilih"),
  price: z.union([
    z.number().min(1, "Harga harus lebih dari 0"),
    z.string()
      .min(1, "Harga harus diisi")
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val), "Harga harus berupa angka")
      .refine((val) => val > 0, "Harga harus lebih dari 0")
  ]).transform(val => Number(val)),
  description: z.string().min(1, "Deskripsi harus diisi"),
  icon: z.string().optional(),
});
export type SchemaServices = z.infer<typeof schemaServices>;