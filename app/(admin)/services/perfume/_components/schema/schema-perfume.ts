import { z } from "zod";

const requiredString = z.string().trim().min(1, "Harus diisi");

export const schemaPerfume = z.object({
  name_perfume: requiredString,
});
export type SchemaPerfume = z.infer<typeof schemaPerfume>;