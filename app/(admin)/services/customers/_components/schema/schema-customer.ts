import { z } from "zod";

const requiredString = z.string().trim().min(1, "Harus diisi");
const optionalString = z.string().trim().optional();

export const schemaCustomer = z.object({
  name: requiredString,
  phone_number: optionalString,
  email: optionalString,
  address: optionalString,
  gender: optionalString,
});
export type SchemaCustomer = z.infer<typeof schemaCustomer>;