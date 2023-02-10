import { z } from "zod";

export const inputSchema = z.string().min(3, 'Must contain at least 3 characters').max(20);
