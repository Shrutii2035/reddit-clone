import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string().min(5).max(1000),
  communityId: z.string().min(1, "Please select a community"), // ✅ add this
});