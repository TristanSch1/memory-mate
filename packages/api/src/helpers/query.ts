import { z } from "zod";

export const listQuery = z
  .object({
    search: z.string().optional(),
    limit: z.number().optional(),
    offset: z.number().optional(),
  })
  .optional();
