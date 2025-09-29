import { z } from "zod";

const requiredString = z.string().trim().min(1, "Harus diisi");

export const schemaRak = z.object({
  name_item: requiredString,
});
export type SchemaRak = z.infer<typeof schemaRak>;