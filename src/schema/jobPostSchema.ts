import { z } from "zod";

export const JobPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  isRemote: z.boolean(),
  salary: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z.number().min(0, "Salary must be a positive number")
  ),
  type: z.string().min(1, "Type is required"),
  experienceLevel: z.string().min(1, "Experience level is required"),
  benefits: z.string().optional(),
  requirements: z
  .array(z.string().min(1, "Requirement cannot be empty"))
  .min(1, "At least one requirement is required"),
skillsRequired: z
  .array(z.string().min(1, "Skill cannot be empty"))
  .min(1, "At least one skill is required"),
responsibilities: z
  .array(z.string().min(1, "Responsibility cannot be empty"))
  .min(1, "At least one responsibility is required"),
  applicationDeadline: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid application deadline date",
  }),
  company: z.string().min(1, "Company name is required"),
  category: z.string().min(1, "Category is required"),
});
