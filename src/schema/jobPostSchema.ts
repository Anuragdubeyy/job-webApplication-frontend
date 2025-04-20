import { z } from "zod";

export const JobPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  isRemote: z.boolean(),
  salary: z.number().min(0, "Salary must be a positive number"),
  type: z.string().min(1, "Type is required"),
  experienceLevel: z.string().min(1, "Experience level is required"),
  benefits: z.string().optional(),
});

export type JobPostInput = z.infer<typeof JobPostSchema>;