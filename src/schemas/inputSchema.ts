import { z } from "zod";

export const inputSchema = z.string().min(3, 'Min. length 3 characters').max(10, 'Max. length 10 characters');
