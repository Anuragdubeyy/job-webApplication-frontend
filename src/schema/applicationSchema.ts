import { z } from "zod";

export const ApplicationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  experience_year: z.number().min(1, "Experience must be provided"), // updated to match input data
  currently_working: z.boolean().optional(),
  notice_period: z.string().optional(),
  linkedIn_link: z.string().url().optional(),
  portfolio: z.string().url().optional(),
  current_salary: z.string().optional(),
  expected_salary: z.string().optional(),
  skills: z.array(z.string()).optional(),
  resume: z.union([z.string(), z.instanceof(File)]).optional(), // Allow string or File
  coverLetter: z.string().optional(),
  experience: z
    .array(
      z.object({
        job_title: z.string().min(1, "Role is required"),
        company_name: z.string().min(1, "Company is required"),
        joining_date: z.string().optional(), // Changed to string to match the date format in input
        end_date: z.string().optional(), // Changed to string to match the date format in input
        description: z.string().optional(),
        currently_working: z.boolean(),
        city: z.string().optional(),
      })
    )
    .optional(), // Experience is optional as the user might not have added any
});

export type ApplicationInput = z.infer<typeof ApplicationSchema>;
