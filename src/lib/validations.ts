import { z } from "zod";
import { Status } from "@prisma/client";

export const applicationSchema = z.object({
  company: z.string().min(1, "Company name is required").max(100),
  role: z.string().min(1, "Role is required").max(100),
  status: z.nativeEnum(Status),
  location: z.string().max(100).optional().nullable(),
  appliedDate: z.string().datetime().or(z.date().transform(d => d.toISOString())),
});

export const applicationUpdateSchema = applicationSchema.partial();

export const userUpdateSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
});
