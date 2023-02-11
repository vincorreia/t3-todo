import { z } from "zod";

export const inputSchema = z.string().min(3, 'Min. length 3 characters').max(20, 'Max. length 20 characters');
